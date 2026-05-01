import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8001") + "/api";

const Form = ({ onSave, editing, onCancel }) => {
  const [nev, setNev] = useState(editing?.nev ?? "");
  const [szul, setSzul] = useState(editing?.szul ?? "");
  const [meghal, setMeghal] = useState(editing?.meghal ?? "");

  useEffect(() => {
    setNev(editing?.nev ?? "");
    setSzul(editing?.szul ?? "");
    setMeghal(editing?.meghal ?? "");
  }, [editing]);

  return (
    <form
      className="parchment mb-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!nev.trim()) return;
        onSave({
          nev: nev.trim(),
          szul: szul ? parseInt(szul, 10) : null,
          meghal: meghal ? parseInt(meghal, 10) : null,
        });
        if (!editing) { setNev(""); setSzul(""); setMeghal(""); }
      }}
    >
      <h3 className="form-title">{editing ? "Szerkesztés (PUT)" : "Új feltaláló (POST)"}</h3>
      <div className="form-grid">
        <input type="text" required placeholder="Név" value={nev} onChange={(e) => setNev(e.target.value)} />
        <input type="number" placeholder="Születés" value={szul} onChange={(e) => setSzul(e.target.value)} />
        <input type="number" placeholder="Halálozás (opc.)" value={meghal} onChange={(e) => setMeghal(e.target.value)} />
        <button type="submit" className="btn-academic">{editing ? "Mentés" : "Hozzáadás"}</button>
      </div>
      {editing && (
        <button type="button" onClick={onCancel} className="btn-link">Szerkesztés megszakítása</button>
      )}
    </form>
  );
};

export default function AxiosPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await axios.get(`${API}/inventors`);
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (body) => {
    try {
      if (editing) { await axios.put(`${API}/inventors/${editing.id}`, body); setEditing(null); }
      else { await axios.post(`${API}/inventors`, body); }
      load();
    } catch (e) { setError(e.message); }
  };

  const remove = async (id) => {
    try { await axios.delete(`${API}/inventors/${id}`); load(); }
    catch (e) { setError(e.message); }
  };

  return (
    <div>
      <div className="page-title">
        <p className="chapter">VI. FEJEZET</p>
        <h2>Axios CRUD</h2>
        <p className="lead">React + Axios · MongoDB szerveroldali tárolás</p>
      </div>

      <Form onSave={save} editing={editing} onCancel={() => setEditing(null)} />

      {error && (
        <div className="parchment mb-4" style={{ color: "#8c1d2e" }}>Hiba: {error}</div>
      )}

      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Név</th>
              <th>Születés</th>
              <th>Halálozás</th>
              <th className="right">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan="5" className="text-center italic" style={{ padding: "1.5rem" }}>Betöltés…</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td colSpan="5" className="text-center italic" style={{ padding: "1.5rem" }}>Nincs adat</td></tr>
            )}
            {items.map((inv) => (
              <tr key={inv.id}>
                <td className="mono">{inv.id.slice(0, 8)}…</td>
                <td>{inv.nev}</td>
                <td>{inv.szul ?? "—"}</td>
                <td>{inv.meghal ?? "—"}</td>
                <td className="right">
                  <div className="action-cell">
                    <button
                      className="btn-academic btn-small"
                      onClick={() => { setEditing(inv); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >Szerk.</button>
                    <button className="btn-burgundy btn-small" onClick={() => remove(inv.id)}>Töröl</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted italic mt-4 text-center">
        axios.get/post/put/delete · {`{REACT_APP_BACKEND_URL}`}/api/inventors
      </p>
    </div>
  );
}
