const writeFile = require('./writeFile')
const inquirer = require('inquirer')

const questions = [
  {
    type: 'input',
    name: 'file',
    message:
      'Which function and file would you like to create? \nPlease seperate by comma.',
  },
]

inquirer.prompt(questions).then(answers => {
  const files = answers['file'].split(',').map(element => element.trim())
  files.forEach(file => writeFile(file))
})
