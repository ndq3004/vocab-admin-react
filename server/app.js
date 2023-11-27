const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
var cors = require('cors')
const path = require('path')

require('dotenv').config()

app.use(cors());
 
//middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));

//mongo
const { vocabClient, filterWithId, getAll } = require("./db/mongodbConnection");

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

