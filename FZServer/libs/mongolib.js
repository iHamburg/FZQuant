/**
 * Created by zhangyiqing on 16/11/18.
 */

const MongoClient = require('mongodb').MongoClient;
const config = require('../configs/configs').mongodb
const url = 'mongodb://' + config.host + ':' + config.port;
const dbName = config.db;

let _client;
let _db;

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log('connect err', err);
  }
  console.log("Connected successfully to server");
  _db = client.db(dbName);
  _client = client
});

module.exports = {
  queryCollection: function (collectionName, callback) {
    const collection = _db.collection(collectionName)
    // collection.find({where:{date:{'$gt':'2017-1-1'}}}).toArray(callback)
    collection.find({}).toArray(callback)
  }
}
