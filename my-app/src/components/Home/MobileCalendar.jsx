import { useState, useContext, useEffect, useRef } from "react"
import axios from "axios";
import { AdminContext, AdminProvider } from "../Login_Contexto/ContextoLogin";
import lixo from "../../assets/img/lixo2.png"


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

    const mostra = (titulo,descricao,horario,info) => {
        SetOverlay('overlayNovoEvento active')

        const clickedDate = info;


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

    return (

        <div className="cards">

            <div className={overlay} onClick={() => trocar()}>
                <div className="container-data">
                    <div className="data">
                        <div className="day-mobile">
                            <div className="mes">{mes[mesSelect - 1]} &nbsp;</div>
                            <div className="dia"> {dia}</div>
                        </div>
                       
                        <h1>{titulo}</h1>
                    </div>
                    <p>{descricao}</p>
                    
                </div>
            </div>

            {dias.map((dia) => {
                const eventosDoDia = eventos.filter(e => e.date === dia.dataCompleta);
                return (
                    <div className="card-dia" key={dia.dataCompleta}>
                        <p className="dia-semana">{dia.diaSemana}</p>
                        <h2 className="dia-numero">{dia.diaNumero}</h2>
                        <p className="dia-semana">{dia.mes}</p>
                        <div className="eventos-mobile">
                            {eventosDoDia && eventosDoDia.length > 0 ? (
                                eventosDoDia.map(ev => (
                                    <div className="evento" onClick={() => mostra(ev.title,ev.descricao,ev.horario,dia.dataCompleta)} key={ev._id}>
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