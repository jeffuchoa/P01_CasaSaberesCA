import { useState, useContext, useEffect, useRef } from "react"
import axios from "axios";
import { AdminContext, AdminProvider } from "../Login_Contexto/ContextoLogin";
import lixo from "../../assets/img/lixo2.png"
import Swal from 'sweetalert2';
import plus from "../../assets/img/plus.webp"
import volta from "../../assets/img/volta3.png";
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from "@mui/x-date-pickers/locales";
import { Container, Box, Typography, TextField, Button } from "@mui/material"
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";



const API_URL = import.meta.env.VITE_APP_API_URL

function MobileCalendar() {
    const [dias, setDias] = useState([]);
    const [eventos, SetEventos] = useState([
        { title: 'Dia da marmota', date: '2023-06-23', descricao: 'Um dia super legalzinho :)', horario: '12:00' },
        { title: 'Dia do cururu', date: '2023-06-06', descricao: 'Mds que dia legal :o', horario: '12:00' },
        { title: 'Dia do coiso', date: '2023-06-06', descricao: 'Cuidado com o coiso', horario: '12:00' },
    ])

    const [diaselec, Setdiaselect] = useState([
        { title: 'Dia da marmota', date: '2023-06-06', descricao: 'Um dia super legalzinho :)', horario: '12:00' },
    ])
    const mes = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    const [dia, SetDia] = useState()
    const [mesSelect, SetMesSelect] = useState()

    const [overlay, SetOverlay] = useState('overlayDia')
    const { isAdmin, setIsAdmin } = useContext(AdminContext);

    const [descricaoEvento, SetDescricaoEvento] = useState('')
    const [horarioEvento, SetHorarioEvento] = useState('')
    const [nomeEvento, SetNomeEvento] = useState('')
    const [dataSelecionada, setDataSelecionada] = useState(dayjs('2026-12-25'));
    const [novoeventodia, setnovoeventodia] = useState()
    const navigate = useNavigate()


    const [mudou, setMudou] = useState(false)

    const gerarDias = (quantidade = 30) => {
        const dias = [];
        const hoje = new Date();

        for (let i = 0; i < quantidade; i++) {
            const data = new Date(hoje);
            data.setDate(hoje.getDate() + i);

            const ano = data.getFullYear();
            const mesNum = String(data.getMonth() + 1).padStart(2, "0");
            const diaNum = String(data.getDate()).padStart(2, "0");

            dias.push({
                dataCompleta: `${ano}-${mesNum}-${diaNum}`,
                diaSemana: data.toLocaleDateString("pt-BR", { weekday: "short" }),
                mes: data.toLocaleDateString("pt-BR", { month: "short" }),
                diaNumero: diaNum,
            });
        }
        console.log(dias)
        return dias;

    };

    const [buttonClass, setButtonClass] = useState('aaaa');

    useEffect(
        () => {
            if (isAdmin == true) {
                setButtonClass('botao-ativo')
            }
        }
        ,
        []
    )


    useEffect(() => {
        setDias(gerarDias(30));

    }, []);

    useEffect(
        () => {
            axios.get(`${API_URL}/eventos/listar`)
                .then(
                    (response) => {
                        SetEventos(response.data)
                        console.log(response.data)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        [mudou]
    )

    const trocar = () => {
        SetOverlay('overlayNovoEvento')
    }

    const [titulo, setTitulo] = useState("");
    const [descricao, setdescricao] = useState("");
    const [idEvento, setIdEvento] = useState("");

    const mostra = (titulo, descricao, horario, info, id) => {
        SetOverlay('overlayNovoEvento active')

        const clickedDate = info;

        setIdEvento(id);
        setTitulo(titulo);
        setdescricao(descricao);
        SetDia(clickedDate.split("-")[2]);
        SetMesSelect(parseInt(clickedDate.split("-")[1]));
        console.log(clickedDate.split("-")[2]);
        console.log(dia);
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
        for (let i = 0; i < (eventos.length - 1); i++) {
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

    const MontarEvento = () => {
        // Trava a execução se a data não estiver preenchida
        if (!novoeventodia) {
            alert("Por favor, selecione uma data no calendário antes de salvar.");
            return;
        }

        const novoTrabalho = {
            title: nomeEvento,
            date: novoeventodia,
            descricao: descricaoEvento,
            horario: horarioEvento
        };

        axios.post(`${API_URL}/eventos/adicionar`, novoTrabalho)
            .then((response) => {
                Confirmação();
                trocarClasse();
                navigate("/");
                setMudou(!mudou);
            })
            .catch(error => console.log(error));
    };

    const Confirmação = () => {
        Swal.fire(
            'Sucesso!',
            'Um novo item foi criado!',
            'success'
        )
    }

    const [novoClass, SetNovoClass] = useState(false)
    const trocarClasse = (data = null) => {
    SetNovoClass(!novoClass);

    if (data) {
        const dataDayjs = dayjs(data);
        
        // Passa o objeto Dayjs para o calendário MUI não quebrar
        setDataSelecionada(dataDayjs); 

        // Salva a string limpa YYYY-MM-DD para o envio no POST
        setnovoeventodia(dataDayjs.format('YYYY-MM-DD'));
    }
};

    const funcaoCalendario = (x) => {
        if (x) {
            // 1. O calendário recebe o objeto Dayjs puro
            setDataSelecionada(x);

            // 2. A API recebe a string limpa YYYY-MM-DD
            setnovoeventodia(x.format('YYYY-MM-DD'));
        }
    };


    return (

        <div className="cards">


            <div className={novoClass === false ? 'overlayNovoEvento' : 'overlayNovoEvento active'}>
                <div className={"container-data-novo-evento active"}>
                    <div className="titulo">
                        <img src={volta} className="volta" alt="" onClick={trocarClasse} />
                        <h1>Novo Evento</h1>
                    </div>

                    <div className="conteudo-overlay">
                        <div className="calendario-overlay">
                            <div className="titulo-calendario">Qual a data do evento?</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                <DateCalendar
                                    views={['year', 'month', 'day']}
                                    onChange={funcaoCalendario}
                                    value={dataSelecionada}
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
                                        onChange={(x) => { SetNomeEvento(x.target.value) }}

                                    />
                                    <div className="other">
                                        <TextField
                                            required
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            label="Descrição do evento"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            onChange={(x) => { SetDescricaoEvento(x.target.value) }}

                                        />
                                        <TextField
                                            sx={{ width: "40%", }}
                                            required
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            label="Horário do evento"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            onChange={(x) => { SetHorarioEvento(x.target.value) }}

                                        />

                                    </div>


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

            <div className={overlay} onClick={() => trocar()}>
                <div className="container-data">
                    <div className="data">
                        <div className="day-mobile">
                            <div className="mes">{mes[mesSelect - 1]} &nbsp;</div>
                            <div className="dia"> {dia}</div>
                            {isAdmin === true ? <img className="active lixo-mobile" src={lixo} alt="ícone de lixo" onClick={() => Excluir(idEvento)} /> : null}
                        </div>

                        <h1>{titulo}</h1>

                    </div>
                    <p>{descricao}</p>

                </div>
            </div>

            {dias.map((dia) => {
                const eventosDoDia = eventos.filter(e => {
                    if (!e.date) return false;
                    const dataApenasDia = e.date.split('T')[0];
                    return dataApenasDia === dia.dataCompleta;
                });
                return (
                    <div className="card-dia" key={dia.dataCompleta}>
                        <p className="dia-semana">{dia.diaSemana}</p>
                        <h2 className="dia-numero">{dia.diaNumero}</h2>
                        {isAdmin === true ? <img className="active lixo-mobile" src={plus} alt="ícone de lixo" onClick={() => trocarClasse(dia.dataCompleta)} /> : null}
                        <p className="dia-semana">{dia.mes}</p>
                        <div className="eventos-mobile">
                            {eventosDoDia && eventosDoDia.length > 0 ? (
                                eventosDoDia.map(ev => (

                                    <div className="evento" onClick={() => mostra(ev.title, ev.descricao, ev.horario, dia.dataCompleta, ev._id)} key={ev._id}>
                                        <div className="titulo">{ev.title}</div>
                                        <div className="descricao">{ev.descricao}</div>
                                        <div className="horario-delete">
                                            <p className="horario">{ev.horario}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="sem-eventos">Sem Eventos</div>
                            )}
                        </div>

                    </div>
                );
            })}
        </div>
    )
}

export default MobileCalendar