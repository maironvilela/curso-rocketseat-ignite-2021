import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  const addProduct = async (productId: number) => {


    try {
      //busca na API o produto com o id passado por parametro
      const { data: product } = await api.get<Product>(`products/${productId}`)


      if (!product) {
        throw new Error("Erro na adição do produto")
      }

      const { data: stock } = await api.get<Stock>(`/stock/${productId}`);

      const productFind = cart.find(product => product.id === productId);


      if (productFind) {

        if (productFind.amount >= stock.amount) {
          toast.error("Quantidade solicitada fora de estoque")
          return;
        }

        const productMap = cart.map(product =>
          product.id === productId ? { ...product, amount: product.amount + 1 }
            : product);

        setCart(productMap)
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(productMap))
        toast.info("Quantidade do produto atualizada")
        return;
      }

      if (stock.amount < 1) {
        toast.error("Quantidade solicitada fora de estoque")
        return;
      }
      setCart([...cart, { ...product, amount: 1 }])
      localStorage.setItem('@RocketShoes:cart', JSON.stringify([...cart, { ...product, amount: 1 }]))
      toast.info("Produto adicionado com sucesso")

    } catch (error) {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const isExistProduct = cart.find(product => product.id === productId);

      if (!isExistProduct) {
        throw new Error();
      }

      const newCart = cart.filter(product => product.id !== productId);
      setCart(newCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
      toast.info("Produto removido com sucesso")

    } catch {
      toast.error('Erro na remoção do produto')
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {

      const isExistsProduct = cart.find(product => product.id === productId);

      if (!isExistsProduct) {
        toast.error('Erro na remoção do produto')
      }

      if (amount < 1) {
        toast.error('Quantidade solicitada fora de estoque')
        return;
      }

      const { data: stock } = await api.get<Stock>(`/stock/${productId}`)


      const newCart = cart.map(product => (
        product.id === productId ? { ...product, amount } : product
      ))

      if (amount > stock.amount) {
        toast.error('Quantidade solicitada fora de estoque')
        return;
      }

      setCart(newCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))

    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
