const express = require("express");
const app = express();
var cors = require('cors')
const path = require('path')

app.use(cors());
 
//middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

//mongo
const { MongoClient, ObjectId } = require("mongodb");
const uri = 'mongodb+srv://nguyenquan3004:gvY9FB51GpsLbn5G@clusterfunix.utiuxfg.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const database = client.db("vocabapp");
const vocabsCollection = database.collection("vocabs");

//mem cache
const NodeCache = require('node-cache');
const mc = new NodeCache({stdTTL: 3000})

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

const { OpenAI } = require("openai");

const config = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateExampleFn = async (word) => {
  if (mc.has(word)) {
    console.log('has cache for ' + word);
    return mc.get(word);
  }
  const res = await config.chat.completions.create({
    messages: [{ role: 'user', content: `generate some examples for the word "${word}"` }],
    model: 'gpt-3.5-turbo',
  });

  mc.set(word, res.choices);

  console.log(res)

  return res.choices;
}



app.get('/api', async (req, res) => {
  generateExampleFn();
  res.send({});
})

app.get('/api/vocabs', async (req, res) => {
  const result = await getAll();
  res.send({data: result});
})

app.get('/api/vocab/:id', async (req, res) => {
  const id = req.params.id;
  const result = await vocabsCollection.find(new ObjectId(id));
  res.send({data: result});
})

app.post('/api/vocab', async (req, res) => {
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

app.put('/api/vocab/:id', async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const result = await getAll();
  res.send({data: result});
})

app.delete('/api/vocab/:id', async (req, res) => {
  const id = req.params.id;
  await vocabsCollection.deleteOne({_id: new ObjectId(id)});
  res.send({msg: "success"});
})

app.get('/api/openai/:word', async (req, res) => {
  const choices = await generateExampleFn(req.params.word);
  res.send({data: choices})
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
 
app.listen(3001, 'localhost', () => {
  console.log("Server is running on port 3001");
});

