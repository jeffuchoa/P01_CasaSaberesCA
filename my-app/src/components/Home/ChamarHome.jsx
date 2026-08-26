import { Header, SobreNos, Footer, ImageSlider, Noticias, BotaoPesquisa, NossosDados } from "./Home"
import Calendar from "./Calendar"
import { SliderData } from "../../assets/ImageSlider2/SliderData"

const ChamarHome = () => {
    return (
        <div className="Home">
            <Header />
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