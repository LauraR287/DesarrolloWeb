import path, {join} from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(join (_filename, "../"));
console.log(_dirname, _filename)
export {_dirname};