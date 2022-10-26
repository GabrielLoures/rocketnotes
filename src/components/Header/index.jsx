import { Container, Profile, Logout } from './styles';

import { useAuth } from "../../hooks/auth"

import { RiShutDownLine } from 'react-icons/ri';

import { api } from "../../services/api"

export function Header() {

  const { signOut, user } = useAuth();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder

  return (
    <Container>

      <Profile to="/profile">

        <img src={avatarUrl} alt="Foto do Usuário"/>

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