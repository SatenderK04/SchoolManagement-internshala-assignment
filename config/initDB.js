import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

const connectDB = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to DATABASE ", err);
    } else {
      console.log("Connected to DATABASE");
      connection.release();
    }
  });
};

connectDB();

export { db };
