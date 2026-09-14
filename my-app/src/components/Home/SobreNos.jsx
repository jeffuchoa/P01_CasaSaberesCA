import { AcessContext} from "../Login_Contexto/ContextoAcessibilidade";
import { useState, useContext,useEffect,useRef } from "react"
import cegoAderaldo from "../../assets/img/cego2.png";
import AudioPlayer from "./AudioPlayer";

const SobreNos = () => {
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);

    return (
        <div className={acessibilidade? ("sobrenos acessibilidade"): ("sobrenos")}>
            <h1>Sobre nós </h1>
            <p>Ouça o nosso repente</p>
            <AudioPlayer className={acessibilidade? ("acessibilidade"): ("")} />
              
        </div>
    )
}

export default SobreNos