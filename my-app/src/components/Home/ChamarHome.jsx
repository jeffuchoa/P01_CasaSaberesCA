import {SobreNos, Footer, ImageSlider, Noticias, BotaoPesquisa, NossosDados } from "./Home"
import Header from "./header"
import Hero from "./Hero"
import Calendar from "./Calendar"
import { SliderData } from "../../ImageSlider/SliderData"

const ChamarHome = () => {
    return (
        <div className="Home">
            <Header />
            <Hero />
            <ImageSlider slides={SliderData} />
            <BotaoPesquisa />
            <SobreNos />
            <Calendar />
            <Noticias />
            <Footer />
        </div>
    )

}

export default ChamarHome