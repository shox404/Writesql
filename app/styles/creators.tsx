import styled from "@emotion/styled";

export const Styles = styled.div`
  display: flex;
  gap: 20px;
  align-items: start;
  input,
  button {
    height: 35px;
    padding-inline: 10px;
  }
  .forms {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 20px;
    .form {
      padding: 20px;
      width: 100%;
      background-color: #ffffff91;
    }
  }
  .list {
    width: calc(100% - 300px);
    background-color: #ffffff91;
    padding: 20px;
    gap: 20px;
    border-radius: 20px;
    .items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      p {
        background-color: #ffeeac;
        border-radius: 20px;
        padding-inline: 5px;
      }
      div {
        display: flex;
        gap: 5px;
      }
    }
  }
`;
