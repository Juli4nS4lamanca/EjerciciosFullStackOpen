```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server->>browser: Redirection GET https://studies.cs.helsinki.fi/exampleapp/notes
  deactivate server
  
  Note left of server: Actualiza el listado de notas con la nueva enviada.
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server->>browser: HTML-code
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server->>browser: CSS-file
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server->>browser: JavaScript-file
  deactivate server

  Note right of browser: El navegador ejecuta el JavaScript que solicita el JSON al servidor

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server->>browser: [{"content": "nueva nota escrita", "date": "2025-6-10"}]
  deactivate server

  Note right of browser: El navegador ejecuta la funcion para renderisar las notas
  ```
