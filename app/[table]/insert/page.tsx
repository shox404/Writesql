"use client";

import React, { FormEvent, useState } from "react";
import { Style } from "@/app/styles/database";
import { List } from "antd";
import { Field, Table } from "@/app/types";
import { FormStyle } from "@/app/styles/form";
import { AppButton, AppInput } from "@/app/styles/uiElements";
import { Styles } from "@/app/styles/creators";
import { useParams } from "next/navigation";
import { useWebContext } from "@/app/context/web";
import { generateData } from "@/app/data/generator";

export default function InsertData() {
  const { table } = useParams();
  const [field, setField] = useState<any>({});
  const [generator, setGenerator] = useState({ length: 0 });
  const store = useWebContext();
  const tableData = store.state.tables.find((e) => e.name === table);

  const handleFieldChange = (name: string, value: any) => {
    setField((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleGeneratorChange = (name: string, value: any) => {
    setGenerator((prev: any) => ({ ...prev, [name]: value }));
  };

  const addData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.dispatch({ type: "ADD_DATA", payload: { field, table } });
    setField({});
  };

  const submitGenerateData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tableData = store.state.tables.find((e: Table) => e.name == table);
    generateData(generator.length, tableData).map((field) => {
      store.dispatch({ type: "ADD_DATA", payload: { field:field?.[0], table } });
    });
    setGenerator({ length: 0 });
  };

  const keys = store.state.tables
    .find((e) => e.name == table)
    ?.fields.filter((e) => e.name !== "id");

  return (
    <Style>
      <h3 className="title">{table}</h3>
      <Styles>
        <div className="forms">
          <FormStyle onSubmit={addData} className="form">
            <h3>Create data.</h3>
            {keys?.map((item: Field, index: number) => (
              <div className="line" key={index}>
                <label htmlFor={item.name + index}>{item.name}</label>
                <AppInput
                  id={item.name + index}
                  value={field[item.name] || ""}
                  onChange={(e) => handleFieldChange(item.name, e.target.value)}
                  required
                />
              </div>
            ))}
            <AppButton type="submit">Add Field</AppButton>
          </FormStyle>
          <FormStyle onSubmit={submitGenerateData} className="form">
            <h3>Generate data.</h3>
            <div className="line">
              <label htmlFor="length">Length</label>
              <AppInput
                id="length"
                type="number"
                value={generator.length}
                onChange={(e) =>
                  handleGeneratorChange("length", e.target.value)
                }
                required
              />
            </div>
            <AppButton type="submit">Submit</AppButton>
          </FormStyle>
        </div>
        <List
          size="small"
          header={<h3>Data</h3>}
          bordered
          dataSource={[tableData]}
          renderItem={(array: any) =>
            array.value.map((item: Record<string, any>, index: number) => (
              <List.Item className="items" key={index}>
                {array.fields
                  .filter((e: Field) => e.name !== "id")
                  .map(({ name }: any, index: number) => (
                    <div key={index}>
                      <strong>{name}</strong>: {item[name]}
                    </div>
                  ))}
              </List.Item>
            ))
          }
          className="list"
        />
      </Styles>
    </Style>
  );
}
