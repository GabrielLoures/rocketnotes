import styled from 'styled-components';

export const Container = styled.button`

  background: none;
  color: ${({theme, isActived}) => isActived ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100}; /* condição ternária para que o botão fique laranja quando estiver ativado, senão ele fica cinza */

  border: none;
  font-size: 16px;

`