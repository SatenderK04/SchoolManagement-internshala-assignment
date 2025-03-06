import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Hello@2004",
  database: process.env.DB_NAME || "schoolmanagement",
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
