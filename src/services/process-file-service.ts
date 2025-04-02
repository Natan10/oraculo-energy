import fs from "fs";
import path from "path";
import pdf from "pdf-parse-debugging-disabled";

export class ProcessFileService {
  constructor(private readonly basePath: string) {}

  readDictories() {
    const getDirectories = fs.readdirSync(this.basePath);
    return getDirectories;
  }

  getFilesFromDirectory(dirPath: string) {
    const filesFromDir = fs.readdirSync(path.join(this.basePath, dirPath));
    return filesFromDir.map((filePath) =>
      path.join(this.basePath, dirPath, filePath)
    );
  }

  getPaths() {
    const dirPaths = this.readDictories();
    const paths = dirPaths.flatMap((dirPath) =>
      this.getFilesFromDirectory(dirPath)
    );
    return paths;
  }

  async readFile(filePath: string) {
    const file = fs.readFileSync(filePath);
    const pdfRaw = await pdf(file);
    return pdfRaw.text.split("\n");
  }
}
