import clientPromise from "/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const { idMovie, idComment } = req.query;

  switch (req.method) {
    //?-----
    //? GET
    //?-----
    case "GET":
      console.log("req.query :: ", req.query);
    //?-----
    //? PUT
    //?-----
    case "PUT":
    //?-----
    //? DELETE
    //?-----
    case "DELETE":
  }
}
