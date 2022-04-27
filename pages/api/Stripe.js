const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const items = req.body
    try {
      const params = {
        submit_type:'pay',
        mode:'payment',
        payment_method_types:['card'],
        billing_address_collection:'auto',
        shipping_options:[
            {shipping_rate:'shr_1Kt0TaAJaHChJ8EShkKBV98r'}, 
            {shipping_rate:'shr_1Kt0UdAJaHChJ8ESKjtC3aLG'}
        ],
        line_items: items.map((item) => {

          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/lshluerb/production/').replace('-webp', '.webp')

          return {
            price_data:{
              currency:'cad',
              product_data:{
                name:item.name,
                images: [newImage]
              },
              unit_amount:item.price*100
            },
            adjustable_quantity:{
              enabled:true,
              minimum:1
            },
            quantity:item.quantity
          }
        })
        ,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled`,
        automatic_tax: {enabled: false},
      }  

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}