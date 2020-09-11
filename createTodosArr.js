const createTodosArr = (comments) => {
  let todoArray = [];
  comments.forEach((userComment) => {
    let commentArray = userComment.split('|');

    if (commentArray.length === 5) {
      let userDetail = {
        importance: commentArray[0],
        user: commentArray[1],
        date: commentArray[2],
        comment: commentArray[3],
        filename: commentArray[4],
      };

      todoArray.push(userDetail);
    } else {
      let userDetail = {
        importance: commentArray[0],
        user: ' ',
        date: ' ',
        comment: commentArray[1],
        filename: commentArray[2],
      };

      todoArray.push(userDetail);
    }
  });

  return todoArray;
};

module.exports = {
  createTodosArr,
};
