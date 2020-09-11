const { commentsArray, renderTable } = require('./showTodos');
const { createTodosArr } = require('./createTodosArr');

const showImportantTodos = () => {
  let todosArray = createTodosArr(commentsArray());
  let importantTodos = todosArray.filter(
    (todo) => todo.importance.trim() === '!'
  );

  renderTable(importantTodos);
};

module.exports = {
  showImportantTodos,
};
