const { commentsArray, renderTable } = require('./showTodos');
const { createTodosArr } = require('./createTodosArr');

// Сортировать комментарии по пользователям
const sortByUser = (command) => {
  if (command.substring(4).trim() === 'user') {
    let todosArray = createTodosArr(commentsArray());

    let userComments = [];

    userComments.push(todosArray[0]);
    let comments = todosArray;
    comments.shift();

    let sortedComments = comments
      .sort((a, b) => {
        let userA = a.user.trim();
        let userB = b.user.trim();

        return userB.length - userA.length;
      })
      .sort((a, b) => {
        let userA = a.user.trim().toUpperCase();
        let userB = b.user.trim().toUpperCase();

        if (userA && userB) {
          if (userA < userB) {
            return -1;
          }

          if (userA > userB) {
            return 1;
          }

          return 0;
        }
      });

    userComments.push(...sortedComments);
    renderTable(userComments);
  }
};

module.exports = {
  sortByUser,
};
