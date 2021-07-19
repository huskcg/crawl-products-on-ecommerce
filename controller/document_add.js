var client = require('./connection.js');
module.exports = {
  async addDocument(data) {
    // console.log('data',data);
    for(let da of data) {
      await client.index({
        index: 'products',
        // id: '1',
        type: 'constituencies',
        body: da
      }, function (err, resp, status) {
        console.log(resp);
      });
    }
   
  }
}