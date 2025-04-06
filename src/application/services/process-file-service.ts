import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse-debugging-disabled";
import { s3Client } from "../../lib/aws.js";

export class ProcessFileService {
  constructor(private readonly basePath: string) {}

  async getFileFromS3({ bucket, key }: { bucket: string; key: string }) {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    const pdfRaw = await pdf(buffer);
    return pdfRaw.text.split("\n");
  }

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
