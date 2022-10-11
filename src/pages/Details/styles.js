import styled from 'styled-components';

export const Container = styled.div`

  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto; // primaira linha (row), que é o header, terá 105px de altura fixa e a outra linha, que é o corpo da página, terá altura automática
  grid-template-areas:
    "header"
    "content";

  > main {
    grid-area: content;
    overflow-y: scroll; // quando o conteúdo não couber mais na vertical, apareça uma barra pra scroll
    padding: 64px 0;
  }
  
`;

export const Links = styled.ul`

  list-style: none;

  > li {
    margin-top: 12px;

    a {
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }

`;

export const Content = styled.div`

  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;
    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify; // deixa o texto alinhado com as bordas da box certinhos
  }

`;