import React from 'react'
import Link from 'next/link'
import {Cart} from './'
import { useStateContext } from '../context/StateContext'

import {AiOutlineShopping} from 'react-icons/ai'

const NavBar = () => {
  const {showCart, setshowCart, totalQuantities} = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'> <Link href='/'>Eastside Technolgies</Link> </p>
      <button onClick={() => setshowCart(true)} type='button' className='cart-icon'> <AiOutlineShopping/>
      <span className='cart-item-qty'>{totalQuantities}</span> 
      </button>
      {showCart && <Cart/>}
    </div>
  )
}

export default NavBar