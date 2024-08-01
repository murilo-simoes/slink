'use client';
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./page.module.css";
import { api, isValidLink } from "@/api/api";
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation";

export default function Home() {

  const [link, setLink] = useState("")
  const [newLink, setNewLink] = useState("")
  const [mostrarLink, setMostrarLink] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter()

  const notify = (text:string) => toast.error(text);
  const notifyS = (text:string) => toast.success(text);
 
  const id = searchParams.get('id');

  useEffect(() => {
      if (id) {
          alert("Tem id!")
      }
  }, [id, router]);

  const encurtarUrl = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    if(isValidLink(link)){
      const response = await api.post('/link/add', {
        "link": link,
      })

      if(response.status === 200){
        setNewLink(response.data.id);
        setMostrarLink(true);
        return 
      }else{
        return notify("Erro ao encurtar a URL!")
      }
    }else{
      return notify("O link inserido é inválido!")
    }
    
  }

  const copyText = () => {
    notifyS("URL curta foi copiada para área de transferência!")
    return navigator.clipboard.writeText(newLink)
  }


  return (
    <>
    <main className={styles.main}>
      {mostrarLink 
      ? 
      <div className={styles.wrapper}>
         <h1 className={styles.title}><b className={styles.smink}>SLink</b> - Encurtador de URL</h1>
          <div className={styles.divUrl}>
            <h4 style={{"whiteSpace":"nowrap", "textOverflow":"ellipsis", "color":"#502e95"}}>{newLink}</h4>
          </div>
            <button className={styles.button} onClick={() => copyText()}>Copiar URl encurtada</button>
      </div>
      :
      <form onSubmit={encurtarUrl} className={styles.wrapper}>
        <h1 className={styles.title}><b className={styles.smink}>SLink</b> - Encurtador de URL</h1>
        <input onChange={(e) => setLink(e.target.value)} className={styles.inputUrl} type="text" placeholder="Cole o link aqui"></input>
        <button className={styles.button}>Encurtar URL</button>
      </form>
      }
    </main>
    <ToastContainer theme="dark"/>
    </>
  );
}
