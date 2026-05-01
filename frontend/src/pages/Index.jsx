const FEATURES = [
  { to: "/javascript.html", num: "II.", title: "JavaScript", sub: "Tömb-alapú CRUD", desc: "Klasszikus JavaScript-tel megvalósított CRUD alkalmazás, melyben az adatok egy tömbben tárolódnak." },
  { to: "/react.html", num: "III.", title: "React", sub: "Komponens CRUD", desc: "React komponensekkel és useState állapotkezeléssel készült feltaláló-kezelő alkalmazás." },
  { to: "/spa.html", num: "IV.", title: "SPA", sub: "Számológép & Amőba", desc: "Egyoldalas alkalmazás (Single Page Application) két React játékkal: Számológép és Tic-Tac-Toe." },
  { to: "/fetchapi.html", num: "V.", title: "Fetch API", sub: "Szerveroldali tárolás", desc: "JavaScript + Fetch API-val készült CRUD, az adatok MongoDB adatbázisban (FastAPI) tárolódnak." },
  { to: "/axios.html", num: "VI.", title: "Axios", sub: "React + Axios", desc: "React + Axios alapú alkalmazás, ami a szerver oldali REST API-val kommunikál." },
  { to: "/oojs.html", num: "VII.", title: "OOJS", sub: "Objektumorientált rajzoló", desc: "Objektumorientált JavaScript rajzoló alkalmazás class, constructor, extends, super használatával." },
];

export default function IndexPage() {
  return (
    <div>
      <section className="parchment hero">
        <p className="ornament" style={{ color: "#8c1d2e" }}>A &middot; BEADANDÓ &middot; FELADAT</p>
        <h2>Magyar Feltalálók</h2>
        <p className="tagline">— Egy hét fejezetből álló web-alkalmazás —</p>
        <hr className="divider-classic" style={{ maxWidth: "28rem", margin: "1rem auto" }} />
        <p className="lead">
          Ez az alkalmazás bemutatja a Web programozás-1 előadás során elsajátított modern webfejlesztési
          technológiákat. Az adatbázis a magyar feltalálók adatait tartalmazza (kutató, találmány, kapcsoló
          táblákkal), és a feladatok ezeken az adatokon végeznek <em>CRUD (Create, Read, Update, Delete)</em>{" "}
          műveleteket különböző technológiák segítségével.
        </p>
      </section>

      <section className="mt-8">
        <div className="section-title">
          <p className="ornament" style={{ color: "#8c1d2e" }}>FEJEZETEK</p>
          <h3>A feladat részei</h3>
        </div>
        <div className="card-grid">
          {FEATURES.map((f) => (
            <a key={f.to} className="card" href={f.to}>
              <div className="card-head">
                <span className="num">{f.num}</span>
                <span className="ch-label">Fejezet</span>
              </div>
              <h4>{f.title}</h4>
              <p className="sub">{f.sub}</p>
              <hr className="divider-classic" />
              <p className="desc">{f.desc}</p>
              <p className="more">Megnyitom →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="parchment db-info mt-8">
        <p className="ornament" style={{ color: "#8c1d2e" }}>FELHASZNÁLT ADATBÁZIS</p>
        <h3 style={{ fontSize: "2rem", color: "#0f2a4e", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
          A választott adattáblák
        </h3>
        <div className="db-info-grid">
          <div>
            <h4>kutato.txt</h4>
            <p>Feltalálók: <span className="font-mono" style={{ fontSize: "0.8rem" }}>fkod, nev, szul, meghal</span></p>
          </div>
          <div>
            <h4>talalmany.txt</h4>
            <p>Találmányok: <span className="font-mono" style={{ fontSize: "0.8rem" }}>tkod, talnev</span></p>
          </div>
          <div>
            <h4>kapcsol.txt</h4>
            <p>Kapcsolótábla: <span className="font-mono" style={{ fontSize: "0.8rem" }}>tkod, fkod</span></p>
          </div>
        </div>
        <p className="italic muted mt-6">
          A CRUD alkalmazások a <strong>kutato.txt</strong> (feltalálók) tábla adatain dolgoznak.
        </p>
      </section>
    </div>
  );
}
