const writeFile = require('./writeFile')
const inquirer = require('inquirer')

const templates = {
  component: name => `export default function ${name}() {
    return <div>${name}</div>
  }`,
  spec: name => `import { render, screen } from '@testing-library/react'
  import ${name} from './${name}'
  describe('${name}', () => {
    it('should render componente with ${name}', () => {
      ...
    })
  }})`,
  stories: name => `import ${name} from './${name}'
  export default {
    title: '${name}'
    component: ${name}
  }`,
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message:
      'Which function and file would you like to create? \nPlease seperate by comma.',
  },
  {
    type: 'checkbox',
    message: 'Please select a file type ',
    name: 'fileTypes',
    choices: [{ name: 'component' }, { name: 'spec' }, { name: 'stories' }],
    validate(answer) {
      if (answer.length < 1) {
        return 'You must choose at least one file type.'
      }
      return true
    },
  },
]

inquirer.prompt(questions).then(answers => {
  const names = answers['name'].split(',').map(element => element.trim())
  names.forEach(name => writeFile(file))
  console.log(answers)
})
