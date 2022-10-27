import { FiPlus, FiSearch } from 'react-icons/fi';

import { useState, useEffect } from 'react';

import { api } from "../../services/api";

import { useNavigate } from 'react-router-dom';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';

import { ButtonText } from '../../components/ButtonText';

import { Input } from '../../components/Input';

import { Section } from '../../components/Section';

import { Note } from '../../components/Note';



export function Home() {

  const [tags,setTags] = useState([])
  const [notes,setNotes] = useState([])
  const [tagsSelected,setTagsSelected] = useState([])
  const [search,setSearch] = useState("")

  const navigate = useNavigate();

  function handleTagSelected(tagName) {

    if(tagName === "all") {
      return setTagsSelected([]) // quando clicamos em Todos ("all"), ele atribui ao array setTagsSelected um array vazio e desmarca todas na page
    }

    const alreadySelected = tagsSelected.includes(tagName) // o includes pega o parâmetro entre () e verifica se ele existe dentro do array tagsSelected (retorna true ou false)

    if(alreadySelected) {

      const filteredTags = tagsSelected.filter(tag => tag !== tagName) // array que pega a tag clicada (tagName) e retira ela do array tagsSelected (filtra retirando ela)

      setTagsSelected(filteredTags)

    } else {
      setTagsSelected(prevState => [...prevState, tagName])
    }

  }

  function handleDetails(id) { // função para quando clicarmos na nota, ir para a página dela

    navigate(`/details/${id}`); 

  }

  useEffect(() => {

    async function fetchTags() { // como só iremos utilizar a função assíncrona dentro do useEffect (carrega quando é renderizado), colocamos ela dentro do useEffect
      
      const response = await api.get("/tags"); // pega o conteúdo do banco de dados localizado no '/tags'

      setTags(response.data) // joga dentro a constante tags os valores consumidos da api

    }

    fetchTags()

  }, []) // quando não temos nenhuma variável dentro do array no final do useEffect, ele só vai aplicar a lógica dentro dele quando a página é carregada

  useEffect(() => {

    async function fetchNotes(){

      const res = await api.get(`/notes?title=${search}&tags=${tagsSelected}`); // buscamos dentro do "/notes" a nota aplicada no input do search junto às tags selecionadas

      setNotes(res.data)
    }

    fetchNotes();

  }, [tagsSelected, search]) // quando mudar o conteúdo do tagsSelected ou quando mudar do search, o React vai renderizar novamente a página aplicando a lógica contida dentro do useEffect()

  return (

    <Container>

      <Brand>

        <h1>RocketNotes</h1>

      </Brand>

      <Header />

      <Menu>

       <li>
        <ButtonText 
          title="Todos" 
          onClick={() => handleTagSelected("all")}
          isActived={tagsSelected.length === 0} // ativa a classe "isActived" quando o array tagsSelected está vazio
        />
       </li>

       {
        tags && tags.map(tag => ( // significa "verifique se existe conteúdo em tags, então faça um map"
          <li key={String(tag.id)}>
            <ButtonText 
              title={tag.name}
              onClick={() => handleTagSelected(tag.name)}
              isActived={tagsSelected.includes(tag.name)}
            />
          </li>
        ))  
       } 
        
      </Menu>

      <Search>

        <Input 
          placeholder="Pesquisar pelo título" 
          icon={FiSearch}
          onChange={e => setSearch(e.target.value)}
        />

      </Search>

      <Content>

        <Section title="Minhas Notas">

          {
            notes.map(note => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))                       
          }

        </Section>

      </Content>


      <NewNote to="/new">

        <FiPlus/>
        Criar Nota

      </NewNote>

    </Container>

  )

}