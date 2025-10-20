import { db } from "../config/firebase";
import { Car, CarFilter } from "./car.model";
import {COLLECTIONS} from "../config/collection"



export async function getCars(filter: CarFilter = {}, limit:number) {

    try {
    let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.carList).limit(Math.min(limit, 200));

    // only apply filters that have values
    for (const [key, value] of Object.entries(filter)) {
      if (value && value.trim() !== "") {
        query = query.where(key, "==", value);
      }
    }
    console.log(query)
    const queryResult = await query.get();
    const cars = queryResult.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return cars;
  } catch (error: any) {
    console.error("Error fetching cars:", error.message);
    throw new Error("Failed to fetch cars");
  }
}