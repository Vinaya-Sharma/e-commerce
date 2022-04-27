import {useState, useEffect, createContext, useContext} from 'react'
import {toast} from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) => {

    const [showCart, setshowCart] = useState(false)
    const [cartItems, setcartItems] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [totalQuantities, settotalQuantities] = useState(0)
    const [qty, setqty] = useState(1)

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkInCart = cartItems.find((item) => item._id === product._id)
        const others = cartItems.filter((item) => {item?._id !== product?._id})
        settotalPrice((prevPrice) => prevPrice + quantity*product.price)
        settotalQuantities((precQty) => precQty + quantity )

        if (checkInCart){
            const updatedCartItems = [...others, {...checkInCart, quantity: checkInCart.quantity+quantity }]
            setcartItems(updatedCartItems)
        } else {
                product.quantity = quantity
                setcartItems([...cartItems, {...product}])
        }

        toast.success(`${quantity} ${product.name} added to cart`)
    }

    const toggleCartItemQuantity = ((id, value) => {
        foundProduct = cartItems.find((item) => item?._id === id)
        index = cartItems.findIndex((product) => product._id ===id)
 
        const newCartItems = cartItems.filter((item) => item._id!==id)
        if (value === 'inc'){
            setcartItems([...newCartItems, {...foundProduct, quantity:foundProduct.quantity+1}])
            settotalPrice((prevPrice) => prevPrice+=foundProduct.price)
            settotalQuantities((prevTotal) => prevTotal+=1)
        } else if (value === 'dec'){
            if (foundProduct.quantity>1){
            setcartItems([...newCartItems, {...foundProduct, quantity:foundProduct.quantity-1}])
            settotalPrice((prevPrice) => prevPrice-=foundProduct.price)
            settotalQuantities((prevTotal) => prevTotal-=1)
        }
        }
    })

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        setcartItems(cartItems.filter((item) => item._id !== product._id))
        settotalPrice((prevPrice) => prevPrice-foundProduct.price*foundProduct.quantity)
        settotalQuantities((prevQty) => prevQty-foundProduct.quantity)
    }

    const incQty = () => {
        setqty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setqty((prevQty) => {
            if (prevQty == 1 ) return 1  
            return prevQty - 1})
    }

    return (
            <Context.Provider value={{
                showCart,onRemove,toggleCartItemQuantity,setshowCart, setcartItems,   settotalPrice,       settotalQuantities, showCart, cartItems, totalPrice, totalQuantities, qty, incQty, decQty, onAdd
            }} >
                {children}
            </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)