import { createContext, useContext, useState, useEffect } from 'react';

import { api } from "../services/api"

const AuthContext = createContext({});

function AuthProvider({ children }) { // o children recebe o primeiro(s) filho(s) da função (no caso, as rotas <Routes /> no main.jsx)

  const [data, setData] = useState({})

  async function signIn({ email, password }) {

    try {

      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data; // pegamos o user e o token do usuário lá do back-end (são os valores que importam para nós nesse momento)

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)) // temos que utilizar o localStorage do navegador para que, quando o usuário der reload na página após estar logado, ele não volte para a página de login. Isso acontece porque o State volta para o padrão (que no caso é vazio) quando a página é recarregada.  No primeiro parâmetro nós colocamos a key que quisermos entre "". No segundo parâmetro nós colocamos o value, que foi definido como um JSON.stringify, que nós usamos para converter o nosso objeto "user" em texto para ser salvo no localStorage.

      localStorage.setItem("@rocketnotes:token", token) // como o token já é um texto, não foi preciso convertê-lo

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // estamos inserindo um texto Bearer de autorização, por padrão, no cabeçalho de toda as nossas requisições

      setData({ user, token })

    } catch(error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.")
      }
    } 

  }

  function signOut() { // precisamos ir no botão de sair lá no componente "Header" para linkar essa funcionalidade a ele

    const token = localStorage.removeItem("@rocketnotes:token"); // removemos os dados salvos no localStorage
    const user = localStorage.removeItem("@rocketnotes:user");

    setData({}) // voltamos o setData a ser objeto vazio (estado inicial)

  }

  async function updateProfile({ user, avatarFile }) {

    try {

      if(avatarFile) {

        const fileUploadForm = new FormData(); // usamos o new FormData() para enviarmos a foto de avatar como um arquivo
        fileUploadForm.append("avatar", avatarFile); // adiciona no form criado acima um campo chamado "avatar" e dentro dele passamos o arquivo de imagem do avatar

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;

      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)) // o setItem nesse caso serve para substituir o conteúdo existente no localStorage

      setData({
        token: data.token,
        user
      })

      alert("Perfil atualizado com sucesso!")

    }

    catch(error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil")
      }
    } 

  }

  useEffect(() => {

    const token = localStorage.getItem("@rocketnotes:token"); // pega os dados token e user lá no localStorage
    const user = localStorage.getItem("@rocketnotes:user");

    if(token && user) { // se token e user existem, tranforme o State deles com o setData() com os valores do localStorage atribuídos acima

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user) // retransformamos o user em um objeto com o parse
      })
    }

  }, [])

  return(
    <AuthContext.Provider value={{ 
      signIn,
      signOut,
      updateProfile,
      user: data.user  
    }}>
      {children}
    </AuthContext.Provider>
  )

}

function useAuth() {

  const context = useContext(AuthContext);

  return context

}

export { AuthProvider, useAuth };