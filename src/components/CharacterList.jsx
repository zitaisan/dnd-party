import CharacterCard from './CharacterCard';

// 1. Компонент-список. Получает массив и колбэки
export default function CharacterList({ characters, onEdit, onDelete, onRoll }) {
  // Сортировка по инициативе (копируем массив [...characters], чтобы не мутировать props)
  const sorted = [...characters].sort((a, b) => b.initiative - a.initiative);

  return (
    <div className="list">
      {/* 5. Работа со списками: map() превращает массив данных в массив JSX-компонентов */}
      {sorted.map(char => (
        // 6. Атрибут key: ОБЯЗАТЕЛЕН. React использует его для отслеживания изменений в DOM.
        // НИКОГДА не используй index массива, если список может меняться.
        <CharacterCard 
          key={char.id} 
          char={char} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onRoll={onRoll} 
        />
      ))}
    </div>
  );
}