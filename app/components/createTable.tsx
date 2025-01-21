"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Styles } from "@/app/styles/creators";
import { AppButton, AppInput } from "../styles/uiElements";
import { FormStyle } from "../styles/form";
import { List } from "antd";
import { useWebContext } from "../context/web";
import { useRouter } from "next/navigation";
import { Table } from "../types";

export default function CreateTable() {
  const [tableName, setTableName] = useState<string>("");
  const store = useWebContext();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTableName("");
    const tableExists = store.state.tables.some(
      (table) => table.name === tableName
    );
    if (tableExists) return;
    const payload = tableName;
    store.dispatch({ type: "CREATE_TABLE", payload });
  };

  const setDatabase = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    store.dispatch({ type: "SET_DATABASE", payload: e.target.value });
  };

  const direct = (name: string) => {
    if (store.state.database !== "") router.push(`/${name}`);
  };

  const insert = (name: string) => {
    if (store.state.database !== "") router.push(`/${name}/insert`);
  };

  return (
    <Styles>
      <div className="forms">
        <FormStyle className="form">
          <h3>Database.</h3>
          <div className="line">
            <label htmlFor="databaseName">database name</label>
            <AppInput
              name="databaseName"
              id="databaseName"
              value={store.state.database}
              onChange={setDatabase}
              required
            />
          </div>
        </FormStyle>
        <FormStyle onSubmit={handleSubmit} className="form">
          <h3>Create table.</h3>
          <div className="line">
            <label htmlFor="tableName">table name</label>
            <AppInput
              name="tableName"
              id="tableName"
              value={tableName}
              onChange={handleChange}
              required
            />
          </div>
          <AppButton type="submit">Submit</AppButton>
        </FormStyle>
      </div>
      <List
        size="small"
        header={<h3>Tables.</h3>}
        bordered
        dataSource={store.state.tables}
        renderItem={(item: Table) => (
          <List.Item className="items">
            {item.name}
            <div>
              <AppButton onClick={() => insert(item.name)}>INSERT</AppButton>
              <AppButton onClick={() => direct(item.name)}>SCHEME</AppButton>
            </div>
          </List.Item>
        )}
        className="list"
      />
    </Styles>
  );
}
