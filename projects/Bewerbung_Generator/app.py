from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI
import logging
import time
from datetime import datetime
from functools import wraps
import re
import tiktoken
from tenacity import retry, stop_after_attempt, wait_exponential

logging.basicConfig(level=logging.DEBUG)

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Set up OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Function to calculate the cost based on token usage
def calculate_cost(input_tokens, output_tokens, model="gpt-3.5-turbo-0125", is_batch=False):
    # Pricing per 1M tokens
    input_price = 0.50  # $0.50 per 1M input tokens
    output_price = 1.50  # $1.50 per 1M output tokens
    
    # Convert to millions of tokens
    input_millions = input_tokens / 1_000_000
    output_millions = output_tokens / 1_000_000
    
    # Calculate cost
    input_cost = input_millions * input_price
    output_cost = output_millions * output_price
    total_cost = input_cost + output_cost
    
    # Apply batch discount if applicable (not used in current implementation)
    if is_batch:
        total_cost *= 0.5  # 50% discount for batch processing
    
    return total_cost

def rate_limit(max_per_minute):
    min_interval = 60.0 / max_per_minute
    def decorator(func):
        last_called = [0.0]
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = min_interval - elapsed
            if left_to_wait > 0:
                time.sleep(left_to_wait)
            ret = func(*args, **kwargs)
            last_called[0] = time.time()
            return ret
        return wrapper
    return decorator

def num_tokens_from_string(string: str, encoding_name: str) -> int:
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
def call_openai_api(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sie sind ein professioneller Bewerbungsschreiber."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logging.error(f"Error calling OpenAI API: {str(e)}")
        raise

def format_bewerbung(bewerbung):
    current_date = datetime.now().strftime('%d.%m.%Y')
    header = f"""
        Anna Müller
        Musterstraße 12
        12345 Musterstadt

        Deutsche Post DHL Group
        Musterstraße 1
        12345 Musterstadt

        Musterstadt, {current_date}

        Bewerbung als Paketbotin (m/w/d)

    """
    # Remove any existing header information from the generated text
    bewerbung_lines = bewerbung.split('\n')
    start_index = next((i for i, line in enumerate(bewerbung_lines) if "Sehr geehrte" in line), 0)
    formatted_bewerbung = '\n'.join(bewerbung_lines[start_index:])
    
    # Combine the header with the formatted bewerbung
    full_bewerbung = header + formatted_bewerbung

    # Ensure there's only one closing
    if full_bewerbung.count("Mit freundlichen Grüßen") > 1:
        full_bewerbung = full_bewerbung.rsplit("Mit freundlichen Grüßen", 1)[0] + "Mit freundlichen Grüßen\n\nAnna Müller"
    
    return full_bewerbung.strip()

def generate_bewerbung(lebenslauf, stellenanzeige):
    prompt = f"""
    Erstellen Sie ein professionelles Bewerbungsanschreiben auf Deutsch basierend auf folgendem Lebenslauf und der Stellenanzeige:

    Lebenslauf:
    {lebenslauf}

    Stellenanzeige:
    {stellenanzeige}

        Das Anschreiben sollte folgende Punkte enthalten:
        1. Anrede
        2. Einleitung mit Bezug auf die Stelle
        3. 2-3 Absätze zu relevanten Qualifikationen und Erfahrungen
        4. Abschluss mit Gesprächswunsch
        5. Grußformel

        Bitte verwenden Sie durchgehend die "Ich"-Form und vermeiden Sie Platzhaltertexte.
        Das Anschreiben sollte nicht länger als 500 Wörter sein.
        Beginnen Sie direkt mit "Sehr geehrte Damen und Herren," ohne vorherige Adressinformationen oder Überschriften.
    """

    prompt_tokens = num_tokens_from_string(prompt, "cl100k_base")
    
    try:
        bewerbung = call_openai_api(prompt)
        
        completion_tokens = num_tokens_from_string(bewerbung, "cl100k_base")
        total_tokens = prompt_tokens + completion_tokens
        
        # Calculate the cost
        cost = calculate_cost(prompt_tokens, completion_tokens)
        
        logging.info(f"Tokens used: {total_tokens} (Prompt: {prompt_tokens}, Completion: {completion_tokens})")
        logging.info(f"Estimated cost: ${cost:.6f}")
        
        formatted_bewerbung = format_bewerbung(bewerbung)
        
        # Add cost information to the formatted bewerbung
        formatted_bewerbung += f"\n\nGeschätzte Kosten für diese Bewerbung: ${cost:.6f}"
        
        return formatted_bewerbung, None, cost
    except Exception as e:
        error_message = f"Es ist ein Fehler bei der Generierung des Anschreibens aufgetreten: {str(e)}"
        logging.error(error_message)
        return None, error_message, None

@app.route('/generate_bewerbung', methods=['POST'])
def api_generate_bewerbung():
    data = request.json
    lebenslauf = data.get('lebenslauf', '')
    stellenanzeige = data.get('stellenanzeige', '')

    if not lebenslauf or not stellenanzeige:
        return jsonify({"error": "Lebenslauf und Stellenanzeige sind erforderlich."}), 400

    bewerbung, error, cost = generate_bewerbung(lebenslauf, stellenanzeige)
    if error:
        return jsonify({"error": error}), 500
    return jsonify({"bewerbung": bewerbung, "estimated_cost": f"${cost:.6f}"})

@app.route('/test_key', methods=['GET'])
def test_key():
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        return jsonify({"error": "API-Schlüssel nicht in Umgebungsvariablen gefunden"}), 500
    
    masked_key = api_key[:4] + '*' * (len(api_key) - 8) + api_key[-4:]
    return jsonify({"message": f"API-Schlüssel gefunden: {masked_key}"}), 200

if __name__ == '__main__':
    app.run(debug=True)