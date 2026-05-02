import { useState } from 'react';
// @ts-ignore
import './App.css';

interface Usuario {
  name: string;
  agency: string;
  account: string;
  current_balance: number;
}

interface Transacao {
  tipo: string;
  valor: number;
  data: string;
  saldoApos: number;
}

function App() {
  const [tela, setTela] = useState<'config' | 'conta' | 'extrato' | 'saque' | 'deposito'>('config');
  const [apiUrl, setApiUrl] = useState('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [historico, setHistorico] = useState<Transacao[]>([]);

  const notas: number[] = [2, 5, 10, 20, 50, 100, 200];

  // Mantendo a lógica de Qtd do seu grupo
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

  const conectarApi = async () => {
    try {
      const resposta = await fetch(apiUrl);
      const dados = await resposta.json();
      setUsuario(dados);
      setTela('conta');
    } catch (e) {
      alert("Erro ao conectar!");
    }
  };

  // Função para processar a operação (Ajustando para salvar no histórico e saldo)
  const realizarOperacao = (tipo: 'Saque' | 'Depósito') => {
    if (total <= 0) return;
    if (!usuario) return;

    if (tipo === 'Saque' && total > usuario.current_balance) {
      alert("Saldo insuficiente!");
      return;
    }

    const novoSaldo = tipo === 'Depósito' 
      ? usuario.current_balance + total 
      : usuario.current_balance - total;

    const novaTransacao: Transacao = {
      tipo: tipo === 'Depósito' ? 'Depósito' : 'Saque',
      valor: total,
      data: new Date().toLocaleString('pt-BR'),
      saldoApos: novoSaldo
    };

    // Atualiza os dados 
    setUsuario({ ...usuario, current_balance: novoSaldo });
    setHistorico([novaTransacao, ...historico]);
    setQtd(Object.fromEntries(notas.map((n) => [n, 0]))); // Reseta as quantidades
    setTela('conta');
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

      {/* CABEÇALHO PADRÃO (Aparece nas telas internas) */}
      {(tela === 'conta' || tela === 'extrato' || tela === 'saque' || tela === 'deposito') && (
        <div className="dashboard-container">
          <header className="dashboard-header">
            <div className="header-content">
              <div className="grupo-esquerda-header">
                <button className="btn-back-header" onClick={() => setTela(tela === 'conta' ? 'config' : 'conta')}>
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
            {/* TELA 2: MENU PRINCIPAL */}
            {tela === 'conta' && (
              <>
                <div className="barra-pergunta">
                  <p className="txt-pergunta">O que deseja fazer?</p>
                  <div className="card-saldo-horizontal">
                    Saldo Atual: R$ {usuario?.current_balance?.toLocaleString('pt-BR')}
                  </div>
                </div>

                <div className="grid-cards-verticais">
                  <div className="card-acao-vertical" onClick={() => setTela('deposito')}>
                    <span className="material-symbols-outlined icone-grande">payments</span>
                    <p>Depositar</p>
                  </div>

                  <div className="card-acao-vertical" onClick={() => setTela('saque')}>
                    <span className="material-symbols-outlined icone-grande">savings</span>
                    <p>Sacar</p>
                  </div>

                  <div className="card-acao-vertical" onClick={() => setTela('extrato')}>
                    <span className="material-symbols-outlined icone-grande">history</span>
                    <p>Transações</p>
                  </div>
                </div>
              </>
            )}

            {/* TELA 3: HISTÓRICO (EXTRATO) */}
            {tela === 'extrato' && (
              <div className="transactions">
                <div className="barra-pergunta" style={{width: '100%', marginBottom: '20px'}}>
                  <p className="txt-pergunta">Histórico de Transações</p>
                  <div className="card-saldo-horizontal">Saldo: R$ {usuario?.current_balance.toLocaleString('pt-BR')}</div>
                </div>
                
                {historico.map((t, i) => (
                  <div className="card" key={i}>
                    <div className="card-header">{t.tipo}</div>
                    <div className="card-body">
                      <p><strong>Valor:</strong> R$ {t.valor} | <strong>Data:</strong> {t.data} | <strong>Saldo:</strong> R$ {t.saldoApos}</p>
                    </div>
                  </div>
                ))}
                
                <button className="back-button" onClick={() => setTela('conta')}>Voltar</button>
              </div>
            )}

            {/* TELAS DE SAQUE E DEPÓSITO */}
            {(tela === 'saque' || tela === 'deposito') && (
              <div className="transactions" style={{backgroundColor: 'transparent', padding: '0'}}>
                <div className="balance">
                  <p className="txt-pergunta">Saldo Total: R$ {usuario?.current_balance}</p>
                  <div className="card-saldo-horizontal">
                    Quantidade {tela}: R$ {total}
                  </div>
                </div>

                <div className="notes">
                  {notas.map((note) => (
                    <div key={note} className="note-card">
                      <div className="note"><span>R${note}</span></div>
                      <div className="counter">
                        <button onClick={() => alterar(note, -1)}>-</button>
                        <span>{qtd[note]}</span>
                        <button onClick={() => alterar(note, 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <button onClick={() => setTela('conta')}>Voltar</button>
                  <button onClick={() => realizarOperacao(tela === 'saque' ? 'Saque' : 'Depósito')}>
                    Confirmar {tela === 'saque' ? 'Saque' : 'Depósito'}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;