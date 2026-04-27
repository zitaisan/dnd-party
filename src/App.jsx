import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PartyPage from './pages/PartyPage';
import ReferencePage from './pages/ReferencePage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">⚔️ Управление отрядом</Link>
        <Link to="/reference">📖 Справочник классов (API)</Link>
      </nav>
      <main className="container">
        <Routes>
          {/* 2 страницы, переходы работают */}
          <Route path="/" element={<PartyPage />} />
          <Route path="/reference" element={<ReferencePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}