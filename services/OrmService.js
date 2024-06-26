import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";
import { MongoConfig } from "./MongoConfigService";

const connectToDB = async () => {
  const client = await clientPromise;
  return client.db(MongoConfig.databases.mflix);
};

const _connectAndCreate = async (dbName, body) => {
  const db = await connectToDB();
  return await db.collection(dbName).insertOne(body);
};

const _connectAndFind = async (dbName) => {
  const db = await connectToDB();
  return await db.collection(dbName).find({}).limit(10).toArray();
};

const _connectAndFindOne = async (dbName, idObjectToFind) => {
  const db = await connectToDB();
  return await db
    .collection(dbName)
    .findOne({ _id: new ObjectId(idObjectToFind) });
};

const _connectAndModifyOne = async (dbName, idObjectToFind, body) => {
  const db = await connectToDB();
  return await db
    .collection(dbName)
    .findOneAndUpdate(
      { _id: new ObjectId(idObjectToFind) },
      { $set: body },
      { returnDocument: "after" }
    );
};

const _connectAndDeleteOne = async (dbName, idObjectToFind) => {
  const db = await connectToDB();
  return await db
    .collection(dbName)
    .deleteOne({ _id: new ObjectId(idObjectToFind) });
};

export const OrmService = {
  connectAndFind: _connectAndFind,
  connectAndFineOne: _connectAndFindOne,
  connectAndModifyOne: _connectAndModifyOne,
  connectAndDeleteOne: _connectAndDeleteOne,
  connectAndCreate: _connectAndCreate,
};
