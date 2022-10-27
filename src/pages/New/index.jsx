import { useState } from "react"

import { api } from "../../services/api";

import { useNavigate } from "react-router-dom";

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';

import { Link } from 'react-router-dom';

import { Container, Form } from './styles';

export function New() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]) // vetor que guarda todos os links
  const [newLink, setNewLink] = useState("") // link que vai ser adicionado no momento

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate();

  function handleAddLink() {

    setLinks(prevState => [...prevState, newLink]) // pega o array anterior (prevState) e adiciona o newLink a um novo array que tem tudo que tinha no array anterior (...prevState)
    setNewLink("")

  }

  function handleRemoveLink(linkDeleted) {

    setLinks(prevState => prevState.filter(link => link !== linkDeleted)) // lógica: pega o array com os links (prevState) e retorna o array filtrado com o todos os links menos o que foi deletado

  }

  function handleAddTag() {

    setTags(prevState => [...prevState, newTag]);
    setNewTag("") // limpa o campo de digitação sempre que clicamos no adicionar

  }

  function handleRemoveTag(tagDeleted) {

    setTags(prevState => prevState.filter(tag => tag !== tagDeleted))

  }

  async function handleNewNote() {

    if(!title) {
      return alert("Digite o título da nota");
    }
    
    if(newLink) {
      return alert("Você deixou um link no campo para adicionar, mas não concluiu. Clique para adicionar ou deixe o campo vazio.")
    }

    if(newTag) {
      return alert("Você deixou uma tag no campo para adicionar, mas não concluiu. Clique para adicionar ou deixe o campo vazio.")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota enviada com sucesso!");
    
    navigate(-1); // volta à página inical depois que clicamos no alerta

  }

  return(

    <Container>

      <Header />

      <main>
        <Form>

          <header>
            <h1>Criar Nota</h1>
            <Link to="/">Voltar</Link>
          </header>

          <Input 
            placeholder="Título"
            onChange={ e => setTitle(e.target.value)} 
          />

          <Textarea 
            placeholder="Observações"
            onChange={ e => setDescription(e.target.value)} 
          />

          <Section title="Links Úteis">

            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)} // qunado temos parâmetros passando pela função chamada, devemos colocar como arrow function
                />
              ))
            }

            <NoteItem 
              isNew 
              placeholder="Novo Link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section>
            <div className="tags">

              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => {handleRemoveTag(tag)}}               
                  />
                ))
              }

              <NoteItem 
                isNew 
                placeholder="Nova Tag"
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />

            </div>
          </Section>

          <Button 
            title="Salvar"
            onClick={handleNewNote}
          />

        </Form>
      </main>

    </Container>

  );

}