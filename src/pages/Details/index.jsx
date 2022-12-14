import { useState, useEffect } from 'react';

import { Container, Links, Content } from './styles';

import { useParams, useNavigate } from "react-router-dom"; // useParams serve para buscar pelos parâmetros existentes nas rotas

import { api } from '../../services/api'

import { Header } from '../../components/Header';

import { Button } from '../../components/Button';

import { Section } from '../../components/Section';

import { Tag } from '../../components/Tag';

import { ButtonText } from '../../components/ButtonText';

export function Details() {

  const [data, setData] = useState(null);

  const params = useParams();

  const navigate = useNavigate();

  function handleBack() {

    navigate(-1) // o (-1) volta para a página anterior, diferentemente de passarmos a rota entre os (), que empilha rotas

  }

  async function handleRemove() {

    const confirm = window.confirm("Deseja realmente remover a nota?")

    if(confirm) {

      await api.delete(`/notes/${params.id}`)

      handleBack();

    }

  }

  useEffect (() => {

    async function fetchNote() {

      const res = await api.get(`/notes/${params.id}`)

      setData(res.data)

    }

    fetchNote();

  }, [])

  return (
    <Container>
      
      <Header />

      {
        data && // só mostraremos o <main> se existir o data 
        <main>

          <Content>

            <ButtonText 
              title="Excluir Nota"
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            {
              data.links && // só exibe a seção se existir(em) link(s)
              <Section title="Links Úteis">
                <Links>
                {
                  data.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li> 
                  ))
                  
                }
                    
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag =>(
                    <Tag 
                      key={String(tag.id)}
                      title={tag.name}
                    />
                  ))
                }  
              </Section>
            }
            
            <Button 
              title="Voltar"
              onClick={handleBack}
            />
        
          </Content>
          
        </main>
      }

    </Container>
  )

}
