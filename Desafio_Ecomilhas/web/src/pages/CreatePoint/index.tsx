import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import './styles.css';
import Axios from 'axios';



// array ou objeto: manualmente informar o tipo da variavel

interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
  seller: string;
}

const CreatePoint = () => {

  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    description: '',
    price: '',
    seller: '',
  });
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleRequest(even: FormEvent) {
    even.preventDefault();
    const response = await api.get('/Products');
    document.getElementById("productsList")!.innerText = "";
    for(var i = 0; i < response.data.length; i++) {
      document.getElementById("productsList")!.innerText += "Nome: " + response.data[i].title + 
                                                      "\nDescrição: " + response.data[i].description + 
                                                      "\nPreço: " + response.data[i].price + 
                                                      "\nVendedor: " + response.data[i].seller + "\n\n";
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { image_url, title, description, price, seller } = formData;

    const data = {
      image_url: selectedFile,
      title: title, 
      description: description,
      price: price,
      seller: seller
    };

    await api.post('Product', data);

    alert('Produto cadastrado!');

    history.push('/');
  }

  return (
    <div id="page-create-point">
      <header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de produto</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field-group">
            <div className="field">
              <label htmlFor="tile">Nome do produto</label>
              <input 
                type="text"
                name="title"
                id="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="price">Preço</label>
              <input 
                type="number"
                name="price"
                id="price"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field">
              <label htmlFor="description">Descrição</label>
              <input 
                type="text"
                name="description"
                id="description"
                onChange={handleInputChange}
              />
          </div>

          <div className="field">
              <label htmlFor="seller">Vendedor</label>
              <input 
                type="text"
                name="seller"
                id="seller"
                onChange={handleInputChange}
              />
          </div>
        </fieldset>

        <button type="submit">
          Cadastrar Produto
        </button>
      </form>
      <form onSubmit={handleRequest}>
      <div id="productsList" ></div>
        <button type="submit">
          Listar Produtos
        </button>
      </form>
    </div>
  );
};

export default CreatePoint;