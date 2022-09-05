const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export default async function handler(req, res) {
  const { query, method } = req;
  switch (method) {
    case "GET":
      try {
        let r = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              new Buffer(client_id + ":" + client_secret).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials",
        });
        let data = await r.json();
        if (!data.hasOwnProperty("error")) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ error: data });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
      }
      break;
  }
}
