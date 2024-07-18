 # Lista de Receitas de Bolo

Este projeto é um simples aplicativo React para gerenciar uma lista de receitas de bolo. O aplicativo permite adicionar novas receitas e desfazer a última adição.

## Estrutura do Projeto

### src/components/Lista.js

```javascript
import React, { useState, useCallback } from 'react';
import '../App.css';

// Esse função importa o arquivo APP para pegar o Css , assim como o uso do useState e useCallback

// Array inicial de receitas, onde consta os ids com receitas de bolos em específico 
const initialRecipes = [
  { id: 1, text: 'Bolo de Cenoura' },
  { id: 2, text: 'Bolo de Chocolate' },
  { id: 3, text: 'Bolo de Banana' },
];

const TodoList = () => {
  const [recipes, setRecipes] = useState(initialRecipes); // Estado para armazenar as receitas
  const [newRecipe, setNewRecipe] = useState(''); // Estado para armazenar a nova receita

  // Função para adicionar uma nova receita
  const addRecipe = useCallback(() => {
    if (newRecipe.trim() !== '') {
      const newRecipeItem = {
        id: recipes.length + 1, // Atribui um ID único
        text: newRecipe,
      };
      setRecipes((prevRecipes) => [...prevRecipes, newRecipeItem]);
      setNewRecipe('');
    }
  }, [newRecipe, recipes]);

  // Função para adicionar uma nova receita ao pressionar "Enter"
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      addRecipe();
    }
  }, [addRecipe]);

  // Função para desfazer a última adição
  const handleUndo = useCallback(() => {
    if (recipes.length > 0) {
      setRecipes((prevRecipes) => prevRecipes.slice(0, -1));
    }
  }, [recipes]);

  return (
    <div className="todo-list">
      <h1>Receitas de Bolo</h1>
      <input
        type="text"
        value={newRecipe}
        onChange={(e) => setNewRecipe(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite um sabor de bolo"
      />
      <button onClick={addRecipe}>Adicionar</button>
      <button onClick={handleUndo} disabled={recipes.length === 0}>
        Desfazer
      </button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
