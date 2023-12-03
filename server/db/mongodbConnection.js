require('./../configuration/setupConfig').configEnv();
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let $_vocabClient = null;

exports.vocabClient = () => {
    if (!$_vocabClient) {
        const database = client.db("vocabapp");
        $_vocabClient = database.collection("vocabs");
        console.log('created vocab client')
    }
    return $_vocabClient;
}

exports.filterWithId = (id) => {
    return { _id: new ObjectId(id) };
}

exports.getAll = async (dbClient) => {
    try {
        const cursor = dbClient.find({ review_count: { $lt: 6 }});
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
    } catch (error) {
        $_vocabClient = null;
        console.log(error)
    }
} 