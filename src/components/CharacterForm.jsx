import { useState, useEffect } from 'react';

// 1. Компонент получает props: колбэк для отправки и данные для редактирования
export default function CharacterForm({ onSubmit, editData }) {
  // Локальный state для контролируемых инпутов
  const [formData, setFormData] = useState({ name: '', class: '', level: 1, hp: 10 });

  // 4. useEffect: срабатывает при изменении editData. Заполняет форму при клике на ✏️
  useEffect(() => {
    if (editData) setFormData(editData);
    else setFormData({ name: '', class: '', level: 1, hp: 10 }); // Сброс при отмене/добавлении
  }, [editData]);

  // 4. Событие onChange: обрабатывает ввод в полях
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Динамически обновляем нужное поле. Числа преобразуем через Number()
    setFormData(prev => ({ ...prev, [name]: name === 'level' || name === 'hp' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    // 2. Props: вызываем функцию родителя, передавая собранные данные
    onSubmit(formData);
    setFormData({ name: '', class: '', level: 1, hp: 10 }); // Очищаем форму после отправки
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* 2 & 4: Controlled inputs (value + onChange) */}
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Имя персонажа" required />
      <input name="class" value={formData.class} onChange={handleChange} placeholder="Класс (Воин, Маг...)" />
      <input name="level" type="number" min="1" max="20" value={formData.level} onChange={handleChange} />
      <input name="hp" type="number" min="0" value={formData.hp} onChange={handleChange} />
      
      {/* 7. Условный рендеринг: меняем текст кнопки в зависимости от режима */}
      <button type="submit">{editData ? '💾 Обновить' : '➕ Добавить'}</button>
    </form>
  );
}