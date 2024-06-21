import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Container, Titulo, Carrinho } from './styles'

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  return (
    <Container>
      <Titulo>EBAC Sports</Titulo>
      <Carrinho>
        <img src="cesta.png" alt="Carrinho de compras" />
        <span>{cartItems.length}</span>
      </Carrinho>
    </Container>
  )
}

export default Header
