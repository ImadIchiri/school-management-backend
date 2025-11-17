import { Request, Response } from "express";
import { firestore } from "../../config/firebaseStorage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createRessource = async (req: Request, res: Response) => {
  try {
    const ressourceFile = req.file as any;

    if (ressourceFile === undefined) {
      return res.status(400).json({
        success: false,
        message: "No File Found!",
      });
    }

    const filename = new Date().getTime() + "-" + ressourceFile.originalname;
    const fileRef = ref(firestore, "rssource/" + filename);
    const snapshot = await uploadBytes(fileRef, ressourceFile.buffer);
    const fileURL = await getDownloadURL(snapshot.ref);

    // res.status(200).send(fileRef);
    return res.status(200).json({});
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error while Creating Ressource",
      error: error,
    });
  }
};
