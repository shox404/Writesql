"use client";

import { useWebContext } from "../context/web";
import { writeCode } from "../functions";
import { NavigationStyle } from "../styles/navigationStyle";
import { AppButton } from "../styles/uiElements";

export default function Navigation() {
  const store = useWebContext();

  const submit = () => {
    writeCode(store.state);
  };

  return <NavigationStyle>
    <AppButton onClick={submit}>Copy Code</AppButton>
    <AppButton onClick={submit}>Download</AppButton>
  </NavigationStyle>;
}
