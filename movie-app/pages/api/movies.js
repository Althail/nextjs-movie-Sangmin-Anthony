import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  switch (req.method) {
    case "POST":
      const body = req.body;

      try {
        db.collection("movies").insertOne(body);
        res.json({ status: 200, data: "Movie inserted successfully" });
      } catch (e) {
        console.error(e);
      }

    case "GET":
      const movies = await db.collection("movies").find({}).limit(10).toArray();

      res.json({ status: 200, data: movies });
  }
}
