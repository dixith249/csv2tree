#About

csv2tree is a simple module for converting comma separated values containing parent child relationships into nested hierarchical JSON arrays.  This module was created to help analyze data containing parent child relationships represented in a flat format.

##Example Data

id  | parent_id  | name  
--- | ---------- | ----
1   | 1          | Jim
2   | 1          | Jeff
3   | 2          | John
4   | 4          | Jason
5   | 4          | Jacob
6   | 2          | Jack
7   | 6          | James

In the example data above, each record has an id, and a parent_id.  Each parent_id is the parent record's id.  For instance, Jim is Jeff's parent because Jim's id is 1, and the parent_id for Jeff is 1.

In csv format, the data is represented as follows:

~~~
id,parent_id,name
1,,Jim
2,1,Jeff
3,2,John
4,1,Jason
5,4,Jacob
6,2,Jack
7,6,James
~~~

This data is typical of the query output of a table which contains a 1:n parent child relationship where the parent record id refers to the id or primary key of another record in the same table.  The data would be much easier to understand visually if it was represented as a nested tree.

~~~json
[
	{
		"id": "1",
		"parent_id": "",
		"name": "Jim",
		"children": [
			{
				"id": "2",
				"parent_id": "1",
				"name": "Jeff",
				"children": [
					{
						"id": "3",
						"parent_id": "2",
						"name": "John",
						"children": []
					},
					{
						"id": "6",
						"parent_id": "2",
						"name": "Jack",
						"children": [
							{
								"id": "7",
								"parent_id": "6",
								"name": "James",
								"children": []
							}
						]
					}
				]
			},
			{
				"id": "4",
				"parent_id": "1",
				"name": "Jason",
				"children": [
					{
						"id": "5",
						"parent_id": "4",
						"name": "Jacob",
						"children": []
					}
				]
			}
		]
	},
	{
		"id": "",
		"children": []
	}
]
~~~

This representation of the data is also easily converted to something like a unix style directory tree using a module such as treeify.

##API

~~~javascript
csv2tree(csv, id, parent_id, callback)
~~~

###Example Usage

~~~javascript
var csv2tree = require(csv2tree)

var csv = '~/path/to/csv'
var id = 'id'
var parent_id = 'parent_id'

csv2tree(csv, id, parent_id, function (tree) {
  console.log(tree)
})
~~~
