import { Container, Box, Typography, TextField, Button } from "@mui/material"
import casa from '../../assets/img/casa-de-saberes.jpg'
import volta from "../../assets/img/volta2.png"
import { Link } from "react-router-dom"

import { useContext } from "react"
import { useState } from "react";
import { useEffect } from "react";
import {AdminContext, AdminProvider} from "../Login_Contexto/ContextoLogin";


import axios from "axios"


const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [fone, setFone] = useState('');

    const[usuarios,SetUsuarios] = useState ([])

    const { isAdmin, setIsAdmin } = useContext(AdminContext);

    
    useEffect(
        () => {
            axios.get("http://localhost:3001/usuarios/listar")
                .then(
                    (response) => {
                        SetUsuarios(response.data)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )

    const MontarUsuario = () => {
        const novoTrabalho = { nome: nome, email: email, senha: senha, fone:fone, tipo:'user'}
        axios.post("http://localhost:3001/usuarios/adicionar", novoTrabalho)
            .then(
                (response) => {
                    alert(`Trabalho: ${response.data.nome} adicionado!`)

                }
            )
            .catch(error => console.log(error))
    }

    

    const pegarEmail = (event) => {
        setEmail(event.target.value);
    };

    const pegarSenha = (event) => {
        setSenha(event.target.value);
    };


    
    const verificacao = () => {
        
        if (usuarios.find(adm => adm.email == email && adm.tipo == 'adm')) {

            setIsAdmin(true)
            console.log(isAdmin)
        }
    }
 


    return (
        <>
            <div className="login">
                <div className="conteudo">
                    <div className="titulo">
                        <Link to={'/Login'}> <img src={volta} alt="" /> </Link>
                        <h1>Cadastro</h1>
                    </div>

                    <Container className="margem" sx={{paddingLeft:"0px"}}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // alignItems: "center",
                                mt: 10
                            }}
                        >
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                name="Nome"
                                label="Nome"
                                id="senha"
                                onChange={(x) => { setNome(x.target.value) }}
                            />

                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Endereço de e-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={{}}
                                onChange={(x) => { setEmail(x.target.value) }}
                            />
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                name="senha"
                                label="Senha"
                                type="password"
                                id="senha"
                                onChange={(x) => { setSenha(x.target.value) }}
                            />
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                name="Nome"
                                label="Telefone"
                                id="senha"
                                onChange={(x) => { setFone(x.target.value) }}
                            />
                            
                            { }
                            <Link to={'/'}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2, color: "white" }}
                                    onClick={MontarUsuario}
                                    className="botao-envio"
                                >
                                    Cadastrar!
                                </Button>
                            </Link>


                        </Box>
                    </Container>
                </div>

                <div className="image">
                    <img src={casa} alt="" />
                </div>

            </div>

        </>
    )

}

export default Cadastro