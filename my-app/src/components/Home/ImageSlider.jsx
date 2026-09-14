import { useState, useContext,useEffect,useRef } from "react"
import { AcessContext} from "../Login_Contexto/ContextoAcessibilidade";

import setaEsquerda from "../../assets/img/left-64.png"
import setaDireita from "../../assets/img/right-64.png"
import cegoAderaldo from "../../assets/img/cego2.png"
import { SliderData } from "../../ImageSlider/SliderData"

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

            <div className="bolinhas">
                {bolinhaCreator()}
            </div>
        </div>
    );
};

export default ImageSlider