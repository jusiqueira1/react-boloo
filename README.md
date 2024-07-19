 # Lista de Receitas de Bolo
```
O tema escolhido para utilizar na aplicabilidade foram as Listas de Receitas Culinárias, permitindo ao usuário salvar, editar e excluir itens de receitas culinárias em uma lista própria.

As receitas Culinárias são variadas, e já aparecem automaticamente logo que se inicia na aplicação.

```
# Estrutura do Projeto

## Tecnologias usadas:

```
CSS
```
```
ReactJs
```

## Hooks Utilizados:
 ```
 useEffect ,useState e useCallback, no qual permitem alternar os dados para adicionar, editar e excluir diferentes receitas culinárias;

 ```

## Instalação e Uso:

```
1. mkdir PaginaInicial

2. cd PaginaInicial

3. npx create-react-app minhapaginainicial

4. code .

5. npm start

```

## Componente - Lista.jsx


# Funcionalidades principais

#### Array : O array consta as informações das receitas dos alimentos em específico, com uso dos ids e identificando serem textos.

```
const initialRecipes = [
  { id: 1, text: 'Bolo de Cenoura' },
  { id: 2, text: 'Lasanha de Carne' },
  { id: 3, text: 'Pizza de Frango' },
];

```

#### useState : Usado para usar o estado de armazenamento das receitas criadas  , alternando entre os dados .

```
const TodoList = () => {
  const [recipes, setRecipes] = useState(initialRecipes); 
  const [newRecipe, setNewRecipe] = useState(''); 

```

addRecipe: Função que adiciona uma nova receita assim que a função for chamada, atirbuindo um ID único sempre que uma receita é gerada, somando + 1.
```
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


```

### handleKeyPress : 
Função que ao ser preenchido o campo de informações, ele adicionará a receita ao clicar no botão "Enter"

```

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      addRecipe();
    }
  }, [addRecipe]);

```
### handleUndo: 
Função desfazer a última edição

```
  const handleUndo = useCallback(() => {
    if (recipes.length > 0) {
      setRecipes((prevRecipes) => prevRecipes.slice(0, -1));
    }
  }, [recipes]);

```


## Componente Editar.jsx

#### Esse componente trabalha na edição dos dados já existentes e colocados no campo de input


### useEfect: Sendo uma hook, o useEffect atualiza os dados já colocados no currentRecipe, salvando ou cancelar após.

```

const Editar = ({ currentRecipe, onSave, onCancel }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (currentRecipe) {
      setText(currentRecipe.text);
    }
  }, [currentRecipe]);
```


### handleSave : Função de salvar as informações colocadas no campo de input, pegando pelo ID.


```
  const handleSave = () => {
    if (text.trim() !== '') {
      onSave(currentRecipe.id, text);
    }
  };
```

