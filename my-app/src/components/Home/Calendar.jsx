import React, { useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { ptBR } from "@mui/x-date-pickers/locales";
import { useState } from "react";
import Swal from 'sweetalert2';

import { AcessContext} from "../Login_Contexto/ContextoAcessibilidade";



import { Container, Box, Typography, TextField, Button } from "@mui/material"

import cantores from "../../midia/casal2.png";
import passaro from "../../midia/passaro2.png";
import lixo from "../../midia/lixo2.png"
import x from "../../midia/volta3.png"

import {AdminContext, AdminProvider} from "../Login_Contexto/ContextoLogin";
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import volta from "../../midia/volta3.png";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useRef } from "react";

const API_URL = import.meta.env.VITE_APP_API_URL



function Calendar() {

  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);


  const navigate = useNavigate()

  const [diaselec, Setdiaselect] = useState([
    { title: 'Dia da marmota', date: '2023-06-06', descricao: 'Um dia super legalzinho :)', horario: '12:00' },
  ])
  const mes = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
  const [dia, SetDia] = useState()
  const [mesSelect, SetMesSelect] = useState()

  const [overlay, SetOverlay] = useState('overlayDia')

  const [eventos, SetEventos] = useState([
    { title: 'Dia da marmota', date: '2023-06-23', descricao: 'Um dia super legalzinho :)', horario: '12:00' },
    { title: 'Dia do cururu', date: '2023-06-06', descricao: 'Mds que dia legal :o', horario: '12:00' },
    { title: 'Dia do coiso', date: '2023-06-06', descricao: 'Cuidado com o coiso', horario: '12:00' },
  ])

  const [mudou, setMudou] = useState(false)

  const [buttonClass, setButtonClass] = useState('aaaa');

  useEffect(
    () => {
        if(isAdmin == true){
          setButtonClass('botao-ativo')
        }
    }
    ,
    []
  )

  useEffect(
    () => {
        axios.get(`${API_URL}/eventos/listar`)
            .then(
                (response) => {
                    SetEventos(response.data)
                    console.log (response.data)
                }
            )
            .catch(error => console.log(error))
    }
    ,
    [mudou]
  )

  const [overlayNovoEvento, SetNovoEvento] = useState(true)




  const mostra = (info) => {
    SetOverlay('overlayNovoEvento active')

    const clickedDate = info.dateStr;
    const eventosDoDia = eventos.filter(evento => evento.date === clickedDate);

    Setdiaselect(eventosDoDia)


    SetDia(clickedDate.split("-")[2]);
    SetMesSelect(parseInt(clickedDate.split("-")[1]))
    console.log(clickedDate.split("-")[2])
    console.log(dia)
  }

  const trocar = () => {
    SetOverlay('overlayNovoEvento')
  }


  useEffect(
    () => {

    },
    [dia,eventos,mudou]
  )

  const [novoClass,SetNovoClass] = useState (false)
  const trocarClasse = () => {
    SetNovoClass(!novoClass)
    console.log(novoClass)
  }


  const customButtons = {};

  if (isAdmin) {
  customButtons.meuBotao = {
    text: '+ Novo evento',
    click: trocarClasse
  };
  }

  
  const [novoeventodia,setnovoeventodia] = useState ()

  const funcaoCalendario = (x) => {
    if(x.$D || x.$M < 10){
      if(x.$D<10 && x.$M < 10){
        setnovoeventodia(`${x.$y}-0${x.$M+1}-0${x.$D}`)
      }
      else if(x.$M < 10 && x.$D > 10){
        setnovoeventodia(`${x.$y}-0${x.$M+1}-${x.$D}`)
      }
      else if(x.$D< 10 && x.$M > 10 ){
        setnovoeventodia(`${x.$y}-${x.$M+1}-0${x.$D}`)
      }
     console.log(nomeEvento)
    }
  }
  
  const [descricaoEvento,SetDescricaoEvento] = useState ('')
  const [horarioEvento,SetHorarioEvento] = useState ('')
  const [nomeEvento,SetNomeEvento] = useState ('')

  const [novoEvento,SetNovoEvent] = useState({kiki:'a'})

  const MontarEvento = () => {
    const novoTrabalho = { title: nomeEvento, date: novoeventodia, descricao: descricaoEvento, horario: horarioEvento }
    axios.post(`${API_URL}/eventos/adicionar`, novoTrabalho)
      .then(
        (response) => {
          Confirmação()
          trocarClasse()
          navigate("/")
          setMudou(!mudou)
          console.log(eventos)
        }
      )
      .catch(error => console.log(error))
  }
  
  function deletar(id) {
   
        axios.delete(`${API_URL}/eventos/delete/${id}`)
            .then(
                (response) => { 
                    deleteTeste(id)
                    setMudou(!mudou)
                    trocar()
                    console.log(eventos)
                }
            )
            .catch(error => console.log(error))
    
  }
  function deleteTeste(id) {
    for (let i = 0; i < (eventos.length -1); i++) {
        if (eventos[i].id == id) {
            eventos.splice(i, 1);
            setMudou(!mudou)
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
        deletar(id)
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

  const Confirmação = () => {
    Swal.fire(
      'Sucesso!',
      'Um novo item foi criado!',
      'success'
    )
  }
  



  const [activ, Setactiv] = useState('')

  return (
    <>
      <div className={overlay}>
        <div className="container-data">
          <div className="data">
            <div className="mes">{mes[mesSelect - 1]}</div>
            <div className="dia">{dia}</div>
          </div>
          <div className="eventos">
            <div className="fechar" onClick={trocar}>X</div>
            {diaselec.length === 0 ? (
              <div className="mensagemEventos"><p>Não temos eventos para esse dia</p></div>
            ) : (
              diaselec.map((evento) => (

                <div className="evento">
                  <div className="titulo">{evento.title}</div>
                  <div className="descricao">
                    <p>{evento.descricao}</p>
                    <div className="horario-delete">
                      <p>Horário: {evento.horario}</p>
                      {isAdmin === true ? <img className = "active" src={lixo} alt="ícone de lixo" onClick={() => Excluir(evento._id)} /> : null}
                      
                    </div>
                    
                  </div>
                </div>

              ))
            )}
          </div>
        </div>
      </div>

      <div className = {novoClass === false ? 'overlayNovoEvento' : 'overlayNovoEvento active'}>
        <div className={"container-data-novo-evento active"}>
          <div className="titulo">
            <img src={volta} alt="" onClick={trocarClasse} />
            <h1>Novo Evento</h1>
          </div>

          <div className="conteudo-overlay">
            <div className="calendario-overlay">
              <div className="titulo-calendario">Qual a data do evento?</div>
              <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                <DateCalendar
                  views={['year', 'month', 'day']}
                  onChange={funcaoCalendario}
                />
              </LocalizationProvider>
            </div>
            <div className="informacoesEvento">
              <Container maxWidth="md" >

                <div className="titulo-calendario">Informações sobre o evento</div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "80%",
                    mt: "3%",
                    // alignItems: "center",

                  }}
                >
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Nome do evento"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(x)=> {SetNomeEvento(x.target.value)}}

                  />
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Descrição do evento"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(x)=> {SetDescricaoEvento(x.target.value)}}

                  />
                  <TextField
                  sx={{width:"40%",}}
                    required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Horário do evento"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(x)=> {SetHorarioEvento(x.target.value)}}

                  />
                  
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 7, mb: 2, color: "white", backgroundColor:"#A12D2E", fontFamily:"titulo" }}
                      onClick={MontarEvento}
                      className="botao-envio"
                    >
                      Criar novo Evento
                    </Button>
                </Box>
              </Container>
            </div>
          
        
          </div>
          
        </div>
      </div>

      <div className={acessibilidade? ("bloco-calendario acessibilidade"): ("bloco-calendario")}>
        <img className="cantores" src={cantores} alt="" />
        <img className="passaro" src={passaro} alt="" />
        <div className="header-pesquisas">
            <div className="cabecalho">
                <h1 className="titulo"> Eventos</h1>
                <p className="subtitulo">Fique por dentro de todos os eventos!</p>
            </div>
        </div>
        <div className={acessibilidade? ("calendario acessibilidade"): ("calendario")}>
          <div className="corpo-calendario" style={{ width: "50vw" }}>
            <Fullcalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "title", // will normally be on the left. if RTL, will be on the right
                center: "",
                end: isAdmin === true ? 'today prev,next meuBotao' : 'today prev,next'  // will normally be on the right. if RTL, will be on the left
              }}
              events={eventos}
              locale='pt-br'
              height={"80vh"}
              buttonText={{
                today: 'Hoje',
              }}

              customButtons={customButtons}

              dateClick={mostra}
            />
            
          </div>
          <div className={"overlayNovoEvento " + activ}>
            
              <div className="workshopconteinar">
                <div className="fechar-formulario"><img src={x} alt="" onClick={() => Setactiv('')} /><h1>Workshop</h1></div>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf8566TmcMFKFqNVv6ldez26beNlS14NkxIvDbJ9-6XMu_4Dg/viewform?embedded=true" className="form-workshop" width="100%" height="100%" frameborder="0" marginheight="" marginwidth="0">Carregando…</iframe>
              </div>
          </div>
          <div className="corpo-workshop">
            <p>Sugira um novo Workshop para o nosso calendário!</p>
            <div className={acessibilidade? ("botao active acessibilidade"): ("botao active")} onClick={() => Setactiv('active')}><p>Clique Aqui!</p></div>
          </div>
        </div>

      </div>

    </>

  );
}

export default Calendar;