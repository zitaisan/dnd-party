import { useState } from 'react'; // 3. State: хук useState для хранения и обновления данных
import CharacterForm from './components/CharacterForm';
import CharacterList from './components/CharacterList';
import SearchFilter from './components/SearchFilter';
import './App.css';

function App() {
  // 3. State: объявляем состояния для списка, редактирования, поиска и фильтра
  const [characters, setCharacters] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  // CRUD: Добавление и Обновление
  const handleSubmit = (data) => {
    if (editingId) {
      // Обновляем: map создает НОВЫЙ массив, заменяя объект с совпадающим id
      // (Иммутабельность: никогда не мутируем state напрямую)
      setCharacters(prev => prev.map(c => c.id === editingId ? { ...c, ...data } : c));
      setEditingId(null); // Выходим из режима редактирования
    } else {
      // Создаем: [...prev] копирует старый массив, добавляем новый объект с уникальным id
      setCharacters(prev => [...prev, { ...data, id: crypto.randomUUID(), initiative: 0 }]);
    }
  };

  // CRUD: Удаление
  const handleDelete = (id) => setCharacters(prev => prev.filter(c => c.id !== id));

  // Бросок инициативы (обновление отдельного поля в массиве объектов)
  const rollInitiative = (id) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    setCharacters(prev => prev.map(c => c.id === id ? { ...c, initiative: roll } : c));
  };

  // Фильтрация + Поиск (Доп. требование)
  // Выполняется ДО рендера, поэтому в UI попадает только отфильтрованный список
  const filtered = characters.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass === 'all' || c.class === filterClass;
    return matchSearch && matchClass;
  });

  return (
    <div className="app">
      <h1>🛡️ D&D Party Manager</h1>
      
      {/* 2. Props: передаем состояния и функции-сеттеры вниз по дереву компонентов */}
      <SearchFilter 
        search={search} setSearch={setSearch} 
        filterClass={filterClass} setFilterClass={setFilterClass} 
      />
      <CharacterForm 
        onSubmit={handleSubmit} 
        editData={characters.find(c => c.id === editingId)} // Передаем объект для редактирования
      />
      <CharacterList 
        characters={filtered} // Передаем уже отфильтрованный массив
        onEdit={id => setEditingId(id)} 
        onDelete={handleDelete} 
        onRoll={rollInitiative} 
      />
      
      {/* 7. Условный рендеринг: показываем сообщение, если после фильтрации массив пуст */}
      {filtered.length === 0 && <p className="empty">Персонажи не найдены</p>}
    </div>
  );
}

export default App;