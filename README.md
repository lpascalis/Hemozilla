# Structural Registry — Unified PWA (TAVI • TEER • LAAC)
PWA unica con selettore modulo dopo la password. Ogni modulo può puntare a un **diverso** Apps Script (Google Sheets differenziati).

## Configurazione
- Imposta gli URL default in `config.js` (`REPLACE_TAVI_URL`, `REPLACE_TEER_URL`, `REPLACE_LAAC_URL`)
- Oppure inserisci gli URL dalla home e premi **Salva URL** (rimangono in `localStorage`).
- Quando apri un modulo, l’app salva `sessionStorage.API_URL` per i call.

## Endpoint lato server (schema)
Per ogni modulo servono:
`listNSGeneral`, `listNSActive`, `listNSEmergencies`, `listNSProcedures`, `listNSFollowUp`,
`addNSPatient` (protetto), `addNSUrgency` (protetto),
`getNSById`, `updateNSFieldRev` (LockService+rev), `certifyNSExecutedRev`.

Sostituisci NS con `TAVI_` / `TEER_` / `LAAC_`.
