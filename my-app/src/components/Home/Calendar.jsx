import React, { useEffect, useState, useContext } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import MobileCalendar from "./MobileCalendar";

import { ptBR } from "@mui/x-date-pickers/locales";
import Swal from 'sweetalert2';

import { AcessContext } from "../Login_Contexto/ContextoAcessibilidade";
import { AdminContext } from "../Login_Contexto/ContextoLogin";

import { Container, Box, TextField, Button } from "@mui/material";

import cantores from "../../assets/img/casal2.png";
import passaro from "../../assets/img/passaro2.png";
import lixo from "../../assets/img/lixo2.png";
import x from "../../assets/img/volta3.png";
import volta from "../../assets/img/volta3.png";

import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

function Calendar() {
  const { isAdmin } = useContext(AdminContext);
  const { acessibilidade } = useContext(AcessContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const navigate = useNavigate();

  const [diaselec, Setdiaselect] = useState([]);
  const mes = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const [dia, SetDia] = useState();
  const [mesSelect, SetMesSelect] = useState();

  const [overlay, SetOverlay] = useState('overlayDia');
  const [eventos, SetEventos] = useState([]);
  const [mudou, setMudou] = useState(false);

  const [descricaoEvento, SetDescricaoEvento] = useState('');
  const [horarioEvento, SetHorarioEvento] = useState('');
  const [nomeEvento, SetNomeEvento] = useState('');

  // Estados para manipular a seleção do DateCalendar no modal
  const [dataSelecionada, setDataSelecionada] = useState(dayjs());
  const [novoeventodia, setnovoeventodia] = useState(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/eventos/listar`)
      .then((response) => {
        SetEventos(response.data);
      })
      .catch(error => console.log(error));
  }, [mudou]);

  const mostra = (info) => {
    SetOverlay('overlayNovoEvento active');

    const clickedDate = info.dateStr; // Formato YYYY-MM-DD vindo do FullCalendar

    // Compara tratando a data vinda da API (removendo T03:00:00.000Z se existir)
    const eventosDoDia = eventos.filter(evento => {
      if (!evento.date) return false;
      return evento.date.split('T')[0] === clickedDate;
    });

    Setdiaselect(eventosDoDia);

    const partesData = clickedDate.split("-");
    SetDia(partesData[2]);
    SetMesSelect(parseInt(partesData[1], 10));
  };

  const trocar = () => {
    SetOverlay('overlayNovoEvento');
  };

  const [novoClass, SetNovoClass] = useState(false);
  const trocarClasse = () => {
    SetNovoClass(!novoClass);
  };

  const customButtons = {};
  if (isAdmin) {
    customButtons.meuBotao = {
      text: '+ Novo evento',
      click: trocarClasse
    };
  }

  // Atualiza o estado da data selecionada via Dayjs
  const funcaoCalendario = (x) => {
    if (x) {
      setDataSelecionada(x);
      setnovoeventodia(x.format('YYYY-MM-DD'));
    }
  };

  const MontarEvento = () => {
    if (!novoeventodia) {
      alert("Por favor, selecione uma data válida no calendário.");
      return;
    }

    const novoTrabalho = {
      title: nomeEvento,
      date: novoeventodia,
      descricao: descricaoEvento,
      horario: horarioEvento
    };

    axios.post(`${API_URL}/eventos/adicionar`, novoTrabalho)
      .then(() => {
        Confirmação();
        trocarClasse();
        setMudou(!mudou);
        navigate("/");
      })
      .catch(error => console.log(error));
  };
 
  useEffect(() => {
    axios.get(`${API_URL}/eventos/listar`)
      .then((response) => {
       
        const eventosFormatados = response.data.map(ev => ({
          ...ev,
        
          date: ev.date ? ev.date.split('T')[0] : ev.date,
         
          allDay: true
        }));

        SetEventos(eventosFormatados);
      })
      .catch(error => console.log(error));
  }, [mudou]);

  function deletar(id) {
    axios.delete(`${API_URL}/eventos/delete/${id}`)
      .then(() => {
        setMudou(!mudou);
        trocar();
      })
      .catch(error => console.log(error));
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
        deletar(id);
        Swal.fire('Deletado!', 'O item foi excluído.', 'success');
      }
    });
  };

  const Confirmação = () => {
    Swal.fire('Sucesso!', 'Um novo item foi criado!', 'success');
  };

  const [activ, Setactiv] = useState('');

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
                <div className="evento" key={evento._id || evento.title}>
                  <div className="titulo">{evento.title}</div>
                  <div className="descricao">
                    <p>{evento.descricao}</p>
                    <div className="horario-delete">
                      <p>Horário: {evento.horario}</p>
                      {isAdmin === true ? (
                        <img
                          className="active"
                          src={lixo}
                          alt="ícone de lixo"
                          onClick={() => Excluir(evento._id)}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={novoClass === false ? 'overlayNovoEvento' : 'overlayNovoEvento active'}>
        <div className="container-data-novo-evento active">
          <div className="titulo">
            <img src={volta} alt="Voltar" onClick={trocarClasse} />
            <h1>Novo Evento</h1>
          </div>

          <div className="conteudo-overlay">
            <div className="calendario-overlay">
              <div className="titulo-calendario">Qual a data do evento?</div>
              <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                <DateCalendar
                  views={['year', 'month', 'day']}
                  value={dataSelecionada}
                  onChange={funcaoCalendario}
                />
              </LocalizationProvider>
            </div>
            <div className="informacoesEvento">
              <Container maxWidth="md">
                <div className="titulo-calendario">Informações sobre o evento</div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "80%",
                    mt: "3%",
                  }}
                >
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    label="Nome do evento"
                    autoFocus
                    onChange={(x) => SetNomeEvento(x.target.value)}
                  />
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    label="Descrição do evento"
                    onChange={(x) => SetDescricaoEvento(x.target.value)}
                  />
                  <TextField
                    sx={{ width: "40%" }}
                    required
                    margin="normal"
                    fullWidth
                    label="Horário do evento"
                    onChange={(x) => SetHorarioEvento(x.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 7, mb: 2, color: "white", backgroundColor: "#A12D2E", fontFamily: "titulo" }}
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

     
      <div id="calendario" className={acessibilidade ? "bloco-calendario acessibilidade" : "bloco-calendario"}>
        <img className="cantores" src={cantores} alt="" />
        <img className="passaro" src={passaro} alt="" />
        <div className="header-pesquisas">
          <div className="cabecalho">
            <h1 className="titulo">Eventos</h1>
            <p className="subtitulo">Veja todos os eventos!</p>
          </div>
        </div>
        <div className={acessibilidade ? "calendario acessibilidade" : "calendario"}>
          {isMobile ? (
            <MobileCalendar />
          ) : (
            <div className="corpo-calendario">
              <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                  start: "title",
                  center: "",
                  end: isAdmin === true ? 'today prev,next meuBotao' : 'today prev,next'
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
          )}

          <div className={"overlayNovoEvento " + activ}>
            <div className="workshopconteinar">
              <div className="fechar-formulario">
                <img src={x} alt="Fechar" onClick={() => Setactiv('')} />
                <h1>Workshop</h1>
              </div>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf8566TmcMFKFqNVv6ldez26beNlS14NkxIvDbJ9-6XMu_4Dg/viewform?embedded=true"
                className="form-workshop"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
              >
                Carregando…
              </iframe>
            </div>
          </div>

          <div className="corpo-workshop">
            <p>Sugira um novo Workshop para o nosso calendário!</p>
            <div
              className={acessibilidade ? "botao active acessibilidade" : "botao active"}
              onClick={() => Setactiv('active')}
            >
              <p>Clique Aqui!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;