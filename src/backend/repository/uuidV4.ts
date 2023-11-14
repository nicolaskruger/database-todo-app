import { IIdGeneratorRepository } from "./IIdGenerator";
import { v4 as uuidv4, v4 } from "uuid";

class UUIDV4 implements IIdGeneratorRepository {
  generateId() {
    return v4();
  }
}

export {
    UUIDV4
}