import { Container } from './styles';

export function ButtonText({ title, isActived = false, ...rest }) {

  return (

    <Container type="button" 
    {...rest} 
    isActived={isActived}>
      {title}
    </Container>

  );

}