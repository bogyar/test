import { v4 as UUID } from "uuid";
export const createUUID = () => {
  return UUID() as any;
};