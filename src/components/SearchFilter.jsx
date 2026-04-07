// 1. Компонент фильтрации. Получает состояния и сеттеры
export default function SearchFilter({ search, setSearch, filterClass, setFilterClass }) {
  const classes = ['all', 'Воин', 'Маг', 'Плут', 'Жрец', 'Следопыт', 'Варвар'];

  return (
    <div className="filters">
      {/* 2 & 4: Инпут поиска. onChange сразу обновляет state в App */}
      <input 
        type="text" 
        placeholder="🔍 Поиск по имени..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
      />
      {/* Выпадающий список. При выборе меняет filterClass */}
      <select value={filterClass} onChange={e => setFilterClass(e.target.value)}>
        {classes.map(c => (
          // 6. key для элементов списка <option>
          <option key={c} value={c}>{c === 'all' ? 'Все классы' : c}</option>
        ))}
      </select>
    </div>
  );
}