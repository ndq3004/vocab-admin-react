const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");

// configure app
require("./configuration/setupConfig").configApp(app);

//router
const vocabRouter = require("./routes/vocab");
const defaultRouter = require("./routes/default");

app.use('/api', vocabRouter)
app.use('*', defaultRouter)

// run listener
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

