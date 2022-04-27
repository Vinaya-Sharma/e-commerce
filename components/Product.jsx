import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/Client'

const Product = ({product}) => {
  return (
    <div>
      <Link href={`/product/${product?.slug.current}`} >
        <div className='product-card'>
        <img width={250} height={250} className='product-image' src={urlFor(product.image[0] && product?.image[0])}/>
            <p className="product-name">{product?.name}</p>
            <p className="product-price">${product?.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product