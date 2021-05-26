const writeFile = require('./writeFile')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Which function and file would you like to create? ', answer => {
  console.log(answer)
  rl.close()
})
