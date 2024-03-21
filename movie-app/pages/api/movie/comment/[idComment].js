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
      comment = await OrmService.connectAndDeleteOne(
        MongoConfig.collections.comments,
        idComment
      );
      if (comment === 0) {
        res.json({ status: 400, data: "Comment not found" });
      }
      res.json({ status: 200, data: { comment: comment } });
  }
}
