const path = require('path');
const { createTodosArr } = require('./createTodosArr'); //Создает массив объектов

const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');

const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');

const filenames = [];
const fileContents = filePaths.map((filePath) => {
  filenames.push(path.win32.basename(filePath));
  return readFile(filePath);
});

/************************************************************
   получение всех строк в каждом файле, содержащих TODO
************************************************************/
const getAllLinesWithTodo = () => {
  const linesWithTodos = fileContents.map((content, index) => {
    const todoLines = content
      .split('\n')
      .filter((lineWithTodo) => lineWithTodo.match(/\/\/ TODO/i))
      .map((line) => {
        line = `${line}; ${filenames[index]}`;
        const todo = line
          .substring(line.indexOf('//'))
          .replace('// ', '')
          .replace('TODO', '');
        return todo;
      });

    return todoLines;
  });

  return linesWithTodos;
};

/************************************************************
   Создание массива со всеми todos
************************************************************/
const createTodosArray = (array) => {
  let todosArray = [];

  array.forEach((file) => {
    file.forEach((todo) => todosArray.push(todo));
  });

  return todosArray;
};

/************************************************************
   Создание таблица
************************************************************/
const createTodosTable = (array) => {
  const tableHeader = `user;date;comment;fileName`;

  array.unshift(tableHeader);
  array = array.map((line) => {
    if (line.includes('!') || line === array[0]) {
      line = `!;${line}`;
    } else {
      line = ` ;${line}`;
    }

    let newLine = line.split(';').join(`|`);

    return newLine;
  });
  return array;
};

function alterProperties(
  userObj,
  userMaxLength,
  dateMaxLength,
  commentMaxLength,
  filenameMaxLength
) {
  userObj.user = userObj.user.trimLeft().trimRight();
  userObj.date = userObj.date.trimLeft().trimRight();
  userObj.comment = userObj.comment.trimLeft().trimRight();
  userObj.filename = userObj.filename.trimLeft().trimRight();

  if (userObj.user.length > userMaxLength) {
    userObj.user = `${userObj.user.substring(0, userMaxLength - 3)}...`;
  }

  if (userObj.date.length > dateMaxLength) {
    userObj.date = `${userObj.date.substring(0, dateMaxLength - 3)}...`;
  }

  if (userObj.comment.length > commentMaxLength) {
    userObj.comment = `${userObj.comment.substring(
      0,
      commentMaxLength - 3
    )}...`;
  }

  if (userObj.filename.length > filenameMaxLength) {
    userObj.filename = `${userObj.filename.substring(
      0,
      filenameMaxLength - 3
    )}...`;
  }
}

const longestPropertylength = (usersArray, property) => {
  let propertyLength = 0;
  usersArray.forEach((user) => {
    if (user[property].trimLeft().trimRight().length > propertyLength) {
      propertyLength = user[property].trimLeft().trimRight().length;
    }
  });

  return propertyLength;
};

const commentsArray = () =>
  createTodosTable(createTodosArray(getAllLinesWithTodo()));

const renderTable = (usersObj = createTodosArr(commentsArray())) => {
  let longestUserLength =
    longestPropertylength(usersObj, 'user') < 10
      ? longestPropertylength(usersObj, 'user')
      : 10;
  let longestDateLength =
    longestPropertylength(usersObj, 'date') < 10
      ? longestPropertylength(usersObj, 'date')
      : 10;

  let longestCommentLength =
    longestPropertylength(usersObj, 'comment') < 50
      ? longestPropertylength(usersObj, 'comment')
      : 50;

  let longestFileNameLength =
    longestPropertylength(usersObj, 'filename') < 15
      ? longestPropertylength(usersObj, 'filename')
      : 15;

  let tableLength =
    25 +
    longestUserLength +
    longestDateLength +
    longestCommentLength +
    longestFileNameLength;

  let table = '';

  usersObj.forEach((user, index) => {
    alterProperties(
      user,
      longestUserLength < 10 ? longestUserLength : 10,
      longestDateLength < 10 ? longestDateLength : 10,
      longestCommentLength < 50 ? longestCommentLength : 50,
      longestFileNameLength < 15 ? longestFileNameLength : 15
    );

    let userLength =
      longestUserLength < 10
        ? longestUserLength - user.user.length
        : 10 - user.user.length;

    let dateLength =
      longestDateLength < 10
        ? longestDateLength - user.date.length
        : 10 - user.date.length;

    let commentLength =
      longestCommentLength < 50
        ? longestCommentLength - user.comment.length
        : 50 - user.comment.length;

    let fileNameLength =
      longestFileNameLength < 15
        ? longestFileNameLength - user.filename.length
        : 15 - user.filename.length;

    table += `  ${user.importance}  |  ${user.user}${' '.repeat(
      userLength
    )}  |  ${user.date}${' '.repeat(dateLength)}  |  ${
      user.comment
    }${' '.repeat(commentLength)}  |  ${user.filename}${' '.repeat(
      fileNameLength
    )}${
      index === 0 || index === usersObj.length - 1
        ? `  \n${'-'.repeat(tableLength)}\n`
        : '  \n'
    }`;
  });

  console.log(table);
};

const showTodos = () => {
  renderTable();
};

module.exports = {
  showTodos,
  commentsArray,
  renderTable,
};
