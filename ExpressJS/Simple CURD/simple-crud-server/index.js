const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        // const database = client.db('simpleCRUD');
        // const usersCollection = database.collection('users');



        // app.post('/users', async (req, res) => {
        //     console.log('data send server', req.body);
        //     const newUser = req.body;
        //     const result = await usersCollection.insertOne(newUser);
        //     res.send(result);
        // })

        const usersCollection = client.db('simpleCRUD').collection('users');



        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();
            const users = await cursor.toArray();
            console.log('users', users);
            
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            console.log('data send server', req.body);
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })


        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete user with id', id);
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Simple CRUD app run on http://localhost:${port}`)
})




