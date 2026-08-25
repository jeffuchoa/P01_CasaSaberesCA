import { Container, Box, Typography, TextField, Button, FormControl,FormLabel,RadioGroup,FormControlLabel,Radio } from "@mui/material"
import casa from '../../midia/casa-de-saberes.jpg'
import volta from "../../midia/volta2.png"
import beija from "../../midia/beija.png"
import { Link } from "react-router-dom"

import { useContext, useEffect } from "react"
import { useState } from "react";
import { publicacoes2 } from "./publicacoes"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2"

const NovaPublicacao = () => {
    const [titulo, setNome] = useState('');
    const [descricao, setDescricaoe] = useState('aaaaaa');
    const [publico, setPublico] = useState(true);
    const [numeroAcessos, setNumeroAcessos] = useState(0);
    const [novotrabalho2,SetNovoTrabalho2] = useState(true);
    const navigate = useNavigate()


    const Confirmação = () => {
      Swal.fire(
        'Sucesso!',
        'Um novo item foi criado!',
        'success'
      )
  }

    const pegarNome = (event) => {
        setNome(event.target.value);
    };

    function handleSubmit() {
        
        SetNovoTrabalho2(false)
        console.log(novotrabalho2)
        const novoTrabalho = { titulo, descricao, publico:acesso,linkPdf:caminhoLink, linkImage:caminhoImagem }
        axios.post("http://localhost:3001/trabalhos/adicionar", novoTrabalho)
            .then(
                (response) => {
                    
                    Confirmação()
                    navigate("/PaginaPublicacao")
                    
                }
            )
            .catch(error => console.log(error))
    }
    useEffect(() => {
        axios.get("http://localhost:3001/acessos/listar")
          .then(response => {
            setNumeroAcessos(response.data[1].numero);
            console.log(response.data[1].numero)
          })
          .catch(error => console.log(error));
      }, []);

    useEffect(() => {
        if (numeroAcessos !== 0) {
          const novoNumero = numeroAcessos + 1;
          axios.put(`http://localhost:3001/acessos/update/64a04531194652b31b25b012`, { numero: novoNumero })
            .then(response => {
              
            })
            .catch(error => console.log(error));
        }
      }, [novotrabalho2]);

    const [acesso,SetAcesso] = useState ()

    useEffect(
        () =>{
            console.log(acesso)
        }
        ,
        [acesso]
    )
    const [file, setFile] = useState(null);
    const [caminhoImagem, setCaminhoImagem] = useState('');
    const [caminhoLink, setCaminhoLink] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const HandleSubmit = async (x) => {
    // handleSubmit()
    try {
      const formData = new FormData();

      formData.append('pdf', File);

      await axios.post("http://localhost:3001/save-image", formData)
        .then(response => {
          // Atualize o estado com o caminho da imagem
          setCaminhoImagem(response.data.caminhoImagem);
          console.log('AAAAAAAAAA' + caminhoImagem);
          SetNovoTrabalho2(false)
          console.log(novotrabalho2)
          const novoTrabalho = { titulo, descricao, publico: acesso, linkPdf: x, linkImage: response.data.caminhoImagem }
          axios.post("http://localhost:3001/trabalhos/adicionar", novoTrabalho)
            .then(
              (response) => {

                Confirmação()
                navigate("/PaginaPublicacao")

              }
            )
            .catch(error => console.log(error))
        })
        .catch(error => {
          console.error('Erro ao enviar a imagem:', error);
        });

      // Sucesso no upload
      console.log('Imagem enviada com sucesso!');
    } catch (error) {
      // Tratar erros
      console.error('Erro ao enviar a imagem:', error);
    }


  };

  const Linke = async () => {
    // handleSubmit()
    try {
      const formData = new FormData();
      
      formData.append('pdf', Image);

      await axios.post("http://localhost:3001/save-image", formData)
      .then(response => {
        // Atualize o estado com o caminho da imagem
        setCaminhoLink(response.data.caminhoImagem);
        HandleSubmit(response.data.caminhoImagem)
        console.log('AAAAAAAA' + caminhoLink);
      })
      .catch(error => {
        console.error('Erro ao enviar a imagem:', error);
      });

      // Sucesso no upload
      console.log('Imagem enviada com sucesso!');
    } catch (error) {
      // Tratar erros
      console.error('Erro ao enviar a imagem:', error);
    }
    
  };

  const Montar = () => {
    Linke()
  }
    

    const fileTypes = ["JPG", "PNG", "GIF","PDF", "JPEG"];

    
    const [File, SetFile] = useState(null);
    const [Image, SetImage] = useState(null);

    const handleChange = (file) => {
        SetFile(file);
        
    };
    const handleImage = (file) => {
        SetImage(file);
        
    };
    
    
    return (
        <>
            <div className="nova-publicacao">
                
                <div className="conteudo">
                    <div className="titulo">
                        <Link to={'/PaginaPublicacao'}> <img src={volta} alt="" /> </Link>
                        <h1>Nova Publicação</h1>
                    </div>

                    <Container maxWidth="md" >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // alignItems: "center",
                                mt: 10
                            }}
                        >   <FormLabel >Adicione uma imagem de capa ( Opcicional )</FormLabel>
                            <FileUploader handleChange={handleChange} name="File" types={fileTypes} />
                            <h5 >{File ? `Nome da imagem: ${File.name}` : "Nenhum arquivo foi inserido"}</h5>
                            <TextField 
                                sx={{mt:"8%"}}
                                required
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Coloque o nome da sua publicação"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={pegarNome}
                            />
                            <TextField sx={{mt:"2%"}}
                                required
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Digite uma descrição para a publicação"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(x)=> {setDescricaoe(x.target.value)}}
                            />
                            <FormControl sx={{mt:"2%"}}>
                                <FormLabel id="demo-radio-buttons-group-label">Escolha o tipo de acesso</FormLabel>
                                
                                <RadioGroup
                                    className="radius"
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="publico" control={<Radio />} label="Público" onClick={(select) => SetAcesso(true) } />
                                    <FormControlLabel value="privado" control={<Radio />} label="Privado" onClick={(select) => SetAcesso(false) }/>
                                </RadioGroup>
                            </FormControl>
                            <FormLabel sx={{mt:"5%"}}  >Adicione o arquivo PDF da publicação</FormLabel>
                            <FileUploader id ="id" handleChange={handleImage} name="File" types={fileTypes} />
                            <h5>{Image ? `Nome do Arquivo: ${Image.name}` : "Nenhum arquivo foi inserido"}</h5>

                            {/* <Link to={'/PaginaPublicacao'} > */}
                                <Button
                                    className="botao-envio"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, color: "white" }}
                                    onClick={Montar}
                                >
                                    Publicar
                                </Button>
                            {/* </Link> */}
                        </Box>
                    </Container>
                </div>
                <div className="image-nova"><img src={beija} alt="" /></div>
            </div>

        </>
    )
}

export default NovaPublicacao