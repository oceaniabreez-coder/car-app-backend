import { db } from "../config/firebase";
import { Car, CarFilter,CAR_RANGES, EQ_KEYS } from "./car.model";
import {COLLECTIONS} from "../config/collection"


//search car service
export async function getCars(filter: CarFilter = {}, limit:number) {
    try {
    let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.carList).limit(Math.min(limit, 200));

    for (const k of EQ_KEYS) {
      const v = filter[k as string];
      if (v === undefined || v === null) continue;
      if (typeof v === 'string') {
        const t = v.trim();
        if (t === '') continue;
        query = query.where(k as string, '==', t);
      } else {
        query = query.where(k as string, '==', v);
      }
    }

     for (const r of CAR_RANGES) {
      const minVal = filter[r.min];
      console.log(r.min,minVal)
      const maxVal = filter[r.max];
      console.log(r.max,maxVal)
      if (minVal !== undefined) query = query.where(r.field, '>=', minVal);
      if (maxVal !== undefined) query = query.where(r.field, '<=', maxVal);
    }


    const queryResult = await query.get();
    const cars = queryResult.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return cars;
  } catch (error: any) {
    console.error("Error fetching cars:", error.message);
    throw new Error("Failed to fetch cars");
  }
  
}


//add car service.csc
export async function addCar(car: Car) {
  try {
    const collection = db.collection(COLLECTIONS.carList);
  
      const docRef = await collection.add(car);
      return { id: docRef.id, ...car };
    
  } catch (error: any) {
    console.error("Error adding car:", error.message);
    throw new Error("Failed to add car");
  }
}

//delete car service
export async function deleteCar(id: string) {
  try {
    const docRef = db.collection(COLLECTIONS.carList).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Car not found");
    }

    await docRef.delete();
    return { id, message: "Car deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting car:", error.message);
    throw new Error("Failed to delete car");
  }
}