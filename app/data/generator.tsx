import { Field, Table } from "../types";
import { randomName } from "./functions";

export const generateData = (length: number, table: Table | undefined) => {
  let list = [];
  for (let i = 0; i < length; i++) {
    const data = table?.fields
      .filter((e) => e.name !== "id")
      .map((field: Field) => ({
        [field.name]: randomName(),
      }));
    console.log(data);

    list.push(data);
  }
  console.log(list);

  return list;
};
