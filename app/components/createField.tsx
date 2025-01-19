import React, { FormEvent, useState } from "react";
import { List, Select } from "antd";
import { Field } from "../types";
import { FormStyle } from "../styles/form";
import { AppButton, AppInput, AppSelect } from "../styles/uiElements";
import { Styles } from "../styles/creators";
import { constraints, dataTypes } from "../data";
import { useParams } from "next/navigation";
import { useWebContext } from "../context/web";
import { dataType, indexType } from "../functions";

const { Option } = Select;

const defaultField = {
  name: "",
  dataType: "text",
  indexType: ["none"],
  defaultValue: "",
};

export default function CreateField() {
  const { table } = useParams();
  const [field, setField] = useState<Field>(defaultField);
  const store = useWebContext();

  const handleFieldChange = (name: string, value: any) => {
    setField((prev) => ({ ...prev, [name]: value }));
  };

  const addField = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.dispatch({ type: "ADD_FIELD", payload: { field, table } });
    setField(defaultField);
  };

  return (
    <Styles>
      <div className="forms">
        <FormStyle onSubmit={addField} className="form">
          <h3>Create fields.</h3>
          <div className="line">
            <label htmlFor="fieldName">field name</label>
            <AppInput
              value={field.name}
              id="fieldName"
              onChange={(e) => handleFieldChange("name", e.target.value)}
              required
            />
          </div>
          <div className="line">
            <label htmlFor="dataType">data type</label>
            <AppSelect
              id="dataType"
              value={field.dataType}
              onChange={(value) => handleFieldChange("dataType", value)}
              showSearch
            >
              {dataTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </AppSelect>
          </div>
          <div className="line">
            <label htmlFor="indexType">index type</label>
            <AppSelect
              id="indexType"
              mode="multiple"
              value={field.indexType}
              onChange={(value) => handleFieldChange("indexType", value)}
            >
              {constraints.map((constraint) => (
                <Option key={constraint.value} value={constraint.value}>
                  {constraint.label}
                </Option>
              ))}
            </AppSelect>
          </div>
          <div className="line">
            <label htmlFor="defaultValue">default value</label>
            <AppInput
              id="defaultValue"
              value={field.defaultValue}
              onChange={(e) =>
                handleFieldChange("defaultValue", e.target.value)
              }
            />
          </div>
          <AppButton type="submit">Add Field</AppButton>
        </FormStyle>
      </div>
      <List
        size="small"
        header={<h3>Keys</h3>}
        bordered
        dataSource={
          store.state.tables.find((e) => e.name === table)?.fields || []
        }
        renderItem={(item: Field) => (
          <List.Item className="items">
            <div>
              <strong>Key: </strong> {item.name} <br />
              <strong>Type: </strong> {dataType(item)} <br />
              <strong>Index: </strong> {indexType(item)} <br />
              <strong>Default: </strong>
              {item.defaultValue ? item.defaultValue : "Empty"}
            </div>
          </List.Item>
        )}
        className="list"
      />
    </Styles>
  );
}
