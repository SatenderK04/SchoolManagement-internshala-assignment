import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", schoolRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
