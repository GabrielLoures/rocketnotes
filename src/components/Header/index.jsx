import { Container, Profile, Logout } from './styles';

import { useAuth } from "../../hooks/auth"

import { RiShutDownLine } from 'react-icons/ri';

export function Header() {

  const { signOut } = useAuth();

  return (
    <Container>

      <Profile to="/profile">

        <img src="http://github.com/GabrielLoures.png" alt="Foto do Usuário"/>

        <div>
          <span>Bem-Vindo,</span>
          <strong>Gabriel Loures</strong>
        </div>

      </Profile>

      <Logout onClick={signOut}>

        <RiShutDownLine />

      </Logout>

    </Container>
  )
}