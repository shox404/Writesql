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
  const { table } = useParams<{ table: string }>();
  const [field, setField] = useState<Record<string, string | number>>({});
  const [generator, setGenerator] = useState<{ length: number }>({ length: 0 });
  const store = useWebContext();
  const tableData = store.state.tables.find((e) => e.name === table);

  const handleFieldChange = (name: string, value: string | number) => {
    setField((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneratorChange = (name: string, value: string | number) => {
    setGenerator((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const addData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.dispatch({ type: "ADD_DATA", payload: { field, table } });
    setField({});
  };

  const submitGenerateData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tableData = store.state.tables.find((e: Table) => e.name === table);
    if (tableData) {
      generateData(generator.length, tableData).forEach((generatedField) => {
        store.dispatch({
          type: "ADD_DATA",
          payload: { field: generatedField?.[0], table },
        });
      });
    }
    setGenerator({ length: 0 });
  };

  const keys = tableData?.fields.filter((e) => e.name !== "id");

  return (
    <Style>
      <h3 className="title">{table}</h3>
      <Styles>
        <div className="forms">
          <FormStyle onSubmit={addData} className="form">
            <h3>Create data.</h3>
            {keys?.map((item, index) => (
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
          renderItem={(array) =>
            array?.value.map((item: Record<string, any>, index: number) => (
              <List.Item className="items" key={index}>
                {array.fields
                  .filter((e: Field) => e.name !== "id")
                  .map(({ name }, index) => (
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
