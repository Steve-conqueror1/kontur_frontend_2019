const { commentsArray, renderTable } = require('./showTodos');
const { createTodosArr } = require('./createTodosArr');

//получить комментарии с указанной даты
const filterByDate = (command) => {
  let todosArray = createTodosArr(commentsArray());
  let date = command.substring(4).trim();
  let dateFormat = date.split('-');

  let userComments = [];

  todosArray.forEach((comment) => {
    let commentDate = comment.date;

    if (dateFormat.length === 1 && commentDate.trim().split('-')[0] >= date) {
      userComments.push(comment);
    }

    if (
      dateFormat.length === 2 &&
      commentDate.trim().split('-')[0] === date.split('-')[0] &&
      commentDate.trim().split('-')[1] >= date.split('-')[1]
    ) {
      userComments.push(comment);
    } else if (
      dateFormat.length === 2 &&
      commentDate.trim().split('-')[0] >= date.split('-')[0]
    ) {
      userComments.push(comment);
    }

    if (
      dateFormat.length === 3 &&
      +new Date(commentDate.trim()) >= +new Date(date)
    ) {
      userComments.push(comment);
    }
  });

  renderTable(userComments);
};

module.exports = {
  filterByDate,
};
