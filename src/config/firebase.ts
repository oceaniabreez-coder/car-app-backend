import admin from "firebase-admin";
//var serviceAccount = require("./firestore-key.json");

if (!admin.apps.length) {
  admin.initializeApp({
    //credential: admin.credential.cert(serviceAccount),
    credential: admin.credential.applicationDefault()
  });
}

export const db = admin.firestore();