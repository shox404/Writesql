"use client";

import { useParams } from "next/navigation";
import { Style } from "../styles/database";
import CreateField from "../components/createField";

export default function Table() {
  const { table } = useParams();

  return (
    <Style>
      <h3 className="title">{table}</h3>
      <CreateField />
    </Style>
  );
}