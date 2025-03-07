import { db } from "../config/initDB.js";

/// Haversine formula to calculate distance between two points (latitude, longitude).

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const R = 6371; // Earth radius in KM

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in KM
};

const listSchools = (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Please enter your Latitude and Longitude" });
  }

  try {
    const q = `SELECT * FROM schools`;

    db.query(q, (err, result) => {
      if (err) {
        console.log("Something went wrong while fetching schools list", err);
        return res.status(400).json({
          message: "Something went wrong while fetching schools list",
          err,
        });
      }

      // distance has been added to each school using getDistance().
      const schoolsWithDistance = result.map((school) => {
        const distance = getDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          parseFloat(school.latitude),
          parseFloat(school.longitude)
        );
        return { ...school, distance };
      });

      schoolsWithDistance.sort((a, b) => a.distance - b.distance); // sorting the schools with distance (ascending order)

      res
        .status(200)
        .json({ message: "School fetched successfully", schoolsWithDistance });
    });
  } catch (err) {
    console.log("Error while fetching schools", err);
    return res
      .status(400)
      .json({ message: "Error while fetching schools list", err });
  }
};

export default listSchools;
