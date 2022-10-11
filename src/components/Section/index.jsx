import { Container } from './styles';

export function Section ({ title, children }) {

  return (
    <Container>

      <h2>{title}</h2>
      {children} 

    </Container>
  ) // passamos uma variável "children" que vai representar o conteúdo de uma seção; temos duas seções que se seus titles são estilos iguais mas o conteúdo não (links e tags) => o children é uma propriedade que não vem como propriedade direta de uma Tag React igual o title, ele pega todo o conteúdo dentro da Tag React (olhar no arquivo index.jsx do Details)

}