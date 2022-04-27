import React, {useRef} from 'react'
import Link from 'next/link'
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import {urlFor} from '../lib/Client'
import getStripe from '../lib/GetStripe'

const Cart = () => {

  const {totalPrice,toggleCartItemQuantity, onRemove, totalQuantities, cartItems, setshowCart} = useStateContext()


  const handleCheckout = async () => {
    const stripe = await getStripe()

    const resp = await fetch('/api/Stripe', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(cartItems)
    })

    if (resp.statusCode == 500) return 
    const data = await resp.json()

    toast.loading('redirecting...')

    stripe.redirectToCheckout({sessionId:data.id})
  }

  const cartRef = useRef()
  return (
    <div className='cart-wrapper' ref={cartRef} >
        <div className="cart-container">
          <button type='button' className='cart-heading' onClick={() => setshowCart(false)}>
             <AiOutlineLeft/> 
             <div className="heading">Your Cart</div>
             <div className="cart-num-items">{totalQuantities} items </div>
             </button>

             {
               cartItems.length < 1? (
                <div className='empty-cart'>
                  <AiOutlineShopping size={150} />
                  <h3>Your Shopping Bag Is Empty</h3>
                  <Link href={'/'}>
                    <button className='btn' onClick={() => setshowCart(false)} >Continue Shopping</button>
                  </Link>
                </div>
               ): (
                 <div className='product-container' >
                   {
                      cartItems?.map((item) => (
                       <div className='product' key={item._id}>
                         { item?.image && <img className='cart-product-image' src={urlFor(item?.image[0])}/>}
                         <div className="item-desc">
                           <div className="flex top">
                             <h5>{item.name}</h5>
                             <h4>${item.price}</h4>
                           </div>
                           <div className="flex bottom">
                             <div>
                              <p className="quantity-desc">
                              <span className="minus" onClick={() =>toggleCartItemQuantity(item._id, 'dec')} ><AiOutlineMinus /></span>
                              <span className="num">{item.quantity}</span>
                              <span className="plus"onClick={() =>toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                              </p>
                               </div>
                               <button type='button' className='remove-item' onClick={() => onRemove(item)}> <TiDeleteOutline/> </button>
                           </div>
                         </div>
                      </div>
                     ))
                   }
                    {cartItems && (
                    <div className='cart-bottom'>
                      <div className="total">
                        <h3>Subtotal:</h3>
                        <h3>${totalPrice}</h3>
                      </div>
                      <div className="btn-container">
                        <button type='button' className='btn' onClick={handleCheckout}>Pay With Stripe</button>
                      </div>
                    </div>
                  )}
                   </div>
               )
             }
        </div>
    </div>
  )
}

export default Cart