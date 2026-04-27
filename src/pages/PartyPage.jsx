import { useState, useEffect } from 'react';
import CharacterForm from '../components/CharacterForm';
import CharacterList from '../components/CharacterList';
import SearchFilter from '../components/SearchFilter';

export default function PartyPage() {
  // 🔄 Sharing State: состояние поднимается в этот компонент и передаётся вниз через props
  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem('dnd_party');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  // ⏱ useEffect #1: сохранение в LocalStorage при изменении массива
  useEffect(() => {
    localStorage.setItem('dnd_party', JSON.stringify(characters));
  }, [characters]);

  const handleSubmit = (data) => {
    if (editingId) {
      setCharacters(prev => prev.map(c => c.id === editingId ? { ...c, ...data } : c));
      setEditingId(null);
    } else {
      setCharacters(prev => [...prev, { ...data, id: crypto.randomUUID(), initiative: 0 }]);
    }
  };

  const handleDelete = (id) => setCharacters(prev => prev.filter(c => c.id !== id));
  const rollInitiative = (id) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    setCharacters(prev => prev.map(c => c.id === id ? { ...c, initiative: roll } : c));
  };

  const filtered = characters.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass === 'all' || c.class === filterClass;
    return matchSearch && matchClass;
  });

  return (
    <div className="page">
      <h1>🛡️ Управление отрядом</h1>
      <SearchFilter search={search} setSearch={setSearch} filterClass={filterClass} setFilterClass={setFilterClass} />
      <CharacterForm onSubmit={handleSubmit} editData={characters.find(c => c.id === editingId)} />
      <CharacterList characters={filtered} onEdit={setEditingId} onDelete={handleDelete} onRoll={rollInitiative} />
      {filtered.length === 0 && <p className="empty">Персонажи не найдены. Добавьте первого бойца!</p>}
    </div>
  );
}