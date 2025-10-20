import { Router, Request, Response } from "express";
import { getCars} from "./car.service";
import { CarFilter } from "./car.model";

const router = Router();

//search with the filter
router.post("/search", async (req: Request, res: Response) => {
  try {
    const { filter, limit } = req.body;

    // Type-safe filter (only accepted keys)
    const carFilter: CarFilter = {
      acceleration: filter?.acceleration,
      cylinders: filter?.cylinders,
      displacement: filter?.displacement,
      horsepower: filter?.horsepower,
      model_year: filter?.model_year,
      mpg: filter?.mpg,
      name: filter?.name,
      origin: filter?.origin,
      weight: filter?.weight,
    };

    const cars = await getCars(carFilter, limit);
    res.status(200).json({ count: cars.length, cars });
  } catch (error: any) {
    console.error("POST /api/cars/search error:", error.message);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

export default router;