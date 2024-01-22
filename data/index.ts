let todos = [
  {
    id: 1,
    title: "Some",
  },
  {
    id: 2,
    title: "DO that",
  },
];

export function getTodos() {
  return todos;
}

export function setTodos(newTodos: typeof todos) {
  todos = newTodos;
} 
