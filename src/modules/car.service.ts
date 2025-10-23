import { db } from "../config/firebase";
import { Car, CarFilter,CAR_RANGES, EQ_KEYS, UpdateCar } from "./car.model";
import {COLLECTIONS} from "../config/collection"


//search car service
export async function getCars(filter: CarFilter = {}, limit:number) {
    try {
    let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.carList).limit(Math.min(limit, 200));

    for (const k of EQ_KEYS) {
      const v = filter[k as string];
      if (v === undefined || v === null ||v ===  "" || v === '') continue;
      if (typeof v === 'string') {
        console.log(k,v)
        const t = v.trim();
        if (t === '') continue;
        query = query.where(k as string, '==', t);
      } else {
        console.log(k,v)
        query = query.where(k, '==', v);
      }
    }

     for (const r of CAR_RANGES) {
      const minVal = filter[r.min];
      const maxVal = filter[r.max];
      if((minVal === undefined || minVal === null ||minVal === "" ||minVal==='' ) && (maxVal === undefined || maxVal === null||maxVal===""||maxVal==='')) continue;
      console.log(r.min,minVal);
      console.log(r.max,maxVal);
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


//add car service
export async function addCar(car: Car) {
  try {
    console.log(car)
    const collection = db.collection(COLLECTIONS.carList);
  
      const docRef = await collection.add(car);
      console.log(docRef)
      return { ...car };
    
  } catch (error: any) {
    console.error("Error adding car:", error.message);
    throw new Error("Failed to add car");
  }
}

//update car service
export async function updateCar(car:Car) {

  if (!car || !car.id) {
    throw new Error("Missing car id for update");
  }
   const { id, ...data } = car;
  try {
    const docRef = db.collection(COLLECTIONS.carList).doc(id);

    const snap = await docRef.get();
    if (!snap.exists) {
      throw new Error("Car not found");
    }
    await docRef.update(data);

    const updated = await docRef.get();
    return {...updated.data() };

    
  } catch (error: any) {
    console.error("Error updating car:", error.message);
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