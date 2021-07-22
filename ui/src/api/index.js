import axios from "axios";

export const instance = axios.create({
  headers: {
    Authorization: "Bearer " + window.localStorage.getItem("__TOKEN__"),
  },
});

const fetchProducts = instance.get("http://localhost:3500/products");

const Api = { fetchProducts };

export default Api;
