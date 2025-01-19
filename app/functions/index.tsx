import { Field, StateType, Table } from "@/app/types";
import { addTextToFile } from "./updateFile";
import { dataTypes, constraints } from "../data";

export const valueCatcher = (list: any[], value: string) => {
  return list.find((e) => e.value == value).label;
};

export const indexType = (item: Field) => {
  if (item.indexType.length !== 0) {
    return item.indexType.map((e) => valueCatcher(constraints, e)).join(" ");
  } else {
    return "";
  }
};

export const dataType = (item: Field) => {
  return valueCatcher(dataTypes, item.dataType);
};

const corrector = (name: string) => {
  let value = name;

  if (name == "name") return "'name'";
  if (name == "user") return "'user'";

  return value;
};

const fields = (table: Table) =>
  table.fields
    .map((item: Field, index: number) => {
      return `\n  ${corrector(item.name)} ${dataType(item)} ${indexType(item)}${
        index + 1 == table.fields.length ? "" : ","
      }`;
    })
    .join("");

const values = (table: Table) => {
  const data = (item: any) =>
    table.fields
      .filter((e) => e.name !== "id")
      .map((key: Field) => {
        return `'${item[key.name]}'`;
      })
      .join(", ");

  return table.value
    .map((item, index) => {
      return `\n  (${data(item)})${
        index + 1 == table.value.length ? ";" : ","
      }`;
    })
    .join("");
};

const keys = (table: Table) => {
  return table.fields
    .filter((e) => e.name !== "id")
    .map((item, index) => {
      return `${item.name}${index + 1 == table.fields.length ? "," : ""}`;
    })
    .join("");
};

export const writeCode = (data: StateType) => {
  let code = "";

  code += `CREATE DATABASE ${data.database};\n`;

  data.tables.map((table) => {
    code += `\nCREATE TABLE ${table.name} (${fields(table)}\n);\n`;
    code += `\nINSERT INTO ${table.name} (${keys(table)}) VALUES ${values(
      table
    )}\n`;
  });

  addTextToFile(code);
};
