// FOOTER
import { useState, useContext,useEffect,useRef } from "react";
import logoBranca from "../../assets/img/Logo Branca.png";
import Whatssap from "../../assets/img/zap.png";
import Facebook from "../../assets/img/face.png";
import Instagram from "../../assets/img/insta.png";
import axios from "axios";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { AcessContext} from "../Login_Contexto/ContextoAcessibilidade";


const API_URL = import.meta.env.VITE_APP_API_URL;

const Footer = () => {
    const [numeroAcessos, setNumeroAcessos] = useState(0);
    const [trabalhos, SetTrabalhos] = useState(0);
    const [pesquisas, SetPesquisas] = useState(0);

    const [mudou, SetMudou] = useState(false);
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);



    useEffect(() => {
        axios.get(`${API_URL}/trabalhos`)
            .then(response => {
                SetTrabalhos(response.data.length);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`${API_URL}/pesquisas/listar`)
            .then(response => {
                SetPesquisas(response.data.length);
            })
            .catch(error => console.log(error));
    }, []);


    useEffect(() => {
        axios.get(`${API_URL}/listar`)
            .then(response => {
                setNumeroAcessos(response.data[0].numero);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (numeroAcessos !== 0) {
            const novoNumero = numeroAcessos + 1;
            axios.put(`${API_URL}/update/6a8f24bdeb4cd5775afee629`, { numero: novoNumero })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
    }, [numeroAcessos]);

    //   function Number ({n}) {
    //     const{number} = useSpring ({
    //         from: {number:0},
    //         number:n,
    //         delay:200,
    //         config: {mass: 1, tension:20, friction:10},
    //     })
    //     return <animated.div> {number.to((n) => n.toFixed(0))}</animated.div>
    //   }



    return (
        <>

            <div class="wrapper">
                <div class="push"></div>
            </div>
            <div className={acessibilidade? ("rodape_NossosDados acessibilidade"): ("rodape_NossosDados")}>
                <div className="conteudo-container">
                    <div className="noticias-container">
                        {/* Componente de notícias */}
                    </div>
                    <div id="contenedor-nossos-dados" >

                        <div className="calendario-header_Nossos_dados">
                            <h4>Confira nossos </h4>
                            <h1>Resultados!</h1>
                        </div>

                        <div className="dados">

                            <div className="numero">

                                <div
                                    className="numero-acessos"
                                    style={{ fontSize: "60px", fontWeight: "bold" }}
                                >
                                    <ScrollTrigger onEnter={() => SetMudou(true)} onExit={() => SetMudou(false)}>
                                        <p> {mudou && <CountUp start={0} end={pesquisas} duration={2} delay={0} />} </p>
                                    </ScrollTrigger>
                                </div>
                                <p>Pesquisas Realizadas</p>
                            </div>

                            <div className="numero">

                                <div
                                    className="numero-acessos"
                                    style={{ fontSize: "60px", fontWeight: "bold" }}
                                >
                                    <ScrollTrigger onEnter={() => SetMudou(true)} onExit={() => SetMudou(false)}>
                                        <p> {mudou && <CountUp start={0} end={numeroAcessos} duration={2} delay={0} />} </p>
                                    </ScrollTrigger>
                                </div>
                                <p>Acessos no Site</p>
                            </div>

                            <div className="numero">

                                <div
                                    className="numero-acessos"
                                    style={{ fontSize: "60px", fontWeight: "bold" }}
                                >
                                    <ScrollTrigger onEnter={() => SetMudou(true)} onExit={() => SetMudou(false)}>
                                        <p> {mudou && <CountUp start={0} end={trabalhos} duration={2} delay={0} />} </p>
                                    </ScrollTrigger>
                                </div>
                                <p>Trabalhos Publicados</p>
                            </div>
                            <div style={{ clear: "both" }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={acessibilidade? ("cor acessibilidade"): ("cor")}>
                <div className="rodape">
                    <div className="logo">
                        <img src={logoBranca} alt="Logo da casa de saberes branca" />
                    </div>
                    <div className="sessoes">
                        <div className="incio">
                            <h1>Inicio</h1>
                            <a href="">Calendário de eventos</a>
                            <a href="">Notícias</a>
                            <a href="">Publicações</a>
                        </div>
                        <div className="contatos">
                            <h1>Redes Sociais </h1>
                            <div>
                                <img src={Whatssap} alt="Ícone Whattsap" />
                                <img src={Instagram} alt="Ícone Instagram" />
                                <img src={Facebook} alt="Ícone do Facebook" />
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>

        </>
    )
}

export default Footer