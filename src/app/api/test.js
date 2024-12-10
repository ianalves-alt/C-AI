import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "a.json");
const filecontents = await fs.readFile(dataFilePath, "utf-8");

let data = JSON.parse(filecontents);
console.log(data);
