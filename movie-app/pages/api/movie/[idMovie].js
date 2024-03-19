import { ObjectId } from "mongodb";
import { OrmService } from "../../../services/OrmService";
import { HttpService } from "../../../services/HttpService";
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
