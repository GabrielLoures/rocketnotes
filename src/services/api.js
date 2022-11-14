import axios from "axios";

export const api = axios.create({

  baseURL: "https://rocketnotes-api4.herokuapp.com" // criamos a base do nosso endereço padrão para não ter que ficar repetindo nos passos seguintes

})