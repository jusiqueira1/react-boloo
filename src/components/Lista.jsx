import React, { useState, useCallback } from 'react';
import Editar from './Editar';
import '../App.css';

const initialRecipes = [
  { id: 1, text: 'Bolo de Cenoura' },
  { id: 2, text: 'Lasanha de Carne' },
  { id: 3, text: 'Pizza de Frango' },
];

const TodoList = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [newRecipe, setNewRecipe] = useState('');
  const [editRecipe, setEditRecipe] = useState(null);

  const addRecipe = useCallback(() => {
    if (newRecipe.trim() !== '') {
      const newRecipeItem = {
        id: recipes.length + 1,
        text: newRecipe,
      };
      setRecipes((prevRecipes) => [...prevRecipes, newRecipeItem]);
      setNewRecipe('');
    }
  }, [newRecipe, recipes]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        addRecipe();
      }
    },
    [addRecipe]
  );

  const handleUndo = useCallback(() => {
    if (recipes.length > 0) {
      setRecipes((prevRecipes) => prevRecipes.slice(0, -1));
    }
  }, [recipes]);

  const handleEdit = useCallback(
    (id) => {
      const recipeToEdit = recipes.find((recipe) => recipe.id === id);
      if (recipeToEdit) {
        setEditRecipe(recipeToEdit);
      }
    },
    [recipes]
  );

  const handleSaveEdit = useCallback(
    (id, newText) => {
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, text: newText } : recipe
        )
      );
      setEditRecipe(null);
    },
    []
  );

  const handleCancelEdit = useCallback(() => {
    setEditRecipe(null);
  }, []);

  return (
    <div className="todo-list">
      <h1>Lista de Receitas </h1>
      <h2>Culinárias</h2>
      <input
        type="text"
        value={newRecipe}
        onChange={(e) => setNewRecipe(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite o bolo de sua escolha"
      />
      <button onClick={addRecipe}>Adicionar</button>
      <button onClick={handleUndo} disabled={recipes.length === 0}>
        Desfazer
      </button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => handleEdit(recipe.id)}>
            {recipe.text}
          </li>
        ))}
      </ul>
      {editRecipe && (
        <Editar
          currentRecipe={editRecipe}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>

  );
};

export default TodoList;
