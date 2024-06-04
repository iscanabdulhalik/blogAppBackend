import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes); // Routes dosyasının Exprss'e tanıtılması

export default app;
