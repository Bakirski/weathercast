import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import axios from "axios";

const app = express();
const port = 4000;
let coordinates = {latitude: null, longitude: null};

env.config();
const api_key = process.env.API_KEY;

const corsOptions = {
  origin: true,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/get-location-data", async (req, res) => {
  const { location_name } = req.body;
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: api_key,
          q: location_name,
          aqi: "yes",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data for location: ", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.post("/current-location", async (req, res) => {
   const {latitude, longitude} = req.body;
   coordinates = {latitude, longitude};
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json`,
      { params: { key: api_key, q: `${coordinates.latitude},${coordinates.longitude}`, aqi: "yes" } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error geting weather for current: ", error);
  }
});

app.post("/get-forecast", async (req, res) => {
  const {location} = req.body;
  try{
    const response = await axios.get("http://api.weatherapi.com/v1/forecast.json",
     {params: 
      { key: api_key,
        q: location,
        days: 4,
        aqi : "no",
        alerts : "no"
      }});
      console.log(response.data.forecast.forecastday);
      res.json(response.data.forecast.forecastday);
      } catch(error){
        console.error("Error fetching forecast data: ", error);
        res.status(500).json({ error: "Error fetching forecast data" });
      }
      });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
