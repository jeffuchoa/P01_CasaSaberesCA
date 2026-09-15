import PaginaPublicacao from "./PaginaPublicacao";
import Footer from "../Home/Footer";
import Header from "../Home/header";

const ChamarPaginaPublicacao = () => {
    return(
        <>
            <Header data="scrolled" />
            <PaginaPublicacao />
            <Footer />
        </>
        
    )
}

export default ChamarPaginaPublicacao