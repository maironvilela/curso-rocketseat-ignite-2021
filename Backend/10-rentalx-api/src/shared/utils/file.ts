import fs from "fs";

import AppError from "../error/AppError";

const deleteFile = async (filename: string): Promise<void> => {
  try {
    // verificar se o arquivo existe. Retorna erro caso nao exista
    await fs.promises.stat(filename);
    // remove o arquivo
    await fs.promises.unlink(filename);
  } catch (err) {
    throw new AppError("File does not exist");
  }
};

export { deleteFile };
