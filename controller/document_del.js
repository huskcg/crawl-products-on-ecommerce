var client = require('./connection.js');

client.delete({  
  index: 'products',
  // id: '1',
  type: 'constituencies'
},function(err,resp,status) {
    console.log(resp);
});