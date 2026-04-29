import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  return (
  <>
    {/* HEADER */}
    <div className="header">
      <h1>DevBank</h1>

      <div className="user-box">
        <p><strong>Nome:</strong> Felipe Andersen</p>
        <p><strong>Agência:</strong> 0000</p>
        <p><strong>Conta:</strong> 00000-0</p>
      </div>
    </div>

    {/* TRANSAÇÕES */}
    <div className="transactions">

      <div className="card">
        <div className="card-header">Saque 🐷</div>
        <div className="card-body">
          <p>
            <strong>Valor:</strong> R$ 00000{" "}
            <strong>Data:</strong> 18-03-2026 / 15:30:00{" "}
            <strong>Saldo:</strong> R$ 00000
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Depósito 💵</div>
        <div className="card-body">
          <p>
            <strong>Valor:</strong> R$ 00000{" "}
            <strong>Data:</strong> 18-03-2026 / 15:30:00{" "}
            <strong>Saldo:</strong> R$ 00000
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Saque 🐷</div>
        <div className="card-body">
          <p>
            <strong>Valor:</strong> R$ 00000{" "}
            <strong>Data:</strong> 18-03-2026 / 15:30:00{" "}
            <strong>Saldo:</strong> R$ 00000
          </p>
        </div>
      </div>

    </div>

    {/* BOTÃO */}
    <button className="back-button">
      Voltar
    </button>
  </>
)

}

export default App