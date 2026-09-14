import {Footer, Noticias, BotaoPesquisa, NossosDados } from "./Home";
import Header from "./header";
import Hero from "./Hero";
import ImageSlider from "./ImageSlider";
import SobreNos from "./SobreNos";
import Calendar from "./Calendar";
import { SliderData } from "../../ImageSlider/SliderData";

const ChamarHome = () => {
    return (
        <div className="Home">
            <Header />
            <Hero />
            <ImageSlider slides={SliderData} />
            <BotaoPesquisa />
            <SobreNos />
            <Calendar />
        </div>
    )

}

export default ChamarHome