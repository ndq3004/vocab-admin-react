const express = require('express');
const router = express.Router();
const path = require('path')

const { vocabClient, filterWithId, getAll } = require("./../db/mongodbConnection");
const { generateExampleForWord } = require('../extentions/openaiGenerator');

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
        sample: payload.sample,
        review_count: payload.review_count,
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
  console.log('open ai')
  const choices = await generateExampleForWord(req.params.word);
  res.send({data: choices})
})

router.get('/openai', async (req, res) => {
  console.log('open ai')
  res.send({data: []})
})

router.get('/backup', async (req, res) => {
  console.log('start backup')
  const result = await getAll(vocabClient());
  var fs = require('fs');
  fs.writeFile('backup.json', JSON.stringify(result), () => {
    res.setHeader('Content-Type', 'text/plain');
    res.download(path.resolve('backup.json'))
  });
  // fs.readFile('backup.json', (err, data) => {
  //   res.setHeader('Content-Disposition', 'attachment; filename="file.txt"');
  //   res.setHeader('Content-Type', 'text/plain');

  //   // Pipe the file data into the response
  //   res.end(data);
  // });
  // res.setHeader('Content-Length', file.length);
  // res.setHeader('Content-Type', 'file');
  // res.setHeader('Content-Disposition', 'attachment; filename=backup.json');
  // res.write(file, 'binary');
  // res.end();
  
  
})

module.exports = router;