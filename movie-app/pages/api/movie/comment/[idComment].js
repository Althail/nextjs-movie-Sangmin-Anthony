import { MongoConfig } from "../../../../services/MongoConfigService";
import { OrmService } from "../../../../services/OrmService";
import clientPromise from "/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const { idMovie, idComment } = req.query;
  let comment;

  switch (req.method) {
    //?-----
    //? GET
    //?-----
    case "GET":
      comment = await OrmService.connectAndFineOne(
        MongoConfig.collections.comments,
        idComment
      );
      res.json({ status: 200, data: { comment: comment } });

    //?-----
    //? PUT
    //?-----
    case "PUT":
      const body = req.body;
      comment = await OrmService.connectAndModifyOne(
        MongoConfig.collections.comments,
        idComment,
        body
      );
      res.json({ status: 200, data: { comment: comment } });

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
