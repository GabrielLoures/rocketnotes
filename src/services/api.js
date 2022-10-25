import axios from "axios";

export const api = axios.create({

  baseURL: "http://localhost:3000" // criamos a base do nosso endereço padrão para não ter que ficar repetindo nos passos seguintes

})