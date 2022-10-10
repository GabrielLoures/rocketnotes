import styled from 'styled-components';

export const Container = styled.button`

  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

  height: 56px;
  border: 0;
  padding: 0 16px;
  margin-top: 16px;
  border-radius: 10px;
  font-weight: 500;

  &:disabled { // o & se refere à tag HTML referida junto ao styled acima (nesse caso, o button)

    opacity: 0.5;

  }

`