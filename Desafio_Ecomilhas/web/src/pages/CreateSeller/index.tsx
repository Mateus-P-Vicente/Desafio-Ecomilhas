import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import './styles.css';

import logo from '../../assets/logo.svg';
import { fileURLToPath } from 'url';
import { request } from 'https';

// array ou objeto: manualmente informar o tipo da variavel

interface Seller {
  id: number;
  name: string;
  logo: string;
}

const CreateSeller = () => {

  const [formData, setFormData] = useState({
    name: '',
    logo: '',
  });

  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleRequest(even: FormEvent) {
    even.preventDefault();
    const response = await api.get('/Sellers');
    document.getElementById("sellersList")!.innerText = "";
    for(var i = 0; i < response.data.length; i++) {
      document.getElementById("sellersList")!.innerText += "Nome: " + response.data[i].name + "\n\n";
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, logo } = formData;
    
    const data = {
      name: name, 
      logo: selectedFile
    };

    await api.post('Seller', data);

    alert('Vendedor cadastrado!');

    history.push('/');
  }

  return (
    <div id="page-create-seller">
      <header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de vendedor</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome do vendedor</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        <button type="submit">
          Cadastrar Vendedor
        </button>
      </form>
      <form onSubmit={handleRequest}>
      <div id="sellersList" ></div>
        <button type="submit">
          Listar Vendedor
        </button>
      </form>
    </div>
  );
};

export default CreateSeller;