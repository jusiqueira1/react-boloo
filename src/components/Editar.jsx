import React, { useState, useEffect } from 'react';

const Editar = ({ currentRecipe, onSave, onCancel }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (currentRecipe) {
      setText(currentRecipe.text);
    }
  }, [currentRecipe]);

  const handleSave = () => {
    if (text.trim() !== '') {
      onSave(currentRecipe.id, text);
    }
  };

  return (
    <div className="editar">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Edite o nome do bolo"
      />
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default Editar;
