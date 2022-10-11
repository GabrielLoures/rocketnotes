import styled from 'styled-components';

export const Container = styled.div`

  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto; // primaira linha (row), que é o header, terá 105px de altura fixa e a outra linha, que é o corpo da página, terá altura automática
  grid-template-areas:
    "header"
    "content"
  
`;