import { Container, Profile } from './styles';

export function Header() {

  return (
    <Container>
      <Profile>

        <img src="http://github.com/GabrielLoures.png" alt="Foto do Usuário"/>

        <div>
          <span>Bem-Vindo,</span>
          <strong>Gabriel Loures</strong>
        </div>

      </Profile>
    </Container>
  )
}