import { Container, Box, Typography, TextField, Button } from "@mui/material"
import casa from '../../assets/img/casa-de-saberes.jpg'
import volta from "../../assets/img/volta2.png"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { useState } from "react";
import { useEffect } from "react";
import {AdminContext,AdminProvider} from "../Login_Contexto/ContextoLogin";
import api from "../../api/axios"


import axios from "axios"


const Signin = () => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const { login } = useContext(AdminContext)
    const navigate = useNavigate()

    const fazerLogin = async () => {
        try {
        const response = await api.post('/usuarios/login', { email, senha })
        login(response.data.token, response.data.usuario)
        navigate('/')
        } catch (error) {
        setErro('Email ou senha inválidos')
        }
    }

    const pegarEmail = (event) => {
        setEmail(event.target.value);
    };

    const pegarSenha = (event) => {
        setSenha(event.target.value);
    };


    return (
        <>
            <div className="login">
                <div className="conteudo">
                    <div className="titulo">
                        <Link to={'/'}> <img src={volta} alt="" /> </Link>
                        <h1>Login</h1>
                    </div>

                    <Container maxWidth="md" className="margem">
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
                                id="email"
                                label="Endereço de e-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={{}}
                                onChange={pegarEmail}
                            />
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                name="senha"
                                label="Senha"
                                type="password"
                                id="senha"
                                onChange={pegarSenha}
                            />
                            { }
                            <Link>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2, color: "white" }}
                                    onClick={fazerLogin}
                                    className="botao-envio"
                                >
                                    Sign In
                                </Button>
                            </Link>


                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                                width="100%"
                            >

                                <Link
                                    href="#"
                                    underline="none"
                                    className="link"
                                    fontSize={"15px"}
                                    to={"/cadastro"}
                                >
                                    Não tem conta? Cadastre-se.
                                </Link>
                            </Box>
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

export default Signin