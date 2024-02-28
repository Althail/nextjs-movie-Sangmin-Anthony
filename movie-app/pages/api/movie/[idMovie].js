import { ObjectId } from "mongodb";
import { OrmService } from "../../../services/OrmService";
import { MongoConfig } from "../../../services/MongoConfigService";

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

      res.json({ status: 200, data: { movie: dbGetMovie } });

    //?-----
    //? PUT
    //?-----
    case "PUT":
      const body = req.body;
      const dbPutMovie = await OrmService.connectAndModifyOne(
        MongoConfig.collections.movies,
        idMovie,
        body
      );

      if (dbPutMovie.modifiedCount === 0) {
        res.json({ status: 400, data: "Movie not found" });
      }

      res.json({ status: 200, data: { movie: dbPutMovie } });

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
