import { OrmService } from "/services/OrmService";
import { MongoConfig } from "/services/MongoConfigService";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Returns movies
 *     responses:
 *       200:
 *         description: Movies List
 *
 *   post:
 *     description: Insert a movie
 *     responses:
 *       200:
 *         description: Movie inserted successfully
 *
 */
export default async function handler(req, res) {
  switch (req.method) {
    //?-----
    //? POST
    //?-----
    case "POST":
      const body = req.body;

      try {
        db.collection("movies").insertOne(body);
        res.json({ status: 200, data: "Movie inserted successfully" });
      } catch (e) {
        console.error(e);
      }

    //?-----
    //? GET
    //?-----
    case "GET":
      const movies = await OrmService.connectAndFind(
        MongoConfig.collections.movies
      );

      res.json({ status: 200, data: movies });
  }
}
