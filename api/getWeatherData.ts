import type { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { lat, lon, apiCallType } = req.query;
  const apiKey = process.env.API_KEY;

  if (!lat || !lon || !apiCallType || !apiKey) {
    return res.status(400).json({
      error: "Latitude, Longitude, API key, and API call type are required",
    });
  }

  const validTypes = ["weather", "forecast"];
  if (!validTypes.includes(apiCallType as string)) {
    return res.status(400).json({ error: "Invalid type parameter" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/${apiCallType}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: "An error occurred" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
