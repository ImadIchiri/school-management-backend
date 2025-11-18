import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Chemin vers le fichier JSON à la racine
const serviceAccountPath = path.join(__dirname, "../../firebase-service-account.json");
const serviceAccount = require(serviceAccountPath);

// Initialisation Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "exam9-1.appspot.com", // ton bucket Firebase
  });
}

const bucket = admin.storage().bucket();

/**
 * Upload depuis un buffer vers Firebase Storage
 */
export const uploadToFirebase = async (fileBuffer: Buffer, filename: string): Promise<string> => {
  const uuid = uuidv4();
  const file = bucket.file(filename);

  await file.save(fileBuffer, {
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
  });

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
    filename
  )}?alt=media&token=${uuid}`;
};
