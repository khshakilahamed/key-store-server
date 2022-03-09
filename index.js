const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpgna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run(){
    try{
        await client.connect();
        console.log("connected");

        const database = client.db('keyStore')
        const keyboardCollections = database.collection('keyboards');

        app.get('/keyboards', async(req, res) => {
            const cursor = keyboardCollections.find({});
            const result = await cursor.toArray();
            res.send(result);
        })


    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello, from server')
})

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})