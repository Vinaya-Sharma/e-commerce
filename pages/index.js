import React from 'react'
import {FooterBanner, Product, HeroBanner} from '../components/Index'
import { client } from '../lib/Client'

const index = ({products, banners}) => {
  return (
    <>
    <HeroBanner banner={banners.length &&  banners[0]} />
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Games, toys, and clothing that beat your imagination</p>
    </div>

    <div className='products-container'>
    {
    products?.map((product) => (
      <Product key={product._id} product={product && product}/>
    ))
    }
    </div>

    <FooterBanner banner={banners && banners[0]}/>

    </>
  )
}

export const getServerSideProps = async () => {
  const query = "*[_type=='product']"
  const products = await client.fetch(query)

  const bannerQuery = "*[_type=='banner']"
  const banners = await client.fetch(bannerQuery)

  return {props:{products, banners}}
}

export default index