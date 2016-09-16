var csv2tree = require('./index.js')
var program = require('commander')
var path = require('path')
var treeify = require('treeify')

var args = process.argv

program
  .version('1.0.0')
  .option('-t, --tree', 'Unix style tree-view')
  .parse(args)

var count = 0
for (var i = 0; i < args.length; i++) {
  if (path.extname(args[i]) === '.csv') {
    var data = args[i]
  } else {
    if (count < 1) {
      console.log('Please provide the path to a .csv file')
      count++
    }
  }
}

if (data) {
  csv2tree(data, function (err, tree) {
    if (err) {
      console.log(err)
    }
    console.log(tree,
       treeify.asTree(JSON.parse(tree), true)
    )
  })
}
