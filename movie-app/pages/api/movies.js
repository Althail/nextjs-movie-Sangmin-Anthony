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
 *             $ref: '#/components/schemas/Movie'
 *    responses:
 *     201:
 *      description: Movie created
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *     500:
 *      description: Internal Server Error
 * components:
 *  schemas:
 *    Movie:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         example: Lord of the Rings
 *       plot:
 *         type: string
 *         example: A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.
 *       genres:
 *         type: array
 *         items:
 *          type: string
 *          example: Adventure, Drama, Fantasy
 *       runtime:
 *        type: number
 *        example: 178
 *       cast:
 *        type: array
 *        items:
 *         type: string
 *         example: Elijah Wood, Ian McKellen, Orlando Bloom
 *       num_mflix_comments:
 *        type: number
 *        example: 123
 *       poster:
 *        type: string
 *        example: https://m.media-amazon.com/images/I/71c5jR1f5CL._AC_SY679_.jpg
 *       fullplot:
 *        type: string
 *        example: A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.
 *       countries:
 *        type: array
 *        items:
 *         type: string
 *         example: New Zealand, United States
 *       released:
 *        type: object
 *        properties:
 *         $date:
 *          type: object
 *          properties:
 *           $numberLong:
 *            type: string
 *            example: -946771200000
 *       directors:
 *        type: array
 *        items:
 *         type: string
 *         example: Peter Jackson, Fran Walsh
 *       writers:
 *        type: array
 *        items:
 *         type: string
 *         example: J.R.R. Tolkien, Fran Walsh
 *       awards:
 *        type: object
 *        properties:
 *         wins:
 *          type: number
 *          example: 17
 *         nominations:
 *          type: number
 *          example: 30
 *         text:
 *          type: string
 *          example: Won 4 Oscars. Another 113 wins & 123 nominations.
 *       year:
 *        type: number
 *        example: 2001
 *       imdb:
 *        type: object
 *        properties:
 *         rating:
 *          type: number
 *          example: 8.8
 *         votes:
 *          type: number
 *          example: 1610000
 *         id:
 *          type: number
 *          example: 1207
 *       type:
 *        type: string
 *        example: movie
 *       tomatoes:
 *        type: object
 *        properties:
 *         viewer:
 *          type: object
 *          properties:
 *           rating:
 *            type: number
 *            example: 4.6
 *           numReviews:
 *            type: number
 *            example: 123
 *       lastUpdated:
 *        type: object
 *        properties:
 *         $date:
 *          type: string
 *          example: 2015-09-10T17:02:33.000Z
 *
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
