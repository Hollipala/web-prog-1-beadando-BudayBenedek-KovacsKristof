import { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const inputDigit = (d) => {
    if (waiting) { setDisplay(String(d)); setWaiting(false); }
    else { setDisplay(display === "0" ? String(d) : display + d); }
  };
  const inputDot = () => {
    if (waiting) { setDisplay("0."); setWaiting(false); return; }
    if (!display.includes(".")) setDisplay(display + ".");
  };
  const clear = () => { setDisplay("0"); setPrev(null); setOp(null); setWaiting(false); };

  const compute = (a, b, o) => {
    const x = parseFloat(a), y = parseFloat(b);
    if (o === "+") return x + y;
    if (o === "-") return x - y;
    if (o === "*") return x * y;
    if (o === "/") return y === 0 ? "Hiba" : x / y;
    return y;
  };

  const handleOp = (nextOp) => {
    if (prev == null) setPrev(display);
    else if (op) {
      const result = compute(prev, display, op);
      setDisplay(String(result));
      setPrev(String(result));
    }
    setOp(nextOp);
    setWaiting(true);
  };
  const handleEq = () => {
    if (prev != null && op) {
      const result = compute(prev, display, op);
      setDisplay(String(result));
      setPrev(null); setOp(null); setWaiting(true);
    }
  };

  return (
    <div className="parchment calc">
      <h3>Számológép</h3>
      <div className="calc-display">{display}</div>
      <div className="calc-grid">
        <button className="calc-fn" onClick={clear}>AC</button>
        <button className="calc-fn" onClick={() => setDisplay(String(-parseFloat(display)))}>±</button>
        <button className="calc-fn" onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</button>
        <button className="calc-op" onClick={() => handleOp("/")}>÷</button>

        <button className="calc-num" onClick={() => inputDigit(7)}>7</button>
        <button className="calc-num" onClick={() => inputDigit(8)}>8</button>
        <button className="calc-num" onClick={() => inputDigit(9)}>9</button>
        <button className="calc-op" onClick={() => handleOp("*")}>×</button>

        <button className="calc-num" onClick={() => inputDigit(4)}>4</button>
        <button className="calc-num" onClick={() => inputDigit(5)}>5</button>
        <button className="calc-num" onClick={() => inputDigit(6)}>6</button>
        <button className="calc-op" onClick={() => handleOp("-")}>−</button>

        <button className="calc-num" onClick={() => inputDigit(1)}>1</button>
        <button className="calc-num" onClick={() => inputDigit(2)}>2</button>
        <button className="calc-num" onClick={() => inputDigit(3)}>3</button>
        <button className="calc-op" onClick={() => handleOp("+")}>+</button>

        <button className="calc-num" onClick={() => inputDigit(0)}>0</button>
        <button className="calc-num" onClick={inputDot}>.</button>
        <button className="calc-eq" onClick={handleEq}>=</button>
      </div>
      <p className="muted italic mt-3 text-center">Forrás: az órán bemutatott Calculator alkalmazás (saját implementáció)</p>
    </div>
  );
};

const calcWinner = (sq) => {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calcWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const status = winner
    ? `Győztes: ${winner}`
    : isDraw
    ? "Döntetlen!"
    : `Következik: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  };
  const reset = () => { setSquares(Array(9).fill(null)); setXIsNext(true); };

  return (
    <div className="parchment ttt">
      <h3>Tic-Tac-Toe (Amőba)</h3>
      <p className="ttt-status">{status}</p>
      <div className="ttt-grid">
        {squares.map((s, i) => (
          <button key={i} className="ttt-square" onClick={() => handleClick(i)}>{s}</button>
        ))}
      </div>
      <button className="btn-academic ttt-reset" onClick={reset}>Új játék</button>
      <p className="muted italic mt-3 text-center">
        Forrás: a hivatalos React Tic-Tac-Toe oktatóanyag alapján (react.dev/learn/tutorial-tic-tac-toe), saját implementáció
      </p>
    </div>
  );
};

export default function SpaPage() {
  const [activeApp, setActiveApp] = useState("calc");

  return (
    <div>
      <div className="page-title">
        <p className="chapter">IV. FEJEZET</p>
        <h2>SPA — Single Page Application</h2>
        <p className="lead">Két React alkalmazás · komponensek · useState</p>
      </div>

      <nav className="tabs">
        <button
          className={`tab-btn ${activeApp === "calc" ? "active" : ""}`}
          onClick={() => setActiveApp("calc")}
        >Számológép</button>
        <button
          className={`tab-btn ${activeApp === "ttt" ? "active" : ""}`}
          onClick={() => setActiveApp("ttt")}
        >Tic-Tac-Toe</button>
      </nav>

      <div className="mt-6">
        {activeApp === "calc" ? <Calculator /> : <TicTacToe />}
      </div>
    </div>
  );
}
