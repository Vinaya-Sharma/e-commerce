import {loadStripe} from '@stripe/stripe-js'

let stripePromise; 

const getStripePromise = () => {
    if (!stripePromise){
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
}

export default getStripePromise