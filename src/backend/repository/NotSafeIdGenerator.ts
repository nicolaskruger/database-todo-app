import { IIdGeneratorRepository } from "./IIdGenerator";

class NotSafeIdGenerator implements IIdGeneratorRepository {
  generateId() {
    return `${Math.random()}`;
  }
}

export { NotSafeIdGenerator };
