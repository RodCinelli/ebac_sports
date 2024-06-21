import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { setProducts } from './features/products/productsSlice'
import { addItem } from './features/cart/cartSlice'
import { GlobalStyle } from './styles'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
  quantity?: number // Torne a propriedade opcional
}

function App() {
  const dispatch = useDispatch()
  const produtos = useSelector((state: RootState) => state.products.items)
  const carrinho = useSelector((state: RootState) => state.cart.items)
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res) => {
        const produtosComQuantidade = res.map((produto: Produto) => ({
          ...produto,
          quantity: 1 // Inicialize a quantidade como 1
        }))
        dispatch(setProducts(produtosComQuantidade))
      })
  }, [dispatch])

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(addItem({ ...produto, quantity: 1 }))
    }
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header itensNoCarrinho={carrinho} favoritos={favoritos} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
