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
  payload?: any;
};

export type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export type Table = {
  name: string;
  fields: Field[];
  value: any[];
};

export type Field = {
  name: string;
  dataType: string;
  indexType: string[];
  defaultValue?: string;
};
