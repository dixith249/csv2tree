// converts csv to JSON object
// source: http://stackoverflow.com/a/28544299/6206015
function csvToObj (csv, callback) {
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
  return callback(null, JSON.stringify(jsonObj))
}

// converts string to type such as null, true, false, etc
// source: http://stackoverflow.com/a/18800059/6206015
function convertType (value) {
  try {
    return (new Function ('return ' + value))()
  } catch (e) {
    return value
  }
}

// converts flat file to nested tree view
// source: http://stackoverflow.com/a/19223349/6206015
function getTree (nodes, id, parent_id, callback) {
  var indexed_nodes = {}
  var tree_roots = []
  for (var i = 0; i < nodes.length; i++) {
    indexed_nodes[nodes[i][id]] = nodes[i]
    indexed_nodes[nodes[i][id]].children = []
  }
  for (var i = 0; i < nodes.length; i++) {
    var parent = nodes[i][parent_id]
    if (convertType(parent) === undefined || parent === nodes[i][id]) {
      tree_roots.push(nodes[i])
    } else {
      if (indexed_nodes[parent] !== undefined) {
        indexed_nodes[parent].children.push(nodes[i])
      } else {
        tree_roots.push(nodes[i])
        nodes[i].warnings = 'parent_id for ' + nodes[i].name + ' does not exist in data'
      }
    }
  }
  return callback(null, tree_roots)
}

// Converts CSV to JSON object and then passes the object to the treeify function
module.exports = function csv2tree (csv, id, parent_id, callback) {
  csvToObj(csv, function (err, array) {
    if (err) {
      callback(err)
    }
    getTree(JSON.parse(array), id, parent_id, function (err, tree) {
      if (err) {
        callback(err)
      }
      callback(null, JSON.stringify(tree, undefined, '\t'))
    })
  })
}
