const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");

// configure app
require("./configuration/setupConfig").configApp(app);

const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
const database = client.db("vocabapp");
const vocabClient1 = database.collection("vocabs");
vocabClient1.insertOne({name: "Quan"})
//router
const vocabRouter = require("./routes/vocab");

app.use('/api', vocabRouter)

// run listener
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

