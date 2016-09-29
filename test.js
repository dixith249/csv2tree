var csv2tree = require('./index.js')
var program = require('commander')
var path = require('path')
var treeify = require('treeify')
var fs = require('fs')

var args = process.argv

program
  .version('1.0.0')
  .option('-t, --tree', 'Outputs as Unix style tree-view')
  .option('-j, --json', 'Outputs as JSON')
  .option('-w, --write', 'Writes program output to file')
  .parse(args)

function write (filename, data, callback) {
  fs.writeFile(filename, data, 'utf8', function (err) {
    if (err) {
      callback(err)
    }
    callback(null, filename)
  })
}

var count = 0
for (var i = 0; i < args.length; i++) {
  var ext = path.extname(args[i])
  if (ext === '.csv') {
    var data = args[i]
  } else {
    if (count < 1 && ext !== '.csv') {
      console.log('Please provide the path to a .csv file')
      count++
    }
  }
}

if (data) {
  ext = path.extname(data)
  var base = path.basename(data)
  var name = base.slice(0, base.length - ext.length)
  var output = null
  var filename = ''
  csv2tree(data, 'id', 'parent_id', function (err, tree) {
    if (err) {
      console.log(err)
    }
    if (program.tree) {
      output = treeify.asTree(JSON.parse(tree), true)
      ext = '.txt'
    } else if (program.tree && program.json) {
      output = {}
      output.tree = treeify.asTree(JSON.parse(tree), true)
      output.json = tree
    } else if (program.json) {
      output = tree
      ext = '.json'
    } else {
      output = tree
    }
    console.log(output)
    filename = name + ext
    if (program.write) {
      write(filename, output, function (err, name) {
        if (err) {
          console.log(err)
        }
        console.log(name + ' saved')
      })
    }
  })
}
