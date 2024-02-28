import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";
import { MongoConfig } from "./MongoConfigService";

const connectToDB = async () => {
  const client = await clientPromise;
  return client.db(MongoConfig.databases.mflix);
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
    .updateOne({ _id: ObjectId(idObjectToFind) }, { $set: body });
};

const _connectAndDeleteOne = async (dbName, idObjectToFind) => {
  const db = await connectToDB();
  return await db
    .collection(dbName)
    .deleteOne({ _id: ObjectId(idObjectToFind) });
};

export const OrmService = {
  connectAndFind: _connectAndFind,
  connectAndFineOne: _connectAndFindOne,
  connectAndModifyOne: _connectAndModifyOne,
  connectAndDeleteOne: _connectAndDeleteOne,
};
