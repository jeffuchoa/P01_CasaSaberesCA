import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

const API_URL = import.meta.env.VITE_APP_API_URL

const Trabalho = () => {
  const { id } = useParams()

  const [trabalho, setTrabalho] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [erro, setErro] = useState(null)

  const newplugin = defaultLayoutPlugin()

  useEffect(() => {
    const fetchTrabalho = async () => {
      try {
        const response = await fetch(`${API_URL}/trabalhos/${id}`)
        if (!response.ok) throw new Error("Trabalho não encontrado")
        const data = await response.json()
        setTrabalho(data)
      } catch (error) {
        console.error('Erro ao carregar o trabalho:', error)
        setErro("Não foi possível carregar esse trabalho.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrabalho()
  }, [id])

  if (isLoading) {
    return <div>Carregando Publicação...</div>
  }

  if (erro || !trabalho) {
    return <div>{erro || "Trabalho não encontrado."}</div>
  }

  return (
    <>
      <div className="header-pesquisas2">
        <div className="cabecalho">
          <h1 className="titulo">{trabalho.titulo}</h1>
          <p className="subtitulo">{trabalho.descricao}</p>
        </div>
        <div style={{ width: "70%", marginTop: "5%", marginBottom: "5%" }}>
          <h4 style={{ display: "flex", justifyContent: "center" }}>
            O trabalho será disponibilizado em formato PDF abaixo!
          </h4>
          <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', display: "flex", justifyContent: "center" }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={`${API_URL}/trabalhos/${id}/pdf`} plugins={[newplugin]} />
            </Worker>
          </div>
        </div>
      </div>
    </>
  )
}

export default Trabalho