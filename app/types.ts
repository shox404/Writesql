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

export type ActionType =
  | { type: "SET_DATABASE"; payload: string }
  | { type: "CREATE_TABLE"; payload: string }
  | { type: "ADD_FIELD"; payload: { field: Field; table: string } }
  | { type: "ADD_DATA"; payload: { field: Record<string, string | number>|; table: string } }

export type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export type ItemType = Record<string, string | number>;

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
