from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def calculate_tax(einkommen, jahr, familienstand):
    steuer = 0
    if jahr == 2023:
        if einkommen <= 10908:
            steuer = 0
        elif einkommen <= 15999:
            y = (einkommen - 10908) / 10000
            steuer = round((979.18 * y + 1400) * y)
        elif einkommen <= 62809:
            z = (einkommen - 15999) / 10000
            steuer = round((192.59 * z + 2397) * z + 966.53)
        elif einkommen <= 277825:
            steuer = round(0.42 * einkommen - 9972.98)
        else:
            steuer = round(0.45 * einkommen - 18307.73)
    return steuer

@app.route('/')
def index():
    return "Hello, world! The server is running."

@app.route('/webhook', methods=['POST'])
def webhook():
    req = request.get_json(silent=True, force=True)
    print("Request JSON:", req)  # Debugging-Ausgabe
    
    einkommen = float(req.get('einkommen', 0))
    jahr = int(req.get('jahr', '2023'))
    familienstand = req.get('familienstand', 'alleinstehend')
    
    steuer = calculate_tax(einkommen, jahr, familienstand)
    
    response = {
        "fulfillmentText": f"Ihre Einkommensteuer beträgt {steuer} "
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
