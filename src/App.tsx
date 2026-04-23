import { useState } from 'react'
// @ts-ignore
import './App.css'

function App() {
  const [tela, setTela] = useState('config');
  const [apiUrl, setApiUrl] = useState('');

  const lidarComEntrada = () => {
    if (apiUrl.trim() === "") {
      alert("O campo da API endpoint é obrigatório!");
    } else {
      setTela('conta');
    }
  };

  return (
    <div className="pagina-fundo-azul">
      {tela === 'config' && (
        <div className="container-config">
          <h1 className="logo-main">DevBank</h1>
          <div className="azul-claro-card card-config">
            <h2>Configuração API Endpoint</h2>
            <hr className="linha-separadora" />
            <p>Por favor coloque a sua API endpoint para prosseguir</p>
            <input
              type="text"
              placeholder="https://link-da-api..."
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="input-url"
            />
            <button className="botao-padrao btn-entrar" onClick={lidarComEntrada}>Entrar</button>
          </div>
        </div>
      )}

      {tela === 'conta' && (
        <div className="dashboard-container">
          <header className="dashboard-header">
            <div className="header-content">

              {/* NOVO GRUPO PARA COLAR LOGO E BOTÃO */}
              <div className="grupo-esquerda-header">
                <button className="botao-voltar" onClick={() => setTela('config')}>
                  <span className="material-symbols-outlined">arrow_top_left</span>
                </button>
                <h1 className="logo-dashboard">DevBank</h1>
              </div>

              {/* O CARD DE INFO CONTINUA AQUI, O SPACE-BETWEEN JOGA ELE PARA A DIREITA */}
              <div className="info-usuario-card">
                <p>Nome: Felipe Andersen</p>
                <p>Agência: 0000</p>
                <p>Conta: 00000-0</p>
              </div>

            </div>
          </header>

          <main className="dashboard-main">
            <div className="barra-pergunta">
              <span className="txt-pergunta">O que deseja fazer?</span>
              <div className="card-saldo-horizontal">
                Saldo Atual: 1000
              </div>
            </div>

            <div className="grid-cards-verticais">
              {/* CARD DEPOSITAR (Símbolo de pagamento para baixo) */}
              <div className="card-acao-vertical">
                <span className="material-symbols-outlined icone-grande">payment_arrow_down</span>
                <span>Depositar</span>
              </div>

              {/* CARD SACAR (Porquinho) */}
              <div className="card-acao-vertical">
                <span className="material-symbols-outlined icone-grande">savings</span>
                <span>Sacar</span>
              </div>

              {/* CARD TRANSAÇÕES (Histórico) */}
              <div className="card-acao-vertical">
                <span className="material-symbols-outlined icone-grande">history</span>
                <span>Transações</span>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App