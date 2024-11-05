import { beforeEach } from "@jest/globals";
import { clearDatabase } from "./clearDatabase";

beforeEach(async () => {
  await clearDatabase();
});