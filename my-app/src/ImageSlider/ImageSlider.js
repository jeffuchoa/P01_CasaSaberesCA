import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import left from "../../assets/img/left-64.png"
import right from "../../assets/img/right-64.png"


const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1); //Forma simples de se fazer uma expressão de condição sem precisar dizer explicitamente if e else
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1); //depois do ponto de interogação é como se fosse um "=" que defini o que vai acontecer com o current
  };

  if (!Array.isArray(slides) || slides.length <= 0) { //retornar nulo caso o image slider esteja vázio
    return null;
  }

  return (
    <section className='slider'>
      {SliderData.map((slide, index) => {
        return (
          <>
            <div
              className={index === current ? 'slide active' : 'slide'}
              key={index}
            >
              {index === current && (
                <img src={slide.image} alt='travel image' className='image' />
                
              )}
              <div className='descrisao-slide'>
                <h1>Titulo Slide</h1>
                <p>conteudo do slider, é muito doidinho essa descrição mds que coisa linda eu amo descricoes amo aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa kimsadofimoisadmfoimdfiassssssssssssssssssssssssssssssssssssssss</p>
              </div>
              <div className='pra-frente'><img src= {right} /></div>
            </div>
          
          </>
          
        );
      })}
    </section>
  );
};

export default ImageSlider;