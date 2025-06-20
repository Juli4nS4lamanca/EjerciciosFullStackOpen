```mermaid
sequenceDiagram
  participant browser
  participant server

  Note left of browser: El navegador renderiza la nueva nota antes de mandarla al servidor.
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa/new_note_spa
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.js
  activate server
  server->>browser: main.js
  deactivate server

  Note left of browser: El navegador ejecuta el script y solicita data.json del server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/data.json
  activate server
  server->>browser: [{"content": "notas","date": "2025-6-11"},...]
  deactivate server

  Note right of browser: El navegador ejecuta script para renderisar cada nota
```