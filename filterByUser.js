const { commentsArray, renderTable } = require('./showTodos');
const { createTodosArr } = require('./createTodosArr');

//получить комментарии от конкретного пользователя
const filterByUser = (command) => {
  let todosArray = createTodosArr(commentsArray());
  let userName = command.substring(4).trim();
  let userComments = [];

  todosArray.forEach((comment, index) => {
    if (
      index === 0 ||
      comment.user
        .substring(0, userName.length + 1)
        .trim()
        .toLowerCase() === userName
    ) {
      userComments.push(comment);
    }
  });

  renderTable(userComments);
};

module.exports = {
  filterByUser,
};
