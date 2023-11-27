const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

const $_vocabClient = null;

export const vocabClient = () => {
    if (!$_vocabClient) {
        const database = client.db("vocabapp");
        vocabClient = database.collection("vocabs");
        console.log('created vocab client')
    }
    return $_vocabClient;
}

export const filterWithId = (id) => {
    return { _id: new ObjectId(id) };
}

export const getAll = async (dbClient) => {
    const cursor = dbClient.find({});
    // Print a message if no documents were found
    if ((await dbClient.countDocuments({})) === 0) {
        console.log("No documents found!");
    }

    const docs = [];
    // Print returned documents
    for await (const doc of cursor) {
        docs.push(doc);
    }

    return docs
} 