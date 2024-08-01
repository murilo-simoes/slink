'use client';
import { api } from '@/api/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DynamicPage() {
    const [found, setFound] = useState(true);
    const { id } = useParams();
    const router = useRouter()

    useEffect(() => {
        const getPageUrl = async () => {
            const response = await api.post('/link/redirect', {
                "LinkId": id,
            })
            if(response.status === 200){
                return router.push(response.data.link)
            }else{
                return setFound(false);
            }
        }
        getPageUrl()
    }, [id])


    return (
        <>
         {
        !found ? <div style={{"backgroundColor":"#000"}}>
            <h1>Link não encontrado!</h1>
        </div>
        : <div style={{"backgroundColor":"#000"}}>
        </div>
        }
        </>
    );
}
