var client = require('./connection.js');

module.exports = {
  async search() {
    var data;
     var promiss = await client.search({  
      index: 'products',
      type: 'constituencies',
      size: 20,
      body: {
        query: {
          "match_all": {}
        },
      }
    });
  //   , function (error, response,status) {
  //     if (error){
  //       console.log("search error: "+error)
  //     }
  //     else {
  //       // console.log("--- Response ---");
  //       // console.log(response);
  //       // console.log("--- Hits ---");
  //       // response.hits.hits.forEach(function(hit){
  //       //   console.log(hit);
  //       // })
  //       return response.hits.hits
  //     }
  // }
    console.log('promiss',promiss)
    // setTimeout(() => {
    //   console.log(data);
    // }, 2000);
    return promiss;
  }
  
}