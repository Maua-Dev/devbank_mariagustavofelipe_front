
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
  const [tela, setTela] = useState<'config' | 'conta' | 'extrato'>('config');
  const [apiUrl, setApiUrl] = useState('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const conectarApi = async () => {
    try {
      const resposta = await fetch(apiUrl);
      const dados = await resposta.json();
      setUsuario(dados);
      setTela('conta');
    } catch (e) { alert("Erro ao conectar!"); }
  };

  return (
    <div className="pagina-fundo-azul">
      
      {/* TELA 1: CONFIGURAÇÃO */}
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
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
            <button className="botao-padrao btn-entrar" onClick={conectarApi}>
              ENTRAR
            </button>
          </div>
        </div>
      )}

      {/* TELA 2: CONTA (DASHBOARD) */}
      {tela === 'conta' && (
        <div className="dashboard-container">
          <header className="dashboard-header">
            <div className="header-content">
              <div className="grupo-esquerda-header">
                <button onClick={() => setTela('config')} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
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
                Saldo Atual: R$ {usuario?.current_balance.toLocaleString('pt-BR')}
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
              <div className="card-acao-vertical" onClick={() => setTela('extrato')}>
                <span className="material-symbols-outlined icone-grande">history</span>
                <p>Transações</p>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* TELA 3: REGISTRO (HEADER IGUAL AO DASHBOARD) */}
      {tela === 'extrato' && (
        <div className="dashboard-container">
          <header className="dashboard-header">
            <div className="header-content">
              <div className="grupo-esquerda-header">
                <button onClick={() => setTela('conta')} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
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

          <div className="transactions">
            <div className="card">
              <div className="card-header">Saque 🐷</div>
              <div className="card-body">
                <p>
                  <strong>Valor:</strong> R$ 200,00 
                  <strong>Data:</strong> 18-03-2026 / 15:30:00 
                  <strong>Saldo:</strong> R$ {usuario?.current_balance.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">Depósito 💵</div>
              <div className="card-body">
                <p>
                  <strong>Valor:</strong> R$ 500,00 
                  <strong>Data:</strong> 18-03-2026 / 15:30:00 
                  <strong>Saldo:</strong> R$ {usuario?.current_balance.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            <button className="back-button" onClick={() => setTela('conta')}>
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;