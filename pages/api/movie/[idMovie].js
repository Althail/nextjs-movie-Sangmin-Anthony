import { OrmService } from "../../../services/OrmService";
import { HttpService } from "../../../services/HttpService";
import { MongoConfig } from "../../../services/MongoConfigService";

/**
 * @swagger
 * /api/movie/{idMovie}:
 *   get:
 *     tags:
 *      - Movie
 *     description: Returns movie by id
 *     parameters:
 *      - name: idMovie
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *     responses:
 *       200:
 *         description: Movie by id
 *       404:
 *         description: Movie Not Found
 *   put:
 *    tags:
 *     - Movie
 *    description: Update movie by id
 *    parameters:
 *      - name: idMovie
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    requestBody:
 *      description: Update an existent movie
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *    responses:
 *     200:
 *      description: Movie updated
 *     404:
 *      description: Movie Not Found
 *   delete:
 *    tags:
 *     - Movie
 *   description: Delete movie by id
 *   parameters:
 *     - name: idMovie
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *        format: string
 *   responses:
 *     200:
 *       description: Movie by id
 *     404:
 *       description: Movie Not Found
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
 */
export default async function handler(req, res) {
  const { idMovie } = req.query;

  switch (req.method) {
    //?-----
    //? GET
    //?-----
    case "GET":
      const dbGetMovie = await OrmService.connectAndFineOne(
        MongoConfig.collections.movies,
        idMovie
      );

      res.status(200).json(dbGetMovie);

    //?-----
    //? PUT
    //?-----
    case "PUT":
      const movie_to_put = req.body;
      const result = await OrmService.connectAndModifyOne(
        MongoConfig.collections.movies,
        req.query.idMovie,
        movie_to_put
      );
      if (result.matchedCount === 0) {
        HttpService.return_http_status_code_and_data(
          res,
          404,
          "Movie Not Found"
        );
        return;
      } else {
        HttpService.return_http_status_code_and_data(res, 200, "Put Success");
      }
      break;

    //?-----
    //? DELETE
    //?-----
    case "DELETE":
      const dbDeleteMovie = await OrmService.connectAndDeleteOne(
        MongoConfig.collections.movies,
        idMovie
      );

      res.json({ status: 200, data: { movie: dbDeleteMovie } });
  }
}
