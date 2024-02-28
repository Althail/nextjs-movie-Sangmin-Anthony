import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const { idMovie } = req.query;

  switch (req.method) {
    //?-----
    //? GET
    //?-----
    case "GET":
      const dbGetMovie = await db
        .collection("movies")
        .findOne({ _id: ObjectId(idMovie) });

      res.json({ status: 200, data: { movie: dbGetMovie } });

    //?-----
    //? PUT
    //?-----
    case "PUT":
      const body = req.body;
      const dbPutMovie = await db
        .collection("movies")
        .updateOne({ _id: ObjectId(idMovie) }, { $set: body });

      res.json({ status: 200, data: { movie: dbPutMovie } });

    //?-----
    //? DELETE
    //?-----
    case "DELETE":
      const dbDeleteMovie = await db
        .collection("movies")
        .deleteOne({ _id: ObjectId(idMovie) });

      res.json({ status: 200, data: { movie: dbDeleteMovie } });
  }
}
