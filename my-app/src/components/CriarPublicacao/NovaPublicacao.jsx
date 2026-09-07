import { Container, Box, TextField, Button, FormLabel } from "@mui/material"
import volta from "../../assets/img/volta2.png"
import beija from "../../assets/img/beija.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import Swal from "sweetalert2"
import api from "../../api/axios"

const NovaPublicacao = () => {
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [pdf, setPdf] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState('')

    const navigate = useNavigate()

    const fileTypesPdf = ["PDF"]
    const fileTypesImagem = ["JPG", "PNG", "JPEG"]

    const publicar = async () => {
        if (!titulo || !autor || !descricao || !pdf || !thumbnail) {
            setErro('Preencha todos os campos e selecione os dois arquivos.')
            return
        }

        setErro('')
        setEnviando(true)

        try {
            const formData = new FormData()
            formData.append('titulo', titulo)
            formData.append('autor', autor)
            formData.append('descricao', descricao)
            formData.append('pdf', pdf)
            formData.append('thumbnail', thumbnail)

            await api.post('/trabalhos', formData)

            Swal.fire('Sucesso!', 'Um novo trabalho foi publicado!', 'success')
            navigate('/PaginaPublicacao')
        } catch (error) {
            console.error(error)
            setErro('Não foi possível publicar. Tente novamente.')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <>
            <div className="nova-publicacao">
                <div className="conteudo">
                    <div className="titulo">
                        <Link to={'/PaginaPublicacao'}> <img src={volta} alt="" /> </Link>
                        <h1>Nova Publicação</h1>
                    </div>

                    <Container maxWidth="md">
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", mt: 10 }}>
                            <TextField
                                sx={{ mt: "2%" }}
                                required
                                margin="normal"
                                fullWidth
                                label="Título da publicação"
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <TextField
                                sx={{ mt: "2%" }}
                                required
                                margin="normal"
                                fullWidth
                                label="Autor do trabalho"
                                onChange={(e) => setAutor(e.target.value)}
                            />
                            <TextField
                                sx={{ mt: "2%" }}
                                required
                                margin="normal"
                                fullWidth
                                label="Descrição da publicação"
                                onChange={(e) => setDescricao(e.target.value)}
                            />

                            <FormLabel sx={{ mt: "5%" }}>Imagem de capa (thumbnail)</FormLabel>
                            <FileUploader handleChange={setThumbnail} name="thumbnail" types={fileTypesImagem} />
                            <h5>{thumbnail ? `Arquivo: ${thumbnail.name}` : "Nenhum arquivo selecionado"}</h5>

                            <FormLabel sx={{ mt: "5%" }}>Arquivo PDF da publicação</FormLabel>
                            <FileUploader handleChange={setPdf} name="pdf" types={fileTypesPdf} />
                            <h5>{pdf ? `Arquivo: ${pdf.name}` : "Nenhum arquivo selecionado"}</h5>

                            {erro && <p style={{ color: "red" }}>{erro}</p>}

                            <Button
                                className="botao-envio"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: "white" }}
                                onClick={publicar}
                                disabled={enviando}
                            >
                                {enviando ? "Publicando..." : "Publicar"}
                            </Button>
                        </Box>
                    </Container>
                </div>
                <div className="image-nova"><img src={beija} alt="" /></div>
            </div>
        </>
    )
}

export default NovaPublicacao