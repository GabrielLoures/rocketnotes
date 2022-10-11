import { Container } from './styles';

export function Input({ icon: Icon, ...rest }) {

  return (

    <Container>

      {Icon && <Icon size={20} />}
      <input {...rest} />

    </Container>

  )

} // a linha {Icon && <Icon />} significa que, se tiver um ícone nas propriedades do código ele coloca, senão não coloca