var fs = require('fs')

// source: http://stackoverflow.com/a/28544299/6206015
function csvToObj (csv) {
  var arr = csv.split('\n')
  var jsonObj = []
  var headers = arr[0].split(',')

  for (var i = 1; i < arr.length; i++) {
    var data = arr[i].split(',')
    var obj = {}

    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim()
    }
    jsonObj.push(obj)
  }
  return JSON.stringify(jsonObj)
}

// source: http://stackoverflow.com/a/18800059/6206015
function convertType (value) {
  try {
    return (new Function ('return ' + value + ';'))()
  } catch (e) {
    return value
  }
}

// source: http://stackoverflow.com/a/19223349/6206015
function treeify (nodes) {
  var indexed_nodes = {}
  var tree_roots = []
  for (var i = 0; i < nodes.length; i += 1) {
    indexed_nodes[nodes[i].id] = nodes[i]
    indexed_nodes[nodes[i].id].children = []
  }
  for (var i = 0; i < nodes.length; i += 1) {
    var parent_id = nodes[i].parent_id
    if (convertType(parent_id) === undefined || parent_id === nodes[i].id) {
      tree_roots.push(nodes[i])
    } else {
      if (indexed_nodes[parent_id] !== undefined) {
        indexed_nodes[parent_id].children.push(nodes[i])
     } else {
       tree_roots.push(nodes[i])
       nodes[i].warnings = 'parent_id for ' + nodes[i].name + ' does not exist in data'
      }
    }
  }
  return tree_roots
}

fs.readFile('./data.csv', function (err, data) {
  if (err) {
    console.log(err)
  }
  var flatArray = csvToObj(data.toString())
  var result = JSON.stringify(treeify(JSON.parse(flatArray)), undefined, '\t')
  var json = JSON.parse(result)
  for (var i = 0; i < json.length; i++) {
    console.log(json[i])
  }
})
