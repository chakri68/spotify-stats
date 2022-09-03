const BASE_URL = "https://api.spotify.com/v1/";

// const allowedParams = ["query", "type", "locale", "offset", "limit", ""];

export default async function handler(req, res) {
  // req.url -> '/api/....'
  // req.query -> The query object
  try {
    let response = await fetch(
      `${BASE_URL}${Object.values(req.query).join("&")}`
    );
    let data = await response.json();
    if (data) {
      return res.status(200).json({ data: data, error: false });
    } else {
      return res.status(400).json({ error: true, message: "No data found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: true, message: "Bad Request" });
  }
}
