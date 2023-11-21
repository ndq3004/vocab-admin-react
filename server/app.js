

const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors());
 
//middleware
app.use(express.json());

const { MongoClient, ObjectId } = require("mongodb");
const uri = 'mongodb+srv://nguyenquan3004:gvY9FB51GpsLbn5G@clusterfunix.utiuxfg.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const database = client.db("vocabapp");
const vocabsCollection = database.collection("vocabs");

const getAll = async () => {
  const cursor = vocabsCollection.find({});
  // Print a message if no documents were found
  if ((await vocabsCollection.countDocuments({})) === 0) {
    console.log("No documents found!");
  }

  const docs = [];
  // Print returned documents
  for await (const doc of cursor) {
    docs.push(doc);
  }

  return docs
}

app.get('/', async (req, res) => {
  
  res.send({});
})

app.get('/vocabs', async (req, res) => {
  const result = await getAll();
  res.send({data: result});
})

app.get('/vocab/:id', async (req, res) => {
  const id = req.params.id;
  const result = await vocabsCollection.find(new ObjectId(id));
  res.send({data: result});
})

app.post('/vocab', async (req, res) => {
  const payload = req.body;
  const doc = {
    word: payload.word,
    word_type: payload.word_type,
    meaning: payload.meaning,
    review_count: payload.review_count,
    created_date: new Date()
  }
  console.log(doc)
  await vocabsCollection.insertOne(payload);
  res.send({data: payload});
})

app.put('/vocab/:id', async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const result = await vocabsCollection.updateOne(
    {_id: new ObjectId(payload._id)},
    {
      $set: {
        word: payload.word,
        word_type: payload.word_type,
        meaning: payload.meaning,
        sample: payload.sample
      }
    })
  res.send({ success: result.modifiedCount == 1 ? true : false, data: payload});
})

app.delete('/vocab/:id', async (req, res) => {
  const id = req.params.id;
  await vocabsCollection.deleteOne({_id: new ObjectId(id)});
  res.send({msg: "success"});
})
 
app.listen(3001, 'localhost', () => {
  console.log("Server is running on port 3001");
});

