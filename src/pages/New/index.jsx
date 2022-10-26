import { useState } from "react"

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';

import { Link } from 'react-router-dom';

import { Container, Form } from './styles';

export function New() {

  const [links, setLinks] = useState([]) // vetor que guarda todos os links
  const [newLink, setNewLink] = useState("") // link que vai ser adicionado no momento

  function handleAddLink() {

    setLinks(prevState => [...prevState, newLink]) // pega o array anterior (prevState) e adiciona o newLink a um novo array que tem tudo que tinha no array anterior (...prevState)
    setNewLink("")

  }

  function handleRemoveLink(deleted) {

    setLinks(prevState => prevState.filter(link => link !== deleted)) // lógica: pega o array com os links (prevState) e retorna o array filtrado com o todos os links menos o que foi deletado

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

          <Input placeholder="Título" />

          <Textarea placeholder="Observações"/>

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
              <NoteItem value="react" />
              <NoteItem isNew placeholder="Nova Tag"/>
            </div>
          </Section>

          <Button title="Salvar" />

        </Form>
      </main>

    </Container>

  );

}