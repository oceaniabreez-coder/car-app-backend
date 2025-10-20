import express,  { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Simple test route with error handling
app.get("/", (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Server is running" });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err?: Error) => {
  if (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
  console.log(`Server running at http://localhost:${PORT}`);
});