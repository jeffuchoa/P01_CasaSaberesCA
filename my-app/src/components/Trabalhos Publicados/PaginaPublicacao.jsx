import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import lixo from "../../midia/lixo.png";
import pesquisa from "../../midia/pesquisa.png";

import { useContext } from "react"
import { AdminContext } from "../Login_Contexto/ContextoLogin";
import { Link } from 'react-router-dom';

import axios from "axios"

import Swal from 'sweetalert2';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL

function PaginaPublicacao() {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [publicacoesPerPage] = useState(4);

  const { isAdmin } = useContext(AdminContext);

  const [publicacoes, setTrabalhos] = useState([])
  const [mudou, setMudou] = useState(false)

  useEffect(
    () => {
      axios.get(`${API_URL}/seaweed`)
        .then(
          (response) => {
            setTrabalhos(response.data)
          }
        )
        .catch(error => console.log(error))
    }
    ,
    [mudou]
  )

  function deleteTrabalho(id) {
    const token = localStorage.getItem("token")

    axios.delete(`${API_URL}/seaweed/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(
        () => {
          setMudou(!mudou)
        }
      )
      .catch(error => console.log(error))
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredPublicacoes = publicacoes.filter((publicacao) =>
    publicacao.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredPublicacoes.length > 0;
  const showNoResults = searchQuery.length > 0 && !hasResults;

  const indexOfLastPublicacao = currentPage * publicacoesPerPage;
  const indexOfFirstPublicacao = indexOfLastPublicacao - publicacoesPerPage;
  const currentPublicacoes = filteredPublicacoes.slice(indexOfFirstPublicacao, indexOfLastPublicacao);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPublicacoes.length / publicacoesPerPage); i++) {
    pageNumbers.push(i);
  }

  const Excluir = (id) => {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      text: "O processo não será revertido após a confirmação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Deletar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTrabalho(id)
        Swal.fire('Deletado!', 'O item foi excluido', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'O item foi salvo', 'error');
      }
    });
  };

  return (
    <>
      <div className="header-pesquisas">
        <div className="cabecalho">
          <h1 className="titulo"> Publicações</h1>
          <p className="subtitulo">Trabalhos oficiais feitos pela Casa de Saberes!</p>
        </div>
      </div>

      <div className='todaspublicacoes'>

        <div className="search-container">
          <img src={pesquisa} alt="Lupa de pesquisa ilustrada" className='lupar' />
          <TextField
            label="Pesquisar"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            className="search-input"
          > </TextField>

          <Link to={'/novaPublicacao'}>
            <div className={isAdmin === true ? 'botao-postar active' : 'botao-postar '}><h1>+</h1> Nova Publicação</div>
          </Link>
        </div>

        <div className={`publicacoes-container ${showNoResults ? "no-results-message" : ""}`}>
          {currentPublicacoes.map((publicacao) => (
            <div className='foi' key={publicacao._id}>
              <Link to={`/trabalho/${publicacao._id}`}>
                <Card sx={{ maxWidth: "100%", mb: "3%", backgroundColor: "#EAE8DB", color: "#a12d2e" }}>
                  <CardActionArea sx={{ display: "flex", flexDirection: "row" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${API_URL}/seaweed/${publicacao._id}/thumbnail`}
                      alt="Imagem Publicação"
                    />
                    <CardContent sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", width: "90%" }}>
                      <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", justifyContent: "flex-start" }}>
                        {publicacao.titulo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", justifyContent: "flex-start", color: "#a12d2e" }}>
                        {publicacao.descricao}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
              {isAdmin && (
                <img
                  src={lixo}
                  onClick={() => Excluir(publicacao._id)}
                  alt="ícone de lixeira para excluir trabalho selecionado"
                  className='imagem-lixo-publicacao'
                />
              )}
            </div>
          ))}
          {showNoResults && (
            <div className="no-results-text">
              Nenhum resultado encontrado para a pesquisa: {searchQuery}
            </div>
          )}
        </div>

        <div className="pagination">
          {pageNumbers.map((number) => (
            <Button
              key={number}
              variant="contained"
              color={number === currentPage ? 'secondary' : 'default'}
              onClick={() => paginate(number)}
            >
              {number}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

export default PaginaPublicacao