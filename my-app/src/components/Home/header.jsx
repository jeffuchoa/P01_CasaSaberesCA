import { useState, useContext,useEffect,useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { AcessContext} from "../Login_Contexto/ContextoAcessibilidade";
import { AdminContext, AdminProvider } from "../Login_Contexto/ContextoLogin";
import Fonte from "./Fonte"

import menuIcon from "../../assets/img/menu-preto.png"
import menuIconVer from "../../assets/img/menu-ver.png"
import menuIconBran from "../../assets/img/menu-branco.png"
import fecharIcon from "../../assets/img/fechar-icon.png"
import contrat from "../../assets/img/contrast.png"
import Casa from "../../assets/img/logo-casa-saberes-preto.png"
import CasaBranca from "../../assets/img/Logo Branca.png"
import UsuarioImg from "../../assets/img/user.png"
import UsuarioImg2 from "../../assets/img/user2.png"

const Header = () => {
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);
    const { usuario, logout } = useContext(AdminContext);
    const [ MenuVar, SetManuVar ] =  useState('');
    const [active, SetActive] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    const Sair = () => {
        logout()
    }

    const Trocar = () => {
        if (active == '') {
            SetActive('active')
        }
        else (SetActive(''))
    }

    const MenuMobile = () => {
        SetManuVar(prevActive => (prevActive === '' ? 'active' : ''));
    };

    useEffect(() => {
        const handleScroll = () => {
            // Se a rolar a página mais de 20px, ativa a classe (pode ajustar esse valor)
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Adiciona o ouvinte de scroll quando o componente é montado
        window.addEventListener('scroll', handleScroll);

        // Limpa o ouvinte ao desmontar para evitar vazamento de memória
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        }, 
    []);

    return (
        <div className={`header ${acessibilidade ? 'acessibilidade' : ''} ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-content">
                <Link to={'/'}><img src={isScrolled ? (Casa) : (CasaBranca)} alt="Página inicial" style={{ height: "50px" }} /></Link>
                <div className="header-infos">
                    <div className={`filtro ${MenuVar}`} onClick={MenuMobile}></div>

                    <div className={`header-functions ${isScrolled ? 'scrolled' : ''} ${acessibilidade ? 'acessibilidade' : ''} ${MenuVar}`} >
                        <Link to={'/PaginaPublicacao'}><a > Calendario de Eventos</a></Link>
                        <Link to={'/PaginaPublicacao'}><a > Publicações</a></Link>
                        <Link to={'/pesquisas'}><a > Pesquisas</a></Link>
                        <>
                            {usuario ? (
                                <div className="nome-usuario">
                                    <p className={`nome-usuario ${isScrolled ? 'scrolled' : ''}`} onClick={Trocar}>Olá {usuario.nome} !</p>
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

                        <img className="fechar-icon" src={fecharIcon} onClick={MenuMobile} alt="Fechar Menu" />

                    </div>

                    <div className={acessibilidade ? ("barra-header acessibilidade") : ("barra-header")}>
                        <div className="functions">
                            <Fonte />
                            <img className="contraste" style={{ cursor: "pointer" }} src={contrat} alt="Botão de Contraste" onClick={() => SetAcessibilidade(!acessibilidade)} />
                        </div>
                    </div>

                    <img className="menu-header" onClick={MenuMobile} src={isScrolled ? (menuIconVer) : (menuIconBran)} alt="menu do site" />

                </div>
                
            </div>
        </div>
    )
}

export default Header