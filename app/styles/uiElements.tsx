import styled from "@emotion/styled";
import { Select } from "antd";

export const AppButton = styled.button`
  height: 35px;
  padding-inline: 20px;
  background-color: #000000;
  color: #ffffff;
  outline: none;
  border: 1px solid #8f8f8f29;
  border-radius: 17.5px;
`;

export const AppInput = styled.input`
  height: 35px;
  padding-inline: 12px;
  min-width: 150px;
  background-color: #ffffff;
  outline: none;
  border: 1px solid #8f8f8f29;
  border-radius: 17.5px;
`;

export const AppSelect = styled(Select)`
  .ant-select-selector {
    min-width: 150px;
    background-color: #ffffff;
    outline: none;
    border: 1px solid #8f8f8f29;
    border-radius: 17.5px;
  }
  .ant-select-selection-overflow {
    margin: 2px;
    .ant-select-selection-item {
      border-radius: 12px;
    }
  }
`;
