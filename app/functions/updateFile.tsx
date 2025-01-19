import axios from "axios";

export const addTextToFile = async (text: string) => {
  await axios.post("/api/update", { text });
};
