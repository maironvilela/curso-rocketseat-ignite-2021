import crypto from "crypto";
import multer from "multer";
import path from "path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: path.resolve(tmpFolder, folder),
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString("hex");
          const filename = `${fileHash}-${file.originalname}`;
          return callback(null, filename);
        },
      }),
    };
  },
};
