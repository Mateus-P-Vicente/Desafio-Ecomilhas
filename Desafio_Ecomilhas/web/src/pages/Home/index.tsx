import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
        </header>

        <main>
          <h1>Desafio Ecomilhas</h1>
          <p>Feito por Mateus Vicente</p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong >Conheça/Cadastre Produtos</strong>
          </Link>
          <Link id="seller" to="/create-seller">
            <span id="seller">
              <FiLogIn />
            </span>
            <strong>Conheça/Cadastre Vendedores</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home;