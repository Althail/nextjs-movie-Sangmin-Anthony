import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const { idMovie } = req.query;

  switch (req.method) {
    //?-----
    //? POST
    //? ----
    case "POST":
      const body = req.body;
      body.movie_id = ObjectId(idMovie);
      try {
        db.collection("comments").insertOne(body);

        db.collection("movies").updateOne({ $inc: { num_mflix_comments: 1 } });

        res.json({
          status: 200,
          data: "Comment inserted successfully",
        });
      } catch (e) {
        console.error(e);
      }

    //?-----
    //? GET
    //?-----
    case "GET":
      const comments = await db
        .collection("comments")
        .find({ movie_id: ObjectId(idMovie) })
        .toArray();
      res.json({ status: 200, data: { comments: comments } });
  }
}
