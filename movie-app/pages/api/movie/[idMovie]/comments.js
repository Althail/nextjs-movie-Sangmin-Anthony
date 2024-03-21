import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/***
 * @swagger
 * /api/movie/{idMovie}/comments:
 *   get:
 *     tags:
 *      - Comments
 *     description: Returns comments for specific movie
 *     parameters:
 *      - name: idMovie
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *     responses:
 *       200:
 *         description: Comments List
 *   post:
 *     tags:
 *      - Comments
 *     description: Create comment for specific movie
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     requestBody:
 *       description: Create a comment for a movie
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 */
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
