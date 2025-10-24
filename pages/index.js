import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [variacoes, setVariacoes] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [erro, setErro]         = useState('');

  const gerar = async () => {
    try {
      setErro('');
      setLoading(true);
      setVariacoes([]);

      const r = await axios.post('/api/caption/generate', {
        categoria: 'vestido canelado',
        preco: '79,90',
        tamanhos: 'P-G',
        tom: 'amigavel'
      });

      setVariacoes(r.data.variacoes || []);
    } catch (e) {
      setErro('Falha ao gerar legendas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Gerar Legendas</h3>
      <button className="btn" onClick={gerar} disabled={loading}>
        {loading ? 'Gerando…' : 'Gerar 5 variações'}
      </button>

      {erro && <p style={{color: 'crimson'}}>{erro}</p>}

      {variacoes.length > 0 && (
        <ul style={{marginTop: 12}}>
          {variacoes.map((v, i) => (
            <li key={i} style={{marginBottom: 8}}>
              <span>{v}</span>
              <button
                style={{marginLeft: 8}}
                onClick={() => navigator.clipboard.writeText(v)}
              >
                copiar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
