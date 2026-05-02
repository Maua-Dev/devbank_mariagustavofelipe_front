import { useState } from 'react';
// @ts-ignore
import './App.css';
const notas: number[] = [2, 5, 10, 20, 50, 100, 200];

const [qtd, setQtd] = useState<Record<number, number>>(
  Object.fromEntries(notas.map((n) => [n, 0]))
);

const total = notas.reduce((acc, n) => acc + n * (qtd[n] ?? 0), 0);

const alterar = (nota: number, delta: number) => {
  setQtd((prev) => ({
    ...prev,
    [nota]: Math.max(0, (prev[nota] ?? 0) + delta),
  }));
};
interface Usuario {
  name: string;
  agency: string;
  account: string;
  current_balance: number;
}

function App() {
  const [tela, setTela] = useState<'config' | 'conta' | 'extrato' | 'saque' | 'deposito'>('config');
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
                <div className="card-acao-vertical" onClick={() => setTela('deposito')}>
  <span className="material-symbols-outlined icone-grande">payments</span>
  <p>Depositar</p>
</div>
              </div>
              
  <p>Sacar</p>
</div>
              </div>
              <div className="card-acao-vertical" onClick={() => setTela('extrato')}>
                <span className="material-symbols-outlined icone-grande">history</span>
                <p>Transações</p>
              </div>
            </div>
          </main>
        </div>
      )}
      {/*tela 3 sacar e depositar*/}
      {tela === 'saque' && (
  <div className="dashboard-container">

    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="logo-dashboard">DevBank</h1>

        <div className="info-usuario-card">
          <p>Nome: {usuario?.name}</p>
          <p>Agência: {usuario?.agency}</p>
          <p>Conta: {usuario?.account}</p>
        </div>
      </div>
    </header>

    <main className="dashboard-main">

      <div className="balance">
        <span>Saldo Atual: R$ {usuario?.current_balance}</span>
        <span>Total saque: R$ {total}</span>
      </div>

      <div className="notes">
        {notas.map((note) => (
          <div key={note} className="note-card">

            <div className="note">R${note}</div>

            <div className="counter">
              <span>Quantidade</span>
              <button onClick={() => alterar(note, -1)}>-</button>
              <span>{qtd[note]}</span>
              <button onClick={() => alterar(note, 1)}>+</button>
            </div>

          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={() => setTela('conta')}>Voltar</button>
        <button>Sacar</button>
      </div>

    </main>
  </div>
)}
{tela === 'deposito' && (
  <div className="dashboard-container">

    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="logo-dashboard">DevBank</h1>

        <div className="info-usuario-card">
          <p>Nome: {usuario?.name}</p>
          <p>Agência: {usuario?.agency}</p>
          <p>Conta: {usuario?.account}</p>
        </div>
      </div>
    </header>

    <main className="dashboard-main">

      <div className="balance">
        <span>Saldo Atual: R$ {usuario?.current_balance}</span>
        <span>Total depósito: R$ {total}</span>
      </div>

      <div className="notes">
        {notas.map((note) => (
          <div key={note} className="note-card">

            <div className="note">R${note}</div>

            <div className="counter">
              <span>Quantidade</span>
              <button onClick={() => alterar(note, -1)}>-</button>
              <span>{qtd[note]}</span>
              <button onClick={() => alterar(note, 1)}>+</button>
            </div>

          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={() => setTela('conta')}>Voltar</button>
        <button>Depositar</button>
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
  {transacoes.length === 0 ? (
    <p>Nenhuma transação ainda</p>
  ) : (
    transacoes.map((t, index) => (
      <div className="card" key={index}>
        <div className="card-header">
          {t.tipo === "Saque" ? "Saque 🐷" : "Depósito 💵"}
        </div>
        <div className="card-body">
          <p>
            <strong>Valor:</strong> R$ {t.valor.toFixed(2)} <br />
            <strong>Data:</strong> {t.data} <br />
            <strong>Saldo:</strong> R$ {usuario?.current_balance.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    ))
  )}

  <button className="back-button" onClick={() => setTela('conta')}>
    Voltar
  </button>
</div>
  );
}

export default App;
