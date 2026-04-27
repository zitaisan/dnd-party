import { useState, useEffect } from 'react';

export default function ReferencePage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⏱ useEffect #2 + Работа с API: загрузка классов при монтировании
  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/classes')
      .then(res => {
        if (!res.ok) throw new Error('Не удалось загрузить данные');
        return res.json();
      })
      .then(data => {
        setClasses(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Пустой массив [] = срабатывает только 1 раз при загрузке страницы

  if (loading) return <p className="loading">📜 Загрузка справочника...</p>;
  if (error) return <p className="error">❌ {error}. Проверьте интернет.</p>;

  return (
    <div className="page reference-page">
      <h2>📖 Классы D&D 5e (из API)</h2>
      <ul className="class-list">
        {classes.map((cls, idx) => (
          <li key={cls.index || idx} className="class-item">
            <strong>{cls.name}</strong> 
            <span className="hint">API index: {cls.index}</span>
          </li>
        ))}
      </ul>
      <p className="info">💡 Данные получены через fetch(). Можно использовать для валидации формы отряда.</p>
    </div>
  );
}