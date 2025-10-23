import {useEffect,useState} from 'react'
import axios from 'axios'

export default function Home(){
  const [health,setHealth] = useState('...')
  const [credits,setCredits] = useState(10)

  useEffect(()=>{
    axios.get((process.env.NEXT_PUBLIC_API_URL||'http://127.0.0.1:8000') + '/health')
      .then(r=>setHealth(r.data.status))
      .catch(()=>setHealth('offline'))
  },[])

  return (
    <div className="container">
      <h1>Preciosa IA <span className="badge">MVP</span></h1>
      <p>Status da API: <b>{health}</b></p>

      <div className="card">
        <h3>Dashboard</h3>
        <p>Créditos disponíveis: <b>💎 {credits}</b></p>
        <div>
          <button className="btn" onClick={()=>setCredits(c=>c+10)}>Adicionar créditos (simulado)</button>
        </div>
      </div>

      <div className="card">
        <h3>Try-On Virtual (placeholder)</h3>
        <p>Fluxo de upload e geração será conectado ao worker GPU.</p>
        <button className="btn">Enviar foto</button>
      </div>

      <div className="card">
        <h3>Gerar Legendas (placeholder)</h3>
        <button className="btn" onClick={async()=>{
          const r = await axios.post(
            (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000') + '/caption/generate',
            { categoria: 'vestido canelado', preco: '79,90', tamanhos: 'P-G', tom: 'amigavel' }
          );
          alert('Exemplo de legenda:\n' + r.data.variacoes[0]);
        }}>Gerar 5 variações</button>
      </div>
      <div className="card">
        <h3>Banners IA (placeholder)</h3>
        <button className="btn">Abrir modelos</button>
      </div>
    </div>
  )
}
