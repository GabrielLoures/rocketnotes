import { FiPlus, FiSearch } from 'react-icons/fi';

import { useState, useEffect } from 'react';

import { api } from "../../services/api";

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';

import { ButtonText } from '../../components/ButtonText';

import { Input } from '../../components/Input';

import { Section } from '../../components/Section';

import { Note } from '../../components/Note';



export function Home() {

  const [tags,setTags] = useState([])

  useEffect(() => {

    async function fetchTags() { // como só iremos utilizar a função assíncrona dentro do useEffect (carrega quando é renderizado), colocamos ela dentro do useEffect
      
      const response = await api.get("/tags"); // pega o conteúdo do banco de dados localizado no '/tags'

      setTags(response.data) // joga dentro a constante tags os valores consumidos da api

    }

    fetchTags()

  }, [])

  return (

    <Container>

      <Brand>

        <h1>RocketNotes</h1>

      </Brand>

      <Header />

      <Menu>

       <li>
        <ButtonText title="Todos" isActived />
       </li>

       {
        tags && tags.map(tag => ( // significa "verifique se existe conteúdo em tags, então faça um map"
          <li key={String(tag.id)}>
            <ButtonText title={tag.name} />
          </li>
        ))  
       } 
        
      </Menu>

      <Search>

        <Input placeholder="Pesquisar pelo título" icon={FiSearch}/>

      </Search>

      <Content>

        <Section title="Minhas Notas">

          <Note data={{
            title: "React", 
            tags: [
              { id: '1', name: 'react'},
              { id: '2', name: 'rocketseat'}
            ] 
          }}/>

        </Section>

      </Content>


      <NewNote to="/new">

        <FiPlus/>
        Criar Nota

      </NewNote>

    </Container>

  )

}