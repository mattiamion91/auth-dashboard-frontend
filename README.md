# Auth Dashboard Frontend

Frontend React per il progetto didattico di autenticazione JWT.

## 📋 Descrizione

Questa applicazione frontend dimostra:
- Autenticazione con JWT (access token + refresh token)
- Gestione dello stato con React Context
- Protezione delle route con React Router v6
- Refresh token automatico/manual
- Interfaccia semplice per testare il flusso di autenticazione

## 🛠️ Tecnologie utilizzate

- **React 18** con Vite
- **React Router v6** per la navigazione
- **React Context** per la gestione dello stato globale
- **CSS puro** (nessun framework CSS esterno)

## 📁 Struttura del progetto

```
src/
├── assets/           # Immagini e icone statiche
├── components/       # Componenti riutilizzabili (ProtectedRoute)
├── context/          # React Context (AuthContext)
├── pages/            # Pagine dell'applicazione (Login, Register, Dashboard)
├── App.jsx           # Router principale
├── main.jsx          # Entry point
└── index.css         # Stili globali
```

## ⚙️ Script disponibili

Nel package.json trovate questi script utili:

- `npm run dev` - Avvia il server di sviluppo Vite (http://localhost:5173)
- `npm run build` - Crea la versione di produzione nella cartella `dist`
- `npm run preview` - Anteprima locale della build di produzione

## 🔧 Configurazione

1. Assicurati che il backend sia in esecuzione su `http://localhost:5000`
2. Il frontend si connetterà automaticamente a questo endpoint per le chiamate API
3. Variabili di ambiente non sono necessarie per questo progetto didattico

## 🚀 Come eseguire il progetto

```bash
# 1. Clona il repository (se non l'hai già fatto)
git clone <repository-url>
cd auth-dashboard-frontend

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## 📚 Concetti JWT dimostrati

Questa applicazione illustra i seguenti concetti JWT:

### Access Token vs Refresh Token
- **Access Token**: Breve durata (default 15 minuti nel backend), usato per autorizzare le richieste alle API protette
- **Refresh Token**: Lunga durata (default 7 giorni), usato esclusivamente per ottenere nuovi Access Token senza richiedere nuovamente le credenziali

### Flusso di autenticazione
1. Login → Ricevi access_token + refresh_token
2. Access Token salvato in memoria (React state), Refresh Token in localStorage
3. Ogni richiesta API include l'Access Token nell'header `Authorization: Bearer <token>`
4. Quando l'access token scade, usa il refresh token per ottenerne uno nuovo
5. Il refresh token può essere revocato facendo logout (rimozione dal database backend)

### Sicurezza
- I token JWT sono **firmati**, non criptati: il contenuto è visibile a chiunque decodifichi il token
- Mai inserire informazioni sensibili (password, dati personali) nel payload del token
- La sicurezza deriva dalla firma verificabile con la secret key lato server

## 🧪 Testing didattico

Nella pagina Dashboard trovi:

### Bottone "Rinnova Access Token"
Chiama manualmente l'endpoint `/api/auth/refresh` per:
- Ottenere un nuovo access token usando il refresh token salvato
- Vedere come funziona il refresh senza effettuare nuovamente il login

### Visualizzazione ruolo utente
Mostra se l'utente loggato è amministratore (basato sul ruolo nel token JWT)

### Protezione delle route
Prova ad accedere direttamente a `/dashboard` senza effettuare il login - sarai reindirizzato alla pagina di login.

## 🔍 Debugging JWT

Per scopi didattici, puoi decodificare i token JWT usando strumenti online come [jwt.io](https://jwt.io) o la libreria `jwt-decode` per vedere:
- Header: informazioni sull'algoritmo di firma
- Payload: userId, role, timestamp di emissione (iat) e scadenza (exp)
- Nota: il payload è BASE64URL encoded, quindi leggibile da chiunque abbia il token

## 📝 Note importanti per lo sviluppo

- Il progetto utilizza Vite come bundler per un'esperienza di sviluppo veloce
- Le rotte protette sono implementate tramite il componente `ProtectedRoute`
- Tutti gli stati relativi all'autenticazione sono centralizzati in `AuthContext`
- Gli errori di rete vengono loggati in console per semplicità didattica

## 🤝 Contribuire

Questo è un progetto didattico, quindi feel free to:
- Sperimentare con diverse durate dei token
- Aggiungere visualizzazioni più dettagliate del contenuto JWT
- Implementare il refresh automatico prima della scadenza
- Aggiungere gestione errori più sofisticata all'utente

---

Buon apprendimento del JWT! 🎓