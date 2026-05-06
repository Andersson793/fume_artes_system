import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://fume-artes-api.onrender.com"
    : "http://127.0.0.1:3000",
  timeout: 55000,
});

export function fetchData(path, body) {
  
  const baseURL = import.meta.env.PROD ? "https://fume-artes-api.onrender.com": "http://127.0.0.1:3000";
  const URL = baseURL.concat(path);
  const method = "GET"

  let response;

  try{
    response = fetch(URL, {
      method: method,
      body: body,
      headers: {
        "Authorization": sessionStorage.get("token")
      }
    })

    if(!response.ok){
      console.log(response.status)
    }
    
  }catch (error) {
    console.log(error)
  }
  
  return response.json()
}
