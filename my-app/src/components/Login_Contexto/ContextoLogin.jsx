import React, { createContext, useState, useEffect } from 'react'

const AdminContext = createContext()

const AdminProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const tokenSalvo = localStorage.getItem('token')
    const usuarioSalvo = localStorage.getItem('usuario')

    if (tokenSalvo && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }
    setCarregando(false)
  }, [])

  const login = (token, dadosUsuario) => {
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario))
    setUsuario(dadosUsuario)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  const isAdmin = usuario?.tipo === 'adm'

  return (
    <AdminContext.Provider value={{ usuario, isAdmin, login, logout, carregando }}>
      {children}
    </AdminContext.Provider>
  )
}

export { AdminContext, AdminProvider }