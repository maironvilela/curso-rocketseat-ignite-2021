import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class FileUploadCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  private async loadingCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse({ delimiter: "," });

      // pipe utilizado para enviar as partes do arquivo que foi realizado a leitura
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  private async saveCategoryList(categories: IImportCategory[]): Promise<void> {
    categories.map(async (category) => {
      const { name, description } = category;

      const isCategoryExists = await this.categoriesRepository.findByName(name);

      if (!isCategoryExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadingCategories(file);
    await this.saveCategoryList(categories);

    await this.categoriesRepository.findAll();
    fs.promises.unlink(file.path);
  }
}

export default FileUploadCategoryUseCase;
