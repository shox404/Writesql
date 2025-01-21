"use client";

import { createContext, ReactNode, useReducer, useContext } from "react";
import { ActionType, ContextType, StateType, Table } from "../types";

const initialState: StateType = { database: "", tables: [] };

const WebContext = createContext<ContextType | undefined>(undefined);

function reducer(state: StateType, action: ActionType): StateType {
  const { type, payload } = action;
  switch (type) {
    case "SET_DATABASE":
      return { ...state, database: payload };
    case "CREATE_TABLE":
      const tables: Table[] = [
        ...state.tables,
        { name: payload, fields: [], value: [] },
      ];
      return { ...state, tables };
    case "ADD_FIELD":
      const data = state.tables.map((item) => {
        if (item.name === payload.table) {
          if (item.fields.find((e) => e.name == payload.field.name))
            return {
              ...item,
              fields: item.fields.map((field) =>
                field.name === payload.field.name ? payload.field : field
              ),
            };
          return { ...item, fields: [...item.fields, payload.field] };
        }
        return item;
      });
      return { ...state, tables: data };
    case "ADD_DATA":
      const newTables = state.tables.map((table: Table) => {
        if (table.name === payload.table) {
          return {
            ...table,
            value: [...table.value, payload.field],
          };
        }
        return table;
      });
      return { ...state, tables: newTables };
    default:
      return state;
  }
}

export default function WebProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WebContext.Provider value={{ state, dispatch }}>
      {children}
    </WebContext.Provider>
  );
}

export function useWebContext() {
  const context = useContext(WebContext);
  if (context === undefined) {
    throw new Error("useWebContext must be used within a WebProvider");
  }
  return context;
}
