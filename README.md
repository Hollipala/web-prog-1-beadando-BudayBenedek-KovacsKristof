# Web programozás-1 — Házi feladat

**Készítette:** Kovács Kristóf Buday Benedek 
**Neptun kód:** XADNA6 - OXQLH4
**Téma:** Magyar Feltalálók — adatbázis kezelő web-alkalmazás

---

## Tartalom

A projekt egy hét fejezetből álló web-alkalmazás:

| # | Fájl / Útvonal | Technológia |
|---|---|---|
| I.   | `index.html` (`/`)        | Főoldal — látványos kezdőlap |
| II.  | `javascript.html`         | Vanilla JavaScript CRUD (tömbben tárolva) |
| III. | `react.html`              | React CRUD (`useState`, komponensek, in-memory) |
| IV.  | `spa.html`                | SPA — Számológép + Tic-Tac-Toe (React, useState) |
| V.   | `fetchapi.html`           | Vanilla JS + Fetch API (szerveroldali tárolás) |
| VI.  | `axios.html`              | React + Axios (szerveroldali tárolás) |
| VII. | `oojs.html`               | OOJS rajzoló (class, constructor, extends, super) |

A statikus oldalak (`II`, `V`, `VII`) a `frontend/public/` mappából töltődnek be közvetlenül.  
A React oldalak (`I`, `III`, `IV`, `VI`) a React Router segítségével renderelődnek.

A választott adatbázis-fájl: **`kutato.txt`** (magyar feltalálók: `fkod, nev, szul, meghal`).

---

## Mappastruktúra

```
beadando/
├── README.md                  ← Ez a fájl
├── backend/                   ← FastAPI szerver (PHP helyett)
│   ├── server.py              ← REST API (CRUD endpointok)
│   ├── requirements.txt       ← Python függőségek
│   └── .env                   ← MongoDB kapcsolat
└── frontend/                  ← React + statikus HTML
    ├── package.json           ← Node függőségek
    ├── .env                   ← Backend URL
    ├── public/
    │   ├── index.html         ← React app belépési pont
    │   ├── styles.css         ← Közös akadémiai CSS
    │   ├── index_static.html  ← Statikus főoldal verzió
    │   ├── javascript.html    ← II. fejezet (vanilla JS)
    │   ├── fetchapi.html      ← V. fejezet (Fetch API)
    │   └── oojs.html          ← VII. fejezet (OOJS)
    ├── src/                   ← React forráskód
    │   ├── index.js
    │   ├── index.css
    │   ├── App.js
    │   ├── App.css
    │   ├── components/
    │   │   └── Layout.jsx     ← Közös fejléc/lábléc
    │   ├── data/
    │   │   └── inventors.js   ← Feltaláló seed adatok
    │   └── pages/
    │       ├── Index.jsx      ← I. főoldal (React)
    │       ├── ReactPage.jsx  ← III. React CRUD
    │       ├── SpaPage.jsx    ← IV. SPA
    │       └── AxiosPage.jsx  ← VI. Axios CRUD
    └── dist/                  ← Build-elt verzió (deploy-ra kész)
```

---

## Telepítés és futtatás lokálisan

### 1) MongoDB

Telepítsd a MongoDB Community Edition-t:  
https://www.mongodb.com/try/download/community

Indítsd el a MongoDB szervert (alapból a `localhost:27017`-en figyel).

### 2) Backend (FastAPI)

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

A backend a `http://localhost:8001` címen lesz elérhető.  
Endpointok: `GET/POST/PUT/DELETE /api/inventors` (és `/api/inventors/{id}`).

Az első indításkor a `kutato.txt` adatbázis 30 feltalálóval feltöltődik automatikusan.

### 3) Frontend (React)

```bash
cd frontend
yarn install     # vagy: npm install
yarn start       # vagy: npm start
```

Az alkalmazás a `http://localhost:3000` címen nyílik meg.

A `package.json`-ban van egy `proxy` beállítás (`http://localhost:8001`), ami fejlesztés alatt
átirányítja az `/api` hívásokat a backendre — így nincs CORS gond.

### 4) Build (telepítéshez)

```bash
cd frontend
yarn build
```

A build kimenete a `dist/` mappában (`frontend/dist/`) — ez tölthető fel bármilyen statikus
tárhelyre (Netlify, Vercel, GitHub Pages, FTP).

---

## Fontos megjegyzések

- **PHP helyett FastAPI** — mivel a fejlesztői környezet Python alapú, a szerveroldali részt
  FastAPI + MongoDB-vel valósítottuk meg. A funkcionalitás megegyezik (REST API CRUD).
- **Tárhelyre telepítés** — a frontend statikus fájlokra fordít le; a backendet külön
  szerverre kell telepíteni (pl. Render.com, Railway). A `frontend/.env` fájlban a
  `REACT_APP_BACKEND_URL` és a `frontend/public/fetchapi.html` 72. sorában a `API` változó
  módosítandó az élő backend URL-jére.
- **Nincs Babel/standalone** — a React lokálisan van telepítve (`react-scripts`-tel buildelve),
  a feladat előírásának megfelelően.

---

## Felhasznált források

- React Tic-Tac-Toe oktatóanyag: https://react.dev/learn/tutorial-tic-tac-toe
- Az órán bemutatott Calculator alkalmazás (saját implementáció)
- FastAPI dokumentáció: https://fastapi.tiangolo.com/
- Tipográfia: Lora & Cormorant Garamond (Google Fonts)

---

*Budapest · MMXXVI · Web Programozás-1*
