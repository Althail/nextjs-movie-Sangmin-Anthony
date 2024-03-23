import { HttpService } from "../../../../services/HttpService";
import { MongoConfig } from "../../../../services/MongoConfigService";
import { OrmService } from "../../../../services/OrmService";

/**
 * @swagger
 * /api/movie/comment/{idComment}:
 *   get:
 *     tags:
 *      - Comment
 *     description: Returns comment by id
 *     parameters:
 *      - name: idComment
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *         format: string
 *     responses:
 *       200:
 *         description: Comment by id
 *       404:
 *        description: Comment Not Found
 *   put:
 *     tags:
 *      - Comment
 *     description: Update comment by id
 *     parameters:
 *      - name: idComment
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *         format: string
 *     requestBody:
 *       description: Update an existent comment
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *      200:
 *       description: Comment updated
 *      404:
 *       description: Comment Not Found
 *   delete:
 *    tags:
 *     - Comment
 *    description: Delete comment by id
 *    parameters:
 *      - name: idComment
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *         format: string
 *    responses:
 *      200:
 *       description: Comment by id
 *      404:
 *       description: Comment Not Found
 * components:
 *  schemas:
 *   Comment:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      example: John Doe
 *     email:
 *      type: string
 *      example: hello@gmail.com
 *     text:
 *      type: string
 *      example: This is a comment
 *     date:
 *      type: string
 *      format: date-time
 *      example: 2021-07-20T09:00:00.000Z
 *
 *
 */
export default async function handler(req, res) {
  const { idMovie, idComment } = req.query;
  let comment;
  switch (req.method) {
    //?-----
    //? GET
    //?-----
    case "GET":
      const dbGetComment = await OrmService.connectAndFineOne(
        MongoConfig.collections.comments,
        idComment
      );

      if (dbGetComment === null) {
        HttpService.return_http_status_code_and_data(
          res,
          404,
          "Comment not found"
        );
        return;
      }
      res.status(200).json(dbGetComment);

    //?-----
    //? PUT
    //?-----
    case "PUT":
      const comment_to_put = req.body;
      const result = await OrmService.connectAndModifyOne(
        MongoConfig.collections.comments,
        req.query.idComment,
        comment_to_put
      );
      if (result.matchedCount === 0) {
        HttpService.return_http_status_code_and_data(
          res,
          404,
          "Comment not found"
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
      const comment_to_delete = await OrmService.connectAndDeleteOne(
        MongoConfig.collections.comments,
        idComment
      );
      if (comment_to_delete === 0) {
        HttpService.return_http_status_code_and_data(
          res,
          404,
          "Comment not found"
        );
      }
      HttpService.return_http_status_code_and_data(res, 200, "Delete Success");
  }
}
