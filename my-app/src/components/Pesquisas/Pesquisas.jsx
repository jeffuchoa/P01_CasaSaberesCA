import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Button } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Swal from "sweetalert2";

import lupa from "../../midia/lupa.png"
import x from "../../midia/volta3.png"
import volta from "../../midia/volta3.png";
import lixo from "../../midia/lixo.png"

import { AdminContext, AdminProvider } from "../Login_Contexto/ContextoLogin";
const API_URL = import.meta.env.VITE_APP_API_URL


import { Container, Box, Typography, TextField } from "@mui/material"

const Pesquisas = () => {
    const [linkForm, SetLinkForm] = useState('')
    const [pesquisas, SetPesquisa] = useState([])
    const [classe, SetClass] = useState('')
    const [modalClass, SetmodalClass] = useState('')
    const [numeroAcessos, setNumeroAcessos] = useState(0);
    const [novotrabalho2,SetNovoTrabalho2] = useState(true);


    const [tituloPesquisa, SetTituloPesquisa] = useState('')
    const [descricaoPesquisa, SetDescricaoPesquisa] = useState('')
    const [linkPesquisa, SetLinkPesquisa] = useState('')

    const { isAdmin, setIsAdmin } = useContext(AdminContext);

    const [mudou, setMudou] = useState(false)

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [publicacoesPerPage] = useState(4);


    
    useEffect(
        () => {
            axios.get(`${API_URL}/pesquisas/listar`)
                .then(
                    (response) => {
                        SetPesquisa(response.data.slice().reverse())
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )
    useEffect(
        () => {
            axios.get(`${API_URL}/pesquisas/listar`)
                .then(
                    (response) => {
                        SetPesquisa(response.data.slice().reverse())
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        [mudou]
    )
    
      const Confirmação = () => {
        Swal.fire(
          'Sucesso!',
          'Um novo item foi criado!',
          'success'
        )
    }
    const MontarPesquisa = () => {
        SetNovoTrabalho2(false)
        const novoTrabalho = { titulo: tituloPesquisa, descricao: descricaoPesquisa, link: linkPesquisa }
        axios.post(`${API_URL}/pesquisas/adicionar`, novoTrabalho)
            .then(
                (response) => {
                    Confirmação()
                    SetmodalClass("")
                    setMudou(!mudou)

                }
            )
            .catch(error => console.log(error))
    }

    function deletar(id) {
       
            axios.delete(`${API_URL}/pesquisas/delete/${id}`)
                .then(
                    (response) => {
                        setMudou(!mudou)
                    }
                )
                .catch(error => console.log(error))
       
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const filteredPublicacoes = pesquisas.filter((publicacao) =>
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

    const PesquisaClicada = (link) => {
        const links = link.split('=').map(link => link.replace(/"/g, ''));
        SetLinkForm(links[1])

        SetClass('active')
        console.log(links[1])
    }

    function deleteTrabalho(id) {
    
        axios.delete(`${API_URL}/pesquisas/delete/${id}`)
          .then(
            (response) => {
              deletar(id)
              setMudou(!mudou)
            }
          )
          .catch(error => console.log(error))
      
    }
  
    function deleteTeste(id) {
      for (let i = 0; i < pesquisas.length; i++) {
        if (pesquisas[i].id == id) {
          pesquisas.splice(i, 1);
          return true;
        }
      }
      return false
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
            console.log(id)
            Swal.fire(
              'Deletado!',
              'O item foi excluido',
              'success'
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelado',
              'O item foi salvo',
              'error'
            );
          }
        });
    };


    return (
        <>
            <div className="header-pesquisas">
                <div className="cabecalho">
                    <h1 className="titulo"> Pesquisas</h1>
                    <p className="subtitulo">Nós ajude a entender você da melhor forma!</p>
                </div>
                <div className={isAdmin === true ? 'botao active' : 'botao '} onClick={() => SetmodalClass('active')}><p>+ Nova Pesquisa</p></div>
            </div>

            <div className={"overlayNovoEvento " + classe + modalClass}>
                <div className={"container-data-novo-evento " + modalClass}>
                    <div className="titulo">
                        <img src={volta} alt="" onClick={() => SetmodalClass('')} />
                        <h1>Nova pesquisa</h1>
                    </div>
                    <div className="informacoesEvento">


                        <Container maxWidth="md" marginLeft="10%" >

                            <div className="titulo-calendario"><h2>Informações sobre a Pesquisa</h2></div>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    width: "80%",
                                    height: "80%",
                                    mt: "3%",
                                    // alignItems: "center",

                                }}
                            >
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Titulo da pesquisa"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(x) => { SetTituloPesquisa(x.target.value) }}
                                />
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Descrição dapesquisa"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(x) => { SetDescricaoPesquisa(x.target.value) }}

                                />
                                <TextField
                                    sx={{ width: "100%", }}
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="link da pesquisa"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(x) => { SetLinkPesquisa(x.target.value) }}

                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={MontarPesquisa}
                                    className="botao-envio"
                                >
                                    Criar nova pesquisa
                                </Button>
                            </Box>
                        </Container>
                    </div>
                </div>
                <div className={"formulario-container " + classe}>
                    <div className="fechar-formulario">
                        <img src={x} alt="" onClick={() => SetClass('')} />
                        <h1>Pesquisa</h1>
                    </div>
                    <iframe src={linkForm} width="100%" height="90%" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>
                </div>
            </div>
            <div className="pesquisas">
                {currentPublicacoes.map((pesquisa) =>
                    <>
                        <div className="item-pesquisa" >
                            <div className="pesquisa" >
                                <div className="header-pesquisa" onClick={() => PesquisaClicada(pesquisa.link)}>
                                    <img src={lupa} alt="" />
                                    <h1>{pesquisa.titulo}</h1>
                                </div>
                                <img className={isAdmin === true ? 'botao-delete active' : 'botao-delete '} src={lixo} alt="" onClick={() => Excluir(pesquisa._id)} />

                            </div>
                            <div className="descricao"><p>{pesquisa.descricao}</p></div>
                        </div>
                    </>
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



        </>
    )
}

export default Pesquisas