const writeFile = require('./writeFile')
const inquirer = require('inquirer')

const templates = {
  component: name => `export default function ${name}() {
    return <div>${name}</div>
  }`,
  spec: name => `import { render, screen } from '@testing-library/react'
  import ${name} from './${name}'
  describe('${name}', () => {
    it('renders', () => {
      render(<${name} />)
      expect(screen.getByText('${name}')).toBeInTheDocument()
    })
  }})`,
  stories: name => `import ${name} from './${name}'
  export default {
    title: '${name}',
    component: ${name}
  }

  const Template = args => <${name} {...args} />

  export const Default = Template.bind({})
  Default.args = {}`,
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Which function and file would you like to create?',
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
  const arrayOfNames = answers.name.split(',').map(answer => answer.trim())
  answers.name = arrayOfNames

  answers.name.forEach(name => {
    answers.fileTypes.forEach(fileType => {
      const templateFunction = templates[fileType]
      const fileString = templateFunction(name)
      writeFile(name, fileType, fileString)
    })
  })
})
