import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Főoldal", react: true, end: true },
  { to: "/javascript.html", label: "JavaScript", react: false },
  { to: "/react.html", label: "React", react: true },
  { to: "/spa.html", label: "SPA", react: true },
  { to: "/fetchapi.html", label: "Fetch API", react: false },
  { to: "/axios.html", label: "Axios", react: true },
  { to: "/oojs.html", label: "OOJS", react: false },
];

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <div className="inner">
          <p className="ornament">&#10086;  &#10086;  &#10086;</p>
          <h1>Web programozás-1 Előadás Házi feladat</h1>
          <p className="sub">Magyar Feltalálók — Adatbázis kezelő alkalmazás · 2026</p>
          <nav className="site-nav">
            {NAV_ITEMS.map((item) =>
              item.react ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.label}
                </NavLink>
              ) : (
                <a key={item.to} href={item.to}>{item.label}</a>
              )
            )}
          </nav>
        </div>
      </header>
      <main className="page-anim">{children}</main>
      <footer className="site-footer">
        <p className="ornament" style={{ marginBottom: "0.75rem" }}>&#10086;  &#10086;  &#10086;</p>
        <p className="author">Készítette: Kovács Kristóf</p>
        <p className="neptun">Neptun kód: XADNA6</p>
        <p className="meta">Budapest · MMXXVI · Web Programozás-1</p>
      </footer>
    </>
  );
}
