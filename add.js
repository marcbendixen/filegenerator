const a = process.argv[2]
const b = process.argv[3]

console.log(functionName(a, b))

function functionName(a, b) {
  return Number(a) + Number(b)
}
