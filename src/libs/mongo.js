// mongodb.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://ayansheikh:ayansheikh@cluster0.bxwdrui.mongodb.net';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let db;

const connectToDatabase = async () => {
  client = await MongoClient.connect(uri, options);
  db = client.db('Governer-House');
};

const getDb = () => db;
console.log(client);

const disconnectFromDatabase = () => client.close();

export { connectToDatabase, getDb, disconnectFromDatabase };
