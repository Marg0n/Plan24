const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// =================================
//config
// =================================

require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;


// =================================
//middleware
// =================================

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    // "client_side",
    // server_side
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(express.json());


// =================================
// jwt validation middleware
// =================================

const verifyToken = async (req, res, next) => {

  // console.log('jtw header:', req.headers.authorization)

  const initialToken = await req.headers.authorization
  // console.log('jtw header initialToken :::>', initialToken)

  // for local storage only
  if (!initialToken) {
    return res.status(401).send({ message: 'Unauthorized access!!' });
  }
  // validate local storage token
  const token = await initialToken.split(' ')[1];


  if (!token) {
    return res.status(401).send({ message: 'Unauthorized access...' });
  }

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log('err token :::>', err)
        return res.status(401).send({ message: 'Unauthorized access' });
      }
      // console.log(decoded)
      req.decoded = decoded
      next()
    })
  }
}


// =================================
//creating Token
// =================================

app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log("user for token", user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });

  res
    // .send({ success: true });
    .send({ token });
});


// =================================
//clearing Token
// =================================

app.get("/logout", async (req, res) => {
  const user = req.body;
  console.log("logging out", user);
  res.send({ success: true });
});

//routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});


// =================================
//connection to mongodb
// =================================

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqvcpai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqvcpai.mongodb.net/`;




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


    // =================================
    // DB Collections' Connection
    // =================================
    const usersCollection = client.db("plan24").collection("users");
    const tasksCollection = client.db("plan24").collection("tasks");


    // =================================
    // API Connections for users
    // =================================

    // Post users registration data
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    })



    // =================================
    // API Connections for tasks
    // =================================

    // Post tasks registration data
    app.post('/addTask', verifyToken, async (req, res) => {
      const newTask = req.body;
      const result = await tasksCollection.insertOne(newTask);
      res.send(result);
    })

    // Get a specific users' task data by email
    app.get('/tasks/:email', verifyToken, async (req, res) => {
      const mail = req.params?.email;
      const results = await tasksCollection.find({ addedByEmail: mail }).toArray();
      res.send(results);
    });

    // Get a specific tasks' data by id
    app.get('/getTask/:id', verifyToken, async (req, res) => {
      try {
        const id = req.params?.id;
        // console.log('id===>',id);
        const result = await tasksCollection.findOne({ _id: new ObjectId(id) });
        res.send(result);
      }
      catch (err) {
        console.error('Error updating user status:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // delete tasks' data
    app.delete('/deleteTasks/:id', verifyToken, async (req, res) => {
      const id = req.params?.id;
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Update tasks' data by id
    app.put('/updateTasks/:id', async (req, res) => {
      const id = req.params?.id;
      const request = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const data = {
        $set: {
          ...request,
        }
      }
      const result = await tasksCollection.updateOne(query, data, options);
      res.send(result);
    });

    // Patch a tasks' Status by id
    // app.patch('/taskStatus/:id', verifyToken, async (req, res) => {
    //   try {
    //     const id = req.params?.id; // Extract the user id from the request parameters
    //     const updateBody = req.body; // Extract the new status from the request body
    //     const query = { _id: new ObjectId(id) }
    //     const updateDoc = {
    //       $set: {
    //         status: updateBody.status,
    //       },
    //     }

    //     const results = await tasksCollection.updateOne(query, updateDoc);
    //     res.send(results);
    //   }
    //   catch (err) {
    //     // If an error occurs during execution, catch it here
    //     console.error('Error updating user status:', err);
    //     // Send an error response to the client
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // });

    // =================================================================
    // mongoDB ping request
    // =================================================================


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
