import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// Chemin vers le fichier JSON à la racine
// const serviceAccountPath = path.join(
//   __dirname,
//   "..",
//   "..",
//   "firebase-service-account.json"
// );
// const serviceAccount = require(serviceAccountPath);

// Initialisation Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    } as any),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  } as any);
}

const bucket = admin.storage().bucket();

/**
 * Upload depuis un buffer vers Firebase Storage
 */
export const uploadToFirebase = async (
  fileBuffer: Buffer,
  filename: string
): Promise<string> => {
  const uuid = uuidv4();
  const file = bucket.file(filename);

  await file.save(fileBuffer, {
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
  });

  return `https://firebasestorage.googleapis.com/v0/b/${
    bucket.name
  }/o/${encodeURIComponent(filename)}?alt=media&token=${uuid}`;
};
