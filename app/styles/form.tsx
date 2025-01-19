import styled from "@emotion/styled";

export const FormStyle = styled.form`
  width: 100%;
  border-radius: 20px;
  display: flex;  
  flex-direction: column;
  gap: 10px;
  .line {
    display: flex;
    flex-direction: column;
    label {
      margin-inline: 10px;
      font-size: 13px;
    }
    .form-field {
      display: flex;
      flex-direction: column;
    }
  }
`;
