// 1. Компонент-карточка. Принимает данные персонажа и колбэки через props
export default function CharacterCard({ char, onEdit, onDelete, onRoll }) {
  return (
    // 7. Условный рендеринг: добавляем CSS-класс 'dead', если HP <= 0
    <div className={`card ${char.hp <= 0 ? 'dead' : ''}`}>
      <h3>{char.name} <span className="level">Ур. {char.level}</span></h3>
      <p>Класс: {char.class || '—'}</p>
      <p>
        HP: {char.hp}
        {/* 7. Условный рендеринг: короткое замыкание (&&) */}
        {char.hp <= 0 && ' 💀 Без сознания'}
      </p>
      <p>Инициатива: {char.initiative || '—'}</p>
      <div className="actions">
        {/* 4. События onClick: вызывают функции, переданные из App через props */}
        <button onClick={() => onRoll(char.id)}>🎲 d20</button>
        <button className="edit" onClick={() => onEdit(char.id)}>✏️</button>
        <button className="delete" onClick={() => onDelete(char.id)}>🗑️</button>
      </div>
    </div>
  );
}