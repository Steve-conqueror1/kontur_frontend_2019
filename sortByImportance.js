const { commentsArray, renderTable } = require('./showTodos');
const { createTodosArr } = require('./createTodosArr');

//сортировать по важности
const sortByImportance = (command) => {
  if (command.substring(4).trim() === 'importance') {
    let userComments = [];

    userComments.push(commentsArray()[0]);

    let comments = commentsArray();
    comments.shift();

    let sortedComments = comments.sort(
      (a, b) => b.split('!').length - a.split('!').length
    );

    userComments.push(...sortedComments);
    let todosArray = createTodosArr(userComments);
    renderTable(todosArray);
  }
};

module.exports = {
  sortByImportance,
};
