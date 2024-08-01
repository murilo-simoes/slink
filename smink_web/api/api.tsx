import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5130/api/v1/",
});

export function isValidLink(text: string): boolean {
  const urlPattern = new RegExp(
      '^https?:\\/\\/' + // protocolo
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domínio
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // ou IP (v4) 
      '(\\:\\d+)?' + // porta opcional
      '(\\/[-a-z\\d%_.~+]*)*' + // caminho
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i' // fragmento opcional
  );
  return urlPattern.test(text);
}