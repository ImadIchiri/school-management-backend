import admin from "firebase-admin";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Charger les variables d'environnement
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_STORAGE_BUCKET,
} = process.env;

// Vérification des variables Firebase
if (
  !FIREBASE_PROJECT_ID ||
  !FIREBASE_PRIVATE_KEY ||
  !FIREBASE_CLIENT_EMAIL ||
  !FIREBASE_STORAGE_BUCKET
) {
  throw new Error(
    "Certaines variables Firebase ne sont pas définies dans .env"
  );
}

// Construction du service account
const serviceAccount: admin.ServiceAccount = {
  projectId: FIREBASE_PROJECT_ID,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // IMPORTANT
};

// Initialisation Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: FIREBASE_STORAGE_BUCKET,
  });
}

const bucket = admin.storage().bucket();

export const uploadToFirebase = async (
  fileBuffer: Buffer,
  filepath: string
): Promise<string> => {
  const dir = path.dirname(filepath); // "schoolManagement"
  const ext = path.extname(filepath);
  const name = path.basename(filepath, ext);

  // Si dir = ".", alors il n ya pas de folder
  const finalPath =
    dir === "."
      ? `${name}-${uuidv4()}${ext}`
      : `${dir}/${name}-${uuidv4()}${ext}`;

  // const finalPath = `${name}-${uuidv4()}${ext}`;

  const file = bucket.file(finalPath);

  const token = uuidv4();

  await file.save(fileBuffer, {
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });

  return `https://firebasestorage.googleapis.com/v0/b/${
    bucket.name
  }/o/${encodeURIComponent(finalPath)}?alt=media&token=${token}`;
};

// Supprimer un fichier depuis Firebase Storage

export const deleteFromFirebase = async (fileUrl: string): Promise<void> => {
  if (!fileUrl) return;

  try {
    // 1. Décoder l'URL
    const decodedUrl = decodeURIComponent(fileUrl);

    // 2. Extraire le chemin après "/o/" et avant "?alt="
    const pathStart = decodedUrl.indexOf("/o/") + 3;
    const pathEnd = decodedUrl.indexOf("?alt=");

    if (pathStart < 3 || pathEnd === -1) {
      throw new Error("URL Firebase invalide");
    }

    const filePath = decodedUrl.substring(pathStart, pathEnd);

    // 3. Supprimer le fichier
    const file = bucket.file(filePath);
    await file.delete();
  } catch (error) {
    console.error("Erreur suppression Firebase:", error);
    throw new Error("Impossible de supprimer le fichier du Firebase Storage");
  }
};
