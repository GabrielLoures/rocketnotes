import { useState } from "react";

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

import { Container, Form, Avatar } from './styles';

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import { Link } from 'react-router-dom';

import { useAuth } from "../../hooks/auth";

import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"

import { api } from "../../services/api"

export function Profile() {

  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder // linha de código para manter o avatar salvo na página mesmo se carregar; o avatarPlaceHolder é a imagem padrão que vem carregada quando o usuário não possui avatar carregado por ele
  
  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleUpdate() {

    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }

    const userUpdated = Object.assign(user, updated) // o Object.assign pega o Objeto user e junta ao Objeto updated; com isso, o a foto do avatar passa a fazer parte do objeto, portanto não perdemos ela quando atualizamos outros dados (nome e email)

    await updateProfile({ user: userUpdated, avatarFile }); // temos que passar o avatar para nosso back-end

  }

  function handleChangeAvatar(e) {

    const file = e.target.files[0]; // pega o arquivo da primeira posição do array do file carregado pelo usuário

    setAvatarFile(file) // coloca aqui dentro o arquivo que o usuário acabou de carregar

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);

  }

  return(
    <Container>

      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>

        <Avatar>

          <img src={avatar} alt="Foto do Usuário" />
          <label htmlFor="avatar">
            <FiCamera />
            <input 
              id="avatar" 
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>

        </Avatar>

        <Input 
          placeholder="Nome" 
          type="text" 
          icon={FiUser}
          value={name}
          onChange={ e => setName(e.target.value)}
        />
        <Input 
          placeholder="Email" 
          type="text" 
          icon={FiMail}
          value={email}
          onChange={ e => setEmail(e.target.value)}
        />
        <Input 
          placeholder="Senha Atual" 
          type="password" 
          icon={FiLock}
          onChange={ e => setPasswordOld(e.target.value)}
        />
        <Input 
          placeholder="Nova Senha" 
          type="password" 
          icon={FiLock}
          onChange={ e => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate}/>

      </Form>

    </Container>
  )

}