import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/Index";
import ReactPage from "./pages/ReactPage";
import SpaPage from "./pages/SpaPage";
import AxiosPage from "./pages/AxiosPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/react.html" element={<ReactPage />} />
            <Route path="/spa.html" element={<SpaPage />} />
            <Route path="/axios.html" element={<AxiosPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
