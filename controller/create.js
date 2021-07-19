var client = require('./connection.js');

client.indices.create({  
  index: 'products'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("create",resp);
  }
});