import { useState } from "react";
import { Container, Form, Background } from './styles';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignUp() {
  
  const [name, setName] = useState(""); // entre os [] colocamos qual estado será alterado, seguido pela função que irá fazer atualizar esse estado (manter o padrão setNomeDoEstado); entre os () do useState(), colocamos o estado inicial dessa variável, que no caso é vazio
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    
    if(!name || !email || !password) {
      alert("Preencha todos os campos!")
    }

    api.post("/users", { name, email, password })
    .then(() => {
      alert("Usuário cadastrado com sucesso!")
      navigate("/"); // usamos o navigate para levar o usuário diretamente para a página de login logo após um cadastro feito com sucesso
    })
    .catch(error => {
      if(error.response) {
        alert(error.response.data.message) // pega a mensagem do próprio back-end, lá do arquivo UsersController (AppError)
      } else {
        alert("Não foi possível cadastrar!")
      }
    })

  }

  return (

    <Container>
      
      <Background></Background>

      <Form>

        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis</p>

        <h2>Crie sua Conta</h2>

        <Input 
          placeholder="Nome" 
          type="text" 
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        />

        <Input 
          placeholder="E-mail" 
          type="text" 
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          placeholder="Senha" 
          type="password" 
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={ handleSignUp } />

        <Link to="/">
          Voltar para o Login
        </Link>
                
      </Form>

    </Container>

  );

}