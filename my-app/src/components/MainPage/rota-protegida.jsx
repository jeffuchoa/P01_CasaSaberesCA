import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminContext } from '../Login_Contexto/ContextoLogin'

function RotaProtegida({ children }) {
  const { isAdmin, carregando } = useContext(AdminContext)

  if (carregando) return <div>Carregando...</div>
  if (!isAdmin) return <Navigate to="/" />

  return children
}

export default RotaProtegida