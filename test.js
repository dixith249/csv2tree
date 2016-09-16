var csv2tree = require('./index.js')
var program = require('commander')
var path = require('path')
var treeify = require('treeify')

var args = process.argv

program
  .version('1.0.0')
  .option('-t, --tree', 'Outputs as Unix style tree-view')
  .option('-j, --json', 'Outputs as JSON')
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
    if (program.tree) {
      var output = treeify.asTree(JSON.parse(tree), true)
    } else if (program.tree && program.json) {
      output = {}
      output.tree = treeify.asTree(JSON.parse(tree), true)
      output.json = tree
    } else if (program.json) {
      output = tree
    } else {
      output = tree
    }
    console.log(output)
  })
}
