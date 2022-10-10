import { Container } from "./styles";

export function Button({ title, loading = false, ...rest }) { // temos que passar o props para a o componente para poder utilizá-lo dentro dele; o '...rest' pega todas as propriedades do tipo que escolhemos (nesse caso o button), que não foram explicitadas antes (como o loading e o title) para podermos usar depois

  return (
    <Container 
    type="button"
    disabled={loading}
    {...rest}
    >
      {loading ? "Carregando..." : title} 
    </Container>
  ); // acessamoso texto contido na propriedade "title" definida no componente Button lá no index.jsx do Details através da estrutura {props.propriedade}, que nesse caso é o title
     // poderíamos também desestruturar o props e passar só a propriedade que iremos usar, assim como fizemos acima


}