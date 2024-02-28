import { OrmService } from "/services/OrmService";
import { MongoConfig } from "/services/MongoConfigService";

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
