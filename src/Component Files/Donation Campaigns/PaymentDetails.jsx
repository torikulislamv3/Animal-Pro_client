import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";

const PaymentDetails = () => {
    const item = useLoaderData();
    // console.log(item);
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    return (
        <div>
            <section className="text-center ">
                petName : <span className="text-xl text-blue-700">{item.petName}</span>
                <br />
                <br />

                maxAmount : <span className="text-xl text-yellow-700 font-bold">${item.MaxAmount}</span>
            </section>
           
                    <Elements stripe={stripePromise}>
                        <CheckoutForm item={item.MaxAmount} pet={item}></CheckoutForm>
                    </Elements>
                
        </div>
    );
};

export default PaymentDetails;