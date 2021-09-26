import axios from "axios";

export default axios.create({
  baseURL: "https://petconnect-v1.herokuapp.com/api/v1",
  timeout: 50000,
});
