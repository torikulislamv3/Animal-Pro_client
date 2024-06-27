import { useEffect, useState } from "react";
import CardImotion from "./CardImotion";

const Imotion = () => {
    const [emotion, setEmotion] = useState();
    useEffect(()=>{
        // fetch("../../../public/imotion.json")
        fetch("imotion.json")
        .then(res=> res.json())
        .then(data=> setEmotion(data))
    },[])
    return (
        <div>
           <h1 className="text-center text-[#FFF] text-3xl font-bold border bg-slate-500 w-4/6 m-auto rounded-lg mt-10"> <marquee> Emotion for Animals  </marquee> </h1>
           <div>
            {
                emotion?.map(item=> <CardImotion
                key={item._id}
                item={item}
                >

                </CardImotion>)
            }
           </div>
        </div>
    );
};

export default Imotion;