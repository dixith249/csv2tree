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
