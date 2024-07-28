from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def calculate_tax(einkommen, jahr, familienstand, religion, bundesland):
    steuer = 0
    kirchensteuer = 0

    if jahr == 2024:
        if einkommen <= 11604:
            steuer = 0
        elif einkommen <= 17005:
            y = (einkommen - 11604) / 10000
            steuer = round((922.98 * y + 1400) * y)
        elif einkommen <= 66760:
            z = (einkommen - 17005) / 10000
            steuer = round((181.19 * z + 2397) * z + 1025.38)
        elif einkommen <= 277825:
            steuer = round(0.42 * einkommen - 10602.13)
        else:
            steuer = round(0.45 * einkommen - 18936.88)


        if religion == "katholisch/evangelisch":
            if bundesland not in ["Bayern", "Baden-Württemberg"]:
                kirchensteuer = round(steuer * 0.09, 2)
            else:
                kirchensteuer = round(steuer * 0.08, 2)
        elif religion == "ohne":
            kirchensteuer = 0

        if familienstand == "verheiratet":
            steuer *= 2
            kirchensteuer *= 2


    elif jahr == 2023:
        if einkommen <= 10908:
            steuer = 0
            steuerklasse = "Klasse I - bis 10.908 €"
        elif 10909 <= einkommen <= 15999:
            y = (einkommen - 10908) / 10000
            steuer = int(round(((979.18 * y) + 1400) * y, 2))
            steuerklasse = "Klasse II - von 10.909 bis 15.999 €"
        elif 16000 <= einkommen <= 62809:
            z = (einkommen - 15999) / 10000
            steuer = int(round((192.59 * z + 2397) * z + 966.53, 2))
            steuerklasse = "Klasse III - von 16.000 bis 62.809 €"
        elif 62810 <= einkommen <= 277825:
            steuer = int(round((0.42 * einkommen) - 9972.98, 2))
            steuerklasse = "Klasse IV - von 62.810 bis 277.825 €"
        elif einkommen >= 277826:
            steuer = int(round((0.45 * einkommen) - 18307.73, 2))
            steuerklasse = "Klasse V - ab 277.826 €"

        if religion == "katholisch/evangelisch":
            if bundesland not in ["Bayern", "Baden-Württemberg"]:
                kirchensteuer = round(steuer * 0.09, 2)
            else:
                kirchensteuer = round(steuer * 0.08, 2)
        elif religion == "ohne":
            kirchensteuer = 0

        if familienstand == "verheiratet":
            steuer *= 2
            kirchensteuer *= 2


    elif jahr == 2022:
        if einkommen <= 10347:
            steuer = 0
        elif einkommen <= 14926:
            y = (einkommen - 10347) / 10000
            steuer = round((1088.67 * y + 1400) * y)
        elif einkommen <= 58596:
            z = (einkommen - 14926) / 10000
            steuer = round((206.43 * z + 2397) * z + 869.32)
        elif einkommen <= 277825:
            steuer = round(0.42 * einkommen - 9336.45)
        else:
            steuer = round(0.45 * einkommen - 17671.20)


        if religion == "katholisch/evangelisch":
            if bundesland not in ["Bayern", "Baden-Württemberg"]:
                kirchensteuer = round(steuer * 0.09, 2)
            else:
                kirchensteuer = round(steuer * 0.08, 2)
        elif religion == "ohne":
            kirchensteuer = 0

        if familienstand == "verheiratet":
            steuer *= 2
            kirchensteuer *= 2



    elif jahr == 2021:
        if einkommen <= 9744:
            steuer = 0
        elif einkommen <= 14753:
            y = (einkommen - 9744) / 10000
            steuer = round((995.21 * y + 1400) * y)
        elif einkommen <= 57918:
            z = (einkommen - 14753) / 10000
            steuer = round((208.85 * z + 2397) * z + 950.96)
        elif einkommen <= 274612:
            steuer = round(0.42 * einkommen - 9136.63)
        else:
            steuer = round(0.45 * einkommen - 17374.99)



        if religion == "katholisch/evangelisch":
            if bundesland not in ["Bayern", "Baden-Württemberg"]:
                kirchensteuer = round(steuer * 0.09, 2)
            else:
                kirchensteuer = round(steuer * 0.08, 2)
        elif religion == "ohne":
            kirchensteuer = 0

        if familienstand == "verheiratet":
            steuer *= 2
            kirchensteuer *= 2


    elif jahr == 2020:
        if einkommen <= 9408:
            steuer = 0
        elif einkommen <= 14532:
            y = (einkommen - 9408) / 10000
            steuer = round((972.87 * y + 1400) * y)
        elif einkommen <= 57051:
            z = (einkommen - 14532) / 10000
            steuer = round((212.02 * z + 2397) * z + 972.79)
        elif einkommen <= 270500:
            steuer = round(0.42 * einkommen - 8963.74)
        else:
            steuer = round(0.45 * einkommen - 17078.74)


        if religion == "katholisch/evangelisch":
            if bundesland not in ["Bayern", "Baden-Württemberg"]:
                kirchensteuer = round(steuer * 0.09, 2)
            else:
                kirchensteuer = round(steuer * 0.08, 2)
        elif religion == "ohne":
            kirchensteuer = 0

        if familienstand == "verheiratet":
            steuer *= 2
            kirchensteuer *= 2


    elif jahr == 2019:
        if einkommen <= 9168:
            steuer = 0
        elif einkommen <= 14254:
            y = (einkommen - 9168) / 10000
            steuer = round((980.14 * y + 1400) * y)
        elif einkommen <= 55960:
            z = (einkommen - 14254) / 10000
            steuer = round((216.16 * z + 2397) * z + 965.58)
        elif einkommen <= 265326:
            steuer = round(0.42 * einkommen - 8780.9)
        else:
            steuer = round(0.45 * einkommen - 16740.68)


        if religion == "katholisch/evangelisch":
            if bundesland not in ["Bayern", "Baden-Württemberg"]:
                kirchensteuer = round(steuer * 0.09, 2)
            else:
                kirchensteuer = round(steuer * 0.08, 2)
        elif religion == "ohne":
            kirchensteuer = 0

        if familienstand == "verheiratet":
            steuer *= 2
            kirchensteuer *= 2

    return steuer,  kirchensteuer, steuerklasse

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
    religion = req.get('religion', 'ohne')
    bundesland = req.get('bundesland', 'Baden-Württemberg')
    
    steuer, kirchensteuer, steuerklasse = calculate_tax(einkommen, jahr, familienstand, religion, bundesland)
    
    response = {
        "fulfillmentText": f"""
        Zu versteuerndes Einkommen: {einkommen:.2f} €
        Ihre Einkommensteuer beträgt: {steuer:.2f} €
        Kirchensteuer: {kirchensteuer:.2f} €
        Steuerklasse: {steuerklasse}
        
        *
        * Die Berechnungen erfolgen unter Berücksichtigung der Rundungsvorschriften.
        """
    }
    
    return jsonify(response)



if __name__ == '__main__':
    app.run(debug=True)
