var csv2tree = require('./index.js')

csv2tree('./data.csv', function (err, tree) {
  if (err) {
    console.log(err)
  }
  console.log(tree)
})
