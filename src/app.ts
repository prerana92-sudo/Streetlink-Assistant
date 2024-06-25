import express, { urlencoded } from "express";
import cors from "cors";
import alertRoutes from "./routes/alerts";
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/streetlink", alertRoutes);

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Send the HTML file for any GET request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/assistant.html'));
});

export default app;
