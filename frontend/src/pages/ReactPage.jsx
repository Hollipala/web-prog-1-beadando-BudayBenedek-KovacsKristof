import { useState } from "react";
import { INVENTORS_SEED } from "../data/inventors";

const InventorRow = ({ inv, onEdit, onDelete }) => (
  <tr>
    <td className="mono">{inv.fkod}</td>
    <td>{inv.nev}</td>
    <td>{inv.szul ?? "—"}</td>
    <td>{inv.meghal ?? "—"}</td>
    <td className="right">
      <div className="action-cell">
        <button className="btn-academic btn-small" onClick={() => onEdit(inv)}>Szerk.</button>
        <button className="btn-burgundy btn-small" onClick={() => onDelete(inv.fkod)}>Töröl</button>
      </div>
    </td>
  </tr>
);

const InventorForm = ({ onSubmit, editing, onCancel }) => {
  const [nev, setNev] = useState(editing?.nev ?? "");
  const [szul, setSzul] = useState(editing?.szul ?? "");
  const [meghal, setMeghal] = useState(editing?.meghal ?? "");

  return (
    <form
      className="parchment mb-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!nev.trim()) return;
        onSubmit({
          nev: nev.trim(),
          szul: szul ? parseInt(szul, 10) : null,
          meghal: meghal ? parseInt(meghal, 10) : null,
        });
        if (!editing) {
          setNev(""); setSzul(""); setMeghal("");
        }
      }}
    >
      <h3 className="form-title">{editing ? `Szerkesztés (kód: ${editing.fkod})` : "Új feltaláló hozzáadása"}</h3>
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

export default function ReactPage() {
  const [inventors, setInventors] = useState(INVENTORS_SEED.map((i) => ({ ...i })));
  const [editing, setEditing] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = (data) => {
    if (editing) {
      setInventors((prev) => prev.map((i) => (i.fkod === editing.fkod ? { ...i, ...data } : i)));
      setEditing(null);
      setFormKey((k) => k + 1);
    } else {
      const newId = inventors.length ? Math.max(...inventors.map((i) => i.fkod)) + 1 : 1;
      setInventors((prev) => [...prev, { fkod: newId, ...data }]);
    }
  };

  const handleDelete = (id) => {
    setInventors((prev) => prev.filter((i) => i.fkod !== id));
    if (editing && editing.fkod === id) {
      setEditing(null);
      setFormKey((k) => k + 1);
    }
  };

  const handleEdit = (inv) => {
    setEditing(inv);
    setFormKey((k) => k + 1);
  };

  return (
    <div>
      <div className="page-title">
        <p className="chapter">III. FEJEZET</p>
        <h2>React CRUD</h2>
        <p className="lead">React komponensek · useState · in-memory tömb</p>
      </div>

      <InventorForm
        key={formKey}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => { setEditing(null); setFormKey((k) => k + 1); }}
      />

      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Kód</th>
              <th>Név</th>
              <th>Születés</th>
              <th>Halálozás</th>
              <th className="right">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {inventors.map((inv) => (
              <InventorRow key={inv.fkod} inv={inv} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
