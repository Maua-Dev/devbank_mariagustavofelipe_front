import { useState } from 'react';
// @ts-ignore
import './App.css';

interface Usuario {
  name: string;
  agency: string;
  account: string;
  current_balance: number;
}

function App() {
  const [tela, setTela] = useState<'config' | 'conta'>('config');
  const [apiUrl, setApiUrl] = useState('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(false);

  const conectarApi = async () => {
    if (apiUrl.trim() === "") {
      alert("O campo da API endpoint é obrigatório!");
      return;
    }

    setCarregando(true);
    try {
      // Faz a chamada para o endpoint
      const resposta = await fetch(apiUrl);
      if (!resposta.ok) throw new Error("Usuário não encontrado");
      const dados = await resposta.json();

      setUsuario(dados);
      setTela('conta');
    } catch (erro) {
      alert("Erro ao conectar no endpoint: " + erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="pagina-fundo-azul">
      {/* TELA 1: CONFIGURAÇÃO (LOGIN) */}
      {tela === 'config' && (
        <div className="container-config">
          <h1 className="logo-main">DevBank</h1>

          <div className="azul-claro-card card-config">
            <h2>Configuração</h2>
            <hr className="linha-separadora" />
            <p>Digite o API Endpoint para prosseguir:</p>
            <input
              type="text"
              className="input-url"
              placeholder="https://api.exemplo.com"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
            <button
              className="botao-padrao btn-entrar"
              onClick={conectarApi}
              disabled={carregando}
            >
              {carregando ? "..." : "ENTRAR"}
            </button>
          </div>
        </div>
      )}

      {/* TELA 2: DASHBOARD (CONTA) */}
      {tela === 'conta' && (
        <div className="dashboard-container">
          <header className="dashboard-header">
            <div className="header-content">

              <div className="grupo-esquerda-header">
                <button onClick={() => setTela('config')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="logo-dashboard">DevBank</h1>
              </div>

              <div className="info-usuario-card">
                <p>Nome: {usuario?.name}</p>
                <p>Agência: {usuario?.agency}</p>
                <p>Conta: {usuario?.account}</p>
              </div>

            </div>
          </header>

          <main className="dashboard-main">
            <div className="barra-pergunta">
              <p className="txt-pergunta">O que deseja fazer?</p>
              <div className="card-saldo-horizontal">
                Saldo: R$ {usuario?.current_balance.toFixed(2).replace('.', ',')}
              </div>
            </div>

            <div className="grid-cards-verticais">
              <div className="card-acao-vertical">
                <span className="material-symbols-outlined icone-grande">payments</span>
                <p>Depositar</p>
              </div>
              <div className="card-acao-vertical">
                <span className="material-symbols-outlined icone-grande">savings</span>
                <p>Sacar</p>
              </div>
              <div className="card-acao-vertical">
                <span className="material-symbols-outlined icone-grande">history</span>
                <p>Extrato</p>
              </div>
            </div>
          </main>
        </div> 
          {/* TELA 3: REGISTRO  */}
    <div className="header">
      <h1>DevBank</h1>

      <div className="user-box">
        <p><strong>Nome:</strong> Felipe Andersen</p>
        <p><strong>Agência:</strong> 0000</p>
        <p><strong>Conta:</strong> 00000-0</p>
      </div>
    </div>

      )}
    </div>
  );
}

export default App;
