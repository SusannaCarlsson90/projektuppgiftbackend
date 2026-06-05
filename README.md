# Guldkvistens Café - Backend

Detta är baksidan (servern och databasen) för mitt bageriprojekt. Den fungerar som en länk mellan databasen och applikationens framsida.

## Länkar

Länk till video: https://www.loom.com/share/8692333eb3414fd8af14d099cc8d1adc
Länk till GitHub Backend-delen: https://github.com/SusannaCarlsson90/projektuppgiftbackend
Länk till GitHub Frontend-delen: https://github.com/SusannaCarlsson90/frontend-bageri-backend

## Vad servern gör:

- **Sparar och hanterar data:** Servern kan ta emot, skicka, uppdatera och radera bakverk i databasen (CRUD).
- **Säker inloggning:** Den sköter registrering och inloggning för personalen. Lösenorden krypteras med Bcrypt och inloggningen säkras med JWT-tokens.
- **Skickar JSON:** Den skickar all data i ett smidigt textformat (JSON) som framsidan sedan kan läsa av.

## Verktyg som har använts:

- **Node.js & Express** (för att starta och köra själva webbservern)
- **MongoDB & Mongoose** (databasen där alla bakverk och användare sparas)
