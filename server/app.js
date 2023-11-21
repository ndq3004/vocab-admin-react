require('dotenv').config()

const express = require("express");
const app = express();
var cors = require('cors')
const path = require('path')

const { PORT = 3000 } = process.env;
app.use(cors());
 
//middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));

//mongo
const { MongoClient, ObjectId } = require("mongodb");
let vocabClient = null;

const initVocabClient = () => {
  if (vocabClient == null) {
    const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
    const database = client.db("vocabapp");
    vocabClient = database.collection("vocabs");
  }
  return vocabClient;
}

//mem cache
const NodeCache = require('node-cache');
const mc = new NodeCache({stdTTL: 3000})

const getAll = async () => {
  const cursor = initVocabClient().find({});
  // Print a message if no documents were found
  if ((await initVocabClient().countDocuments({})) === 0) {
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

const generateExampleFn = async (word) => {
  const config = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

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



app.get('/api/test', async (req, res) => {
  res.send({ success: 'test version' });
})

app.get('/api/vocabs', async (req, res) => {
  const result = await getAll();
  res.send({data: result});
})

app.get('/api/vocab/:id', async (req, res) => {
  const id = req.params.id;
  const result = await initVocabClient().find(new ObjectId(id));
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
  await initVocabClient().insertOne(payload);
  res.send({data: payload});
})

app.put('/api/vocab/:id', async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const result = await initVocabClient().updateOne(
    {_id: new ObjectId(id)},
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

app.delete('/api/vocab/:id', async (req, res) => {
  const id = req.params.id;
  await initVocabClient().deleteOne({_id: new ObjectId(id)});
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
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

