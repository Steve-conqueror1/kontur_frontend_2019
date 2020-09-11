const { commentsArray, renderTable } = require('./showTodos');
const { createTodosArr } = require('./createTodosArr');

// Сортировать комментарии по дате
const sortByDate = (command) => {
  if (command.substring(4).trim() === 'date') {
    let todosArray = createTodosArr(commentsArray());

    let userComments = [];

    userComments.push(todosArray[0]);
    let comments = todosArray;
    comments.shift();

    let sortedComments = comments.sort((a, b) => {
      if (a.date.trim() && b.date.trim()) {
        return new Date(b.date.trim()) - new Date(a.date.trim());
      }

      if (a.date.trim() && !b.date.trim()) {
        return new Date(b.date.trim().length) - new Date(a.date.trim().length);
      }

      if (!a.date.trim() && b.date.trim()) {
        return new Date(b.date.trim().length) - new Date(a.date.trim().length);
      }
    });

    userComments.push(...sortedComments);
    renderTable(userComments);
  }
};

module.exports = {
  sortByDate,
};
