const express = require('express');
const router = express.Router();

const { vocabClient, filterWithId, getAll } = require("./../db/mongodbConnection");

// /api
router.get('/test', async (req, res) => {
  res.send({ success: 'test version' });
})

router.get('/vocabs', async (req, res) => {
  const result = await getAll(vocabClient());
  res.send({data: result});
})

router.get('/vocab/:id', async (req, res) => {
  const id = req.params.id;
  const result = await vocabClient().find(filterWithId(id));
  res.send({data: result});
})

router.post('/vocab', async (req, res) => {
  const payload = req.body;
  const doc = {
    word: payload.word,
    word_type: payload.word_type,
    meaning: payload.meaning,
    review_count: payload.review_count,
    created_date: new Date()
  }
  console.log(doc)
  await vocabClient().insertOne(payload);
  res.send({data: payload});
})

router.put('/vocab/:id', async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const result = await vocabClient().updateOne(
    filterWithId(id),
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

router.delete('/vocab/:id', async (req, res) => {
  const id = req.params.id;
  await vocabClient().deleteOne(filterWithId(id));
  res.send({msg: "success"});
})

router.get('/openai/:word', async (req, res) => {
  const choices = await generateExampleFn(req.params.word);
  res.send({data: choices})
})

// All other GET requests not handled before will return our React app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
 
module.exports = router;