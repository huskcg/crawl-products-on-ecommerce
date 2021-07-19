const { addDocument } = require("./document_add")

test()
function test() {
    const products = {
        name: 'dt',
        rate : 2,
        price: 20000,
    }
    addDocument(products)
}
