const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");

// configure app
require("./configuration/setupConfig").configApp(app);

//router
const vocabRouter = require("./routes/vocab");

app.use('/api', vocabRouter)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// run listener
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

