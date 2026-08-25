import { useState } from "react"
import { Link, useParams } from "react-router-dom"

// HEADER
import Casa from "../../midia/logo Casa de saberes2.png"

import UsuarioImg from "../../midia/user.png"
import UsuarioImg2 from "../../midia/user2.png"
import Fonte from "./Fonte"
import contrat from "../../midia/contrast.png"
import { AcessContext} from "../Login_Contexto/ContextoAcessibilidade";




// // // IMAGE-SLIDER
import setaEsquerda from "../../midia/left-64.png"
import setaDireita from "../../midia/right-64.png"
import cegoAderaldo from "../../midia/cego2.png"
import { SliderData } from "../../assets/ImageSlider2/SliderData"

// NOTICIAS
import { useEffect } from "react"
import { useRef } from "react"
import image from "../../midia//216151_right_chevron_icon.png"
import rebeca from "../../midia/rebeca.png"
import { AdminContext, AdminProvider } from "../Login_Contexto/ContextoLogin";
import { useContext } from "react"
import { Container, Box, Typography, TextField, Button, Menu } from "@mui/material"
import { FormControl,FormLabel,RadioGroup,FormControlLabel,Radio } from "@mui/material"

import volta from "../../midia/volta2.png"
import { useNavigate } from "react-router-dom"
import AudioPlayer from "./AudioPlayer"
import Swal from 'sweetalert2';
import lix from "../../midia/lixo2.png"
import { FileUploader } from "react-drag-drop-files";



// FOOTER
import logoBranca from "../../midia/Logo Branca.png"
import Whatssap from "../../midia/zap.png"
import Facebook from "../../midia/face.png"
import Instagram from "../../midia/insta.png"
import axios from "axios";
import CountUp from "react-countup"
import ScrollTrigger from "react-scroll-trigger"


// PESQUISA
import lupa from "../../midia/lupa2.png"
import x from "../../midia/volta3.png"
import { Position } from "@react-pdf-viewer/core"

//DADOS


const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);





    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1); //Forma simples de se fazer uma expressão de condição sem precisar dizer explicitamente if e else
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1); //depois do ponto de interogação é como se fosse um "=" que defini o que vai acontecer com o current
    };

    if (!Array.isArray(slides) || slides.length <= 0) { //retornar nulo caso o image slider esteja vázio
        return null;
    }
    const bolinhaCreator = () => {
        let bolinhas = []
        for (let i = 0; i < length; i++) {
            bolinhas.push(<div className={i === current ? 'bolinha active' : 'bolinha'} ></div>)
        }
        return (bolinhas)
    }


    return (
        <div className={acessibilidade? ("image-slider acessibilidade"): ("image-slider")}>
            <div className="pra-traz"><img src={setaEsquerda} alt="Slide anterior do carrosel de imagens" height="40px" onClick={prevSlide} /></div>
            <div className="pra-frente"><img src={setaDireita} alt="Próximo slide do carrosel de imagens" height="40px" onClick={nextSlide} /></div>
            <div className="bolinhas">
                {bolinhaCreator()}
            </div>

            {SliderData.map((slide, index) => {
                return (
                    <>

                        <div className={index === current ? 'slide  conteudo active' : 'slide conteudo '}
                            key={index}>
                            <div
                                className={index === current ? 'slide active' : 'slide'}
                                key={index}
                            >

                                {index === current && (
                                    <img src={slide.image} alt='Imagem do carrosel de imagens' className='image' />
                                )}
                            </div>
                            <div className={index === current ? 'slide texto active' : 'slide texto'}
                                key={index}>
                                <h1 className="content">{slide.titulo}</h1>
                                <p>{slide.descrisao}</p>
                            </div>
                        </div>

                    </>

                );
            })}
        </div>
    );
};

const BotaoPesquisa = () => {
    const [pesquisas, SetPesquisa] = useState([{}])
    const [classe, SetClass] = useState('')
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);




    useEffect(
        () => {
            axios.get("http://localhost:3001/pesquisas/listar")
                .then(
                    (response) => {
                        let pesquisas2 = response.data.slice().reverse()[0]
                        const links = pesquisas2.link.split('=').map(link => link.replace(/"/g, ''));
                        SetPesquisa(links[1])
                        console.log(links[1])
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )
    return (
        <>
            <div className={"overlayNovoEvento " + classe}>
                <div className={"formulario-container " + classe}>
                    <div className="fechar-formulario">
                        <img src={x} alt="" onClick={() => SetClass('')} />
                        <h1>Pesquisa</h1>
                    </div>
                    <iframe src={pesquisas} width="100%" height="90%" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>
                </div>
            </div>

            <div className="caixa-botao">

                <div className={acessibilidade? ("botao active botao-pesquisa acessibilidade"): ("botao active botao-pesquisa")} onClick={() => SetClass('active')}>
                    <img src={lupa} alt="" />
                </div>
            </div>
        </>
    )
}

const Header = () => {

    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);
    const { usuario, logout } = useContext(AdminContext);
    const [active, SetActive] = useState('');

    const Sair = () => {
        logout()
    }

    const Trocar = () => {
        if (active == '') {
            SetActive('active')
        }
        else (SetActive(''))
    }

    return (
        <div className={acessibilidade ? ("header acessibilidade") : ("header")}>
            <div className={acessibilidade ? ("barra-header acessibilidade") : ("barra-header")}>
                <div className="functions">
                    <Fonte />
                    <img className="contraste" style={{ cursor: "pointer" }} src={contrat} alt="Botão Contraste" onClick={() => SetAcessibilidade(!acessibilidade)} />
                </div>
            </div>
            <div className="header-content">
                <Link to={'/'}><img src={acessibilidade ? (logoBranca) : (Casa)} alt="Página inicial" style={{ width: "25%" }} /></Link>
                <div className={acessibilidade ? ("header-functions acessibilidade") : ("header-functions")}>
                    <Link to={'/PaginaPublicacao'}><a > Calendario de Eventos</a></Link>
                    <Link to={'/PaginaPublicacao'}><a > Noticias e Oportunidade</a></Link>
                    <Link to={'/PaginaPublicacao'}><a > Publicações</a></Link>
                    <Link to={'/pesquisas'}><a > Pesquisas</a></Link>
                    <>
                        {usuario ? (
                            <div className="nome-usuario">
                                <p className="nome-usuario" onClick={Trocar}>Olá {usuario.nome} !</p>
                                <div className={"dropdow " + active}>
                                    <p className="sair" onClick={Sair}>Sair</p>
                                </div>
                            </div>
                        ) : (
                            <Link className="user-icon" to={'/Login'}>
                                <img src={acessibilidade ? (UsuarioImg2) : (UsuarioImg)} alt="Login" />
                            </Link>
                        )}
                    </>
                </div>
            </div>
        </div>
    )
}

const SobreNos = () => {
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);

    return (
        <div className={acessibilidade? ("sobrenos acessibilidade"): ("sobrenos")}>
            <div className="conteudo">
                
                <img src={cegoAderaldo} alt="Imagem do cego aderaldo junto com xilogravuras" className="aderaldo"/>
                
                
                <div className="texto">

                    <h4>Casa de saberes</h4>
                    <h1>Sobre nós </h1>
                    <AudioPlayer className={acessibilidade? ("acessibilidade"): ("")} />
                </div>
                <div className="repente">
                    <h1>Letra do Repente</h1>
                    <div className="letra">
                        <h4>Amigo vou te dizer preste aqui atenção,</h4>
                        <h4>vindo la do Crato, o Oásis do Sertão.</h4>
                        <h4>Marcou a história no presente e no passado,</h4>
                        <h4>Nascido em 18 7 8, o famoso Cego Aderaldo.</h4>
                        <h4>Poeta famoso que marcou nossa cultura,</h4>
                        <h4>Saiu do Crato enquanto criança fugindo dessa secura.</h4>
                        <h4>Aos 18 anos na fábrica de algodão,</h4>
                        <h4>Alimentava a fornalha o dia inteiro com carvão,</h4>
                        <h4>Quando em um dia se deu a tal confusão,</h4>
                        <h4>Que nosso poeta então perdeu a sua visão.</h4>
                        <h4>Logo após isso então começa sua carreira,</h4>
                        <h4>Os versos e estrofes se dedicou a vida inteira.</h4>
                        <h4>Sua obra mais famosa “3 lágrimas” é o nome,</h4>
                        <h4>Conta os acontecimentos que marcaram esse homi.</h4>
                        <h4>A primeira veio com a morte de seu pai,</h4>
                        <h4>Já a segunda com a morte de sua mainha,</h4>
                        <h4>A terceira lágrima então só escorreu, com a perda da sua visão</h4>
                        <h4>e também da Angelina.</h4>
                        <h4>Teve mais de 26 filhos mesmo nunca tendo casado,</h4>
                        <h4>Nas suas viagens foi adotando e todos foram criados.</h4>
                        <h4>Foram mais de 70 anos com essa dedicação,</h4>
                        <h4>Que fez orquestra com os filhos e boto cinema no sertão.</h4>
                        <h4>E além disso ainda era comerciante,</h4>
                        <h4>Ficava viajando pá todo canto a todo instante,</h4>
                        <h4>Foi pra tanto lugar que esse homi já visitou,</h4>
                        <h4>Que até na Amazônia o mesmo já até pisou.</h4>
                        <h4>Conheceu tanto lugar e tanta gente diferente,</h4>
                        <h4>Se eu falasse tudo não cabia no repente.</h4>
                        <h4>De Luiz Gonzaga ele foi inspiração,</h4>
                        <h4>Conheceu Rachel de Queiroz, Padre Cícero e até mesmo Lampião,</h4>
                        <h4>É um exemplo de talento e também de superação.</h4>
                        <h4>Pra que esse povo um dia nunca se esqueça,</h4>
                        <h4>Cego Aderaldo aos 89 nos deixou em Fortaleza.</h4>
                        <h4>- Esse caba fez muita coisa mesmo.</h4>
                        <h4>- To te dizendo.</h4>
                        <h4>- E todo esse conhecimento dele, o que aconteceu?</h4>
                        <h4>O que aconteceu com conhecimento eu posso te explicá,</h4>
                        <h4>Ta na Casa de Saberes bem aqui em Quixadá.</h4>
                        <h4>Desde 2017 eles tem essa missão,</h4>
                        <h4>De passar os conhcimentos, a arte e a educação.</h4>
                        <h4>O respeito e a admiração é tanta que nem pode ser contado,</h4>
                        <h4>Se pode até ver no nome “Casa de Saberes Cego Aderaldo.</h4>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

const Noticias = () => {
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);

    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const [data, setData] = useState([]);
    const carousel = useRef(null);
    const navigate = useNavigate()
    const [nomeNoticia, SetNNoticia] = useState('')
    const [linkNoticia, SetLinkNoticia] = useState('')
    const [linkImg, SetLinkImg] = useState('')
    const [mudou, setMudou] = useState(false)
    const [classe, SetClasse] = useState('overlayNoticias')

    const Confirmação = () => {
        Swal.fire(
          'Sucesso!',
          'Um novo item foi criado!',
          'success'
        )
    }

    function deleteTrabalho(id) {
    
        axios.delete(`http://localhost:3001/noticias/delete/${id}`)
          .then(
            (response) => {
              deleteTeste(id)
              setMudou(!mudou)
            }
          )
          .catch(error => console.log(error))
      
    }
  
    function deleteTeste(id) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data.splice(i, 1);
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


    useEffect(
        () => {
            axios.get("http://localhost:3001/noticias/listar")
                .then(
                    (response) => {
                        setData(response.data)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )

    useEffect(
        () => {
            axios.get("http://localhost:3001/noticias/listar")
                .then(
                    (response) => {
                        setData(response.data)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        [mudou]
    )


    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };

    if (!data || !data.length) return null;




    const MontarNoticia = () => {
        SetClasse('overlayNoticias')
        const novoTrabalho = { name: nomeNoticia, link: linkNoticia, image: linkImg }
        axios.post("http://localhost:3001/noticias/adicionar", novoTrabalho)
            .then(
                (response) => {
                    Confirmação()

                    setMudou(!mudou)
                }
            )
            .catch(error => console.log(error))
    }
    return (
        <>
            <div className={classe}>
                <div className="noticiasContainer">
                    <div className="titulo">
                        <img src={volta} alt="" onClick={() => SetClasse('overlayNoticias')} />
                        <h1>Nova Noticia</h1>
                    </div>
                    <Container maxWidth="sm" sx={{ marginLeft: "10%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                position:"relative",
                                // alignItems: "center",
                                mt: 10
                            }}
                        >
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Nome da Notícia"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(x) => { SetNNoticia(x.target.value) }}


                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="senha"
                                label="Insira o link da noticia"
                                id="senha"
                                onChange={(x) => { SetLinkNoticia(x.target.value) }}

                            />

                           
                            <TextField
                                margin="normal"
                                fullWidth
                                name="senha"
                                label="Insira o link da imagem da noticia"
                                id="senha"
                                onChange={(x) => { SetLinkImg(x.target.value) }}

                            />
                            { }

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: "white" }}
                                onClick={MontarNoticia}
                                className="botao-envio"

                            >
                                Criar Noticia
                            </Button>
                           
                        </Box>
                        
                    </Container>
                    
                </div>
            </div>
            <div className={acessibilidade? ("tudos acessibilidade"): ("tudos")}>
                <div className="header-pesquisas">
                    <div className="cabecalho">
                        <h1 className="titulo"> Noticias</h1>
                        <p className="subtitulo">Conjunto de noticias e oportunidades pra você!</p>
                    </div>
                    {isAdmin ? (<div className={isAdmin === true ? 'botao active' : 'botao '} onClick={() => SetClasse('overlayNoticias active')}><p>+ Adicionar Noticia </p></div>) : (null)}
                </div>

                <div className="container">
                    {/* <div className="blur"></div> */}
                    <div className="carousel" ref={carousel}>
                        {data.map((item) => {
                            const { id, name, price, oldPrice, image, link } = item;
                            return (
                                <div className="noticiacomp"> 
                                    <a href={link} className="item" key={id}>
                                    <div className="image">
                                        <div className="filtroVermelho" id="grad1">
                                            <h1>{item.name}</h1>
                                            
                                        </div>
                                        <img src={image} alt={name} />
                                    </div>
                                </a>
                                    <img className={isAdmin === true ? 'lixor' : 'botao-delete '} src={lix} alt="" style={{height:"40px",width:"40px"}} onClick={()=>Excluir(item._id)} />
                                </div>
                                
                            );
                        })}
                    </div>
                    <div className="buttons">
                        <button onClick={handleLeftClick}>
                            <img src={image} />
                        </button>
                        <button onClick={handleRightClick}>
                            <img src={image} alt="Scroll Right" />
                        </button>
                    </div>
                </div>
            </div>


        </>

    );
};

const NossosDados = () => {
    const [numeroAcessos, setNumeroAcessos] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [mudou, SetMudou] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/acessos/listar")
            .then(response => {
                setNumeroAcessos(response.data[0].numero);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (numeroAcessos !== 0) {
            const novoNumero = numeroAcessos + 1;
            axios.put(`http://localhost:3001/acessos/update/649ed67ae5acda81ef1a7609`, { numero: novoNumero })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
    }, [numeroAcessos]);


    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById("contenedor-nossos-dados");
            if (element) {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
                setIsVisible(isVisible);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <></>
        //   <div className="rodape_NossosDados">
        //     <div className="conteudo-container">
        //       <div className="noticias-container">
        //         {/* Componente de notícias */}
        //       </div>
        //       <div id="contenedor-nossos-dados">
        //         {isVisible ? (
        //           <div className="calendario-header_Nossos_dados">
        //             <h1>Confira nossos Resultados</h1>
        //             <p>Pessoas que acessaram nosso site:</p>
        //             <div
        //               className="numero-acessos"
        //               style={{ fontSize: "60px", fontWeight: "bold" }}
        //             >
        //               {numeroAcessos}
        //             </div>
        //           </div>
        //         ) : null}
        //       </div>
        //     </div>
        //   </div>
    );
};


const Footer = () => {
    const [numeroAcessos, setNumeroAcessos] = useState(0);
    const [trabalhos, SetTrabalhos] = useState(0);
    const [pesquisas, SetPesquisas] = useState(0);

    const [mudou, SetMudou] = useState(false);
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);



    useEffect(() => {
        axios.get("http://localhost:3001/acessos/listar")
            .then(response => {
                SetTrabalhos(response.data[1].numero);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/acessos/listar")
            .then(response => {
                SetPesquisas(response.data[2].numero);
            })
            .catch(error => console.log(error));
    }, []);


    useEffect(() => {
        axios.get("http://localhost:3001/acessos/listar")
            .then(response => {
                setNumeroAcessos(response.data[0].numero);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (numeroAcessos !== 0) {
            const novoNumero = numeroAcessos + 1;
            axios.put(`http://localhost:3001/acessos/update/649ed67ae5acda81ef1a7609`, { numero: novoNumero })
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
                                <p>Pessoas alcançadas</p>
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
                        <div className="incio">
                            <h1>Sobre Nós</h1>
                            <a href="">Quem somos?</a>
                            <a href="">Qual a nossa missão</a>
                            <a href="">Participe!</a>
                        </div>
                        <div className="incio">
                            <h1>Fale conosco</h1>
                            <a href="">FAQ</a>
                            <a href="">Telefone</a>
                            <a href="">Chats</a>
                        </div>
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

        </>
    )
}

export { Header, Footer, ImageSlider, SobreNos, Noticias, BotaoPesquisa, NossosDados }