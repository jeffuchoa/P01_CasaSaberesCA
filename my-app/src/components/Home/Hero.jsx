import { useState, useContext,useEffect,useRef } from "react"
import heroBack from "../../assets/img/hero-back.webp"
import cegoAderaldo from "../../assets/img/cego2.png"

const Hero = () => {

    return (
        <section className="hero">
            <img className="heroBack" src={heroBack} alt="Imagem de Fundo da sessão inicial do site" />
            <div className="hero-infos">
                <h1>CULTURA <br></br>SABERES <br></br> E TRADIÇÃO</h1>
                <img className="" src={cegoAderaldo} alt="Ilustração do Cego Aderaldo" />
            </div>

        </section>
    )
}

export default Hero