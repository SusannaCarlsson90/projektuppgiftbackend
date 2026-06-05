# Guldkvistens Café - Backend

Detta är baksidan (servern och databasen) för mitt bageriprojekt. Den fungerar som en länk mellan databasen och applikationens framsida.

## Vad servern gör:

- **Sparar och hanterar data:** Servern kan ta emot, skicka, uppdatera och radera bakverk i databasen (CRUD).
- **Säker inloggning:** Den sköter registrering och inloggning för personalen. Lösenorden krypteras med Bcrypt och inloggningen säkras med JWT-tokens.
- **Skickar JSON:** Den skickar all data i ett smidigt textformat (JSON) som framsidan sedan kan läsa av.

## Verktyg som har använts:

- **Node.js & Express** (för att starta och köra själva webbservern)
- **MongoDB & Mongoose** (databasen där alla bakverk och användare sparas)
