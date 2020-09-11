const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { showTodos } = require('./showTodos');
const { showImportantTodos } = require('./showImportnant');
const { filterByUser } = require('./filterByUser');
const { filterByDate } = require('./filterByDate');

const { sortByImportance } = require('./sortByImportance');
const { sortByDate } = require('./sortByDate');
const { sortByUser } = require('./sortByUser');

app();

function app() {
  const files = getFiles();

  console.log('Please, write your command!');
  readLine(processCommand);
}

function getFiles() {
  const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
  return filePaths.map((path) => readFile(path));
}

// сортировать комментарии по пользователю, дате и важности
const sortComments = (command) => {
  let sortCriteria = command.substring(4).trim();

  switch (sortCriteria) {
    case 'date':
      sortByDate(command);
      break;
    case 'importance':
      sortByImportance(command);
      break;
    case 'user':
      sortByUser(command);
      break;
    default:
      console.log('Wrong search criteria');
  }
};

function processCommand(command) {
  switch (command) {
    case 'exit':
      process.exit(0);
      break;
    case 'show':
      showTodos();
      break;
    case 'important':
      showImportantTodos();
      break;
    case command.match(/user.*/gi) ? command.match(/user.*/gi)[0] : null:
      filterByUser(command);
      break;
    case command.match(/date.*/gi) ? command.match(/date.*/gi)[0] : null:
      filterByDate(command);
      break;
    case command.match(/sort./gi) ? command.match(/sort.*/gi)[0] : null:
      sortComments(command);
      break;
    default:
      console.log('wrong command');
      break;
  }
}

// TODO you can do it!
