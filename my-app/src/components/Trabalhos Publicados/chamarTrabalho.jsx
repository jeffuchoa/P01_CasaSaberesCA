import React from "react";

import Trabalho from "./Trabalho";
import Footer from "../Home/Footer";
import Header from "../Home/header";

const ChamarTrabalho = () => {
    return(
        <>
            <Header data="scrolled" />
            <Trabalho />
            <Footer />
        </>
        
    )
}

export default ChamarTrabalho