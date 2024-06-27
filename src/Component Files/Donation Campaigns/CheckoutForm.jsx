import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../custom hooks/useAxios";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const CheckoutForm = (item, pet) => {
  console.log(pet);
  console.log(item);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState();
  const {user} =  useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosHook = useAxios();
  // const totalPrice = 200;
  const totalPrice = item.item;
  console.log(totalPrice);

  useEffect(() => {
    axiosHook
      .post("/payment-intent-stripe", { price: totalPrice })
      .then((res) => {
        //console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosHook, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //console.log("payment error", error);
      setError(error.message);
    } else {
      //console.log("payment method", paymentMethod);
      setError("");

      // confirm payment
      const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card : card,
            billing_details: {
                email : user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
      });

      if(confirmError){
        //console.log('confirm error', confirmError);
      }
      else{
        //console.log('payment intent',paymentIntent);
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your payment has been success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    // this is method for post donation details by button
    const email = user?.email;
    const petImg = item.pet.petImage;
    const petName = item.pet.petName;
    const owner_email = item.pet.owner_email;
    const donatedAmount = item.item;
    const donatedItem = {
      email:email,
      petImg:petImg,
      petName:petName,
      owner_email:owner_email,
      donatedAmount:donatedAmount
    }
    console.log(donatedItem);




    fetch('http://localhost:5000/donation', {
      method : 'POST',
      headers :  {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(donatedItem)
  })
  .then(res=> res.json())
.then(data=>{
  console.log(data);
})



  };

  return (
    <form className="bg-black" onSubmit={handleSubmit}>
      <h2 className="text-white text-center pt-10 text-xl font-bold">Pay For :{item.item}</h2>
      <section>
      

        <h1 className="text-2xl text-yellow-800 font-bold text-center my-6">
          Payment Your Donation
        </h1>

        
      </section>
      <CardElement
        className="px-10"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },

            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        onClick={handleSubmit}
        className="btn btn-primary btn-sm my-9 mx-20"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-700">{error}</p>
    </form>
  );
};

export default CheckoutForm;
