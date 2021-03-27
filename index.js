const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const password = 'JG8YaEHgnccp2R9'

const uri = "mongodb+srv://organicUser:JG8YaEHgnccp2R9@cluster0.0hc8c.mongodb.net/organicdb?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");
  
    app.get('/product', (req, res) =>{
        productCollection.find({})
        .toArray( (err, documents) =>{
            res.send(documents);
        } )
    })

  app.post("/addProduct", (req, res) => {       
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
        console.log('data addedd successfullu');
        res.send('success')
    })
  });

});



app.listen(3000);
