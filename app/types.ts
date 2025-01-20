export interface FormField {
  name: string;
  type: "text" | "email" | "password" | "number";
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
}

export interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  title: string;
}

export type StateType = { database: string; tables: Table[] };

export type ActionType = {
  type: "SET_DATABASE" | "CREATE_TABLE" | "ADD_FIELD" | "ADD_DATA";
  payload?: unknown;
};

export type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export type ItemType = Record<string, any>;

export type Table = {
  name: string;
  fields: Field[];
  value: ItemType[];
};

export type Field = {
  name: string;
  dataType: string;
  indexType: string[];
  defaultValue?: string;
};

export type SelectData = {
  label: string;
  value: string;
};
