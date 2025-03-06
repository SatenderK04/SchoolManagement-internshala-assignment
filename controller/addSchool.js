import { db } from "../config/initDB.js";

const addSchool = (req, res) => {
  let { name, address, latitude, longitude } = req.body;
  //   console.log(req.body);
  name = name.trim();
  address = address.trim();
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);
  if (!name || !address || !latitude || !longitude) {
    console.log("All the fields are required");
    return res.status(500).json({ message: "All fields are required" });
  }
  try {
    const q = `INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)`;

    db.query(q, [name, address, latitude, longitude], (err, result) => {
      if (err) {
        console.log("Error While adding school ", err);
        return res
          .status(400)
          .json({ message: "Error occured, school not added", err });
      }
      res.status(200).json({
        message: "School Added Successfully",
        schoolId: result.insertId,
      });
      console.log("school Added:", result.insertId);
    });
  } catch (err) {
    console.log("Something went wrong!!");
    res.status(500).json({ message: "Server Error!" });
  }
};

export default addSchool;
