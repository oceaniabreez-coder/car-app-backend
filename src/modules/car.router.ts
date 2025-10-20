import { Router, Request, Response } from "express";
import { addCar, deleteCar, getCars} from "./car.service";
import { Car, CarFilter } from "./car.model";

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

//add new ca
router.post("/", async (req: Request, res: Response) => {
  try {
    const car: Car = req.body;

    // simple validation
    if (!car.name) {
      return res.status(400).json({ error: "Car name is required" });
    }

    const saved = await addCar(car);
    res.status(201).json({ message: "Car added successfully", car: saved });
  } catch (error: any) {
    console.error("POST /api/cars error:", error.message);
    res.status(500).json({ error: "Failed to add car" });
  }
});

//date car by id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Car ID is required" });
    }

    const result = await deleteCar(id);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("DELETE /api/cars/:id error:", error.message);
    if (error.message === "Car not found") {
      res.status(404).json({ error: "Car not found" });
    } else {
      res.status(500).json({ error: "Failed to delete car" });
    }
  }
});


export default router;