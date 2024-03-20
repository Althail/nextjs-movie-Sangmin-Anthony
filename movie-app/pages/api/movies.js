import { OrmService } from "/services/OrmService";
import { MongoConfig } from "/services/MongoConfigService";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags:
 *      - Movies
 *     description: Returns movies
 *     responses:
 *       200:
 *         description: Movies List
 *   post:
 *    tags:
 *     - Movies
 *    description: Create movie
 *    requestBody:
 *      description: Create a movie
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *    responses:
 *     201:
 *      description: Movie created
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 */
export default async function handler(req, res) {
  switch (req.method) {
    //?-----
    //? POST
    //?-----
    case "POST":
      const body = req.body;

      const movie = await OrmService.connectAndCreate(
        MongoConfig.collections.movies,
        body
      );

      res.json({ status: 201, data: movie });

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
