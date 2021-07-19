// var client = require('./connection.js');

// client.indices.delete({index: 'products'},function(err,resp,status) {  
//   console.log("delete",resp);
// });


var elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client({
  hosts: ["http://localhost:9200"]
});


/* Delete index */
client.indices.delete({
  index: 'products',
}).then(function(resp) {
  console.log("Successful query!");
  console.log(JSON.stringify(resp, null, 4));
}, function(err) {
  console.trace(err.message);
});