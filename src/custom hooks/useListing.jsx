import { useEffect, useState } from "react";

const useListing = ()=>{
    const [listing, setListing] = useState();
    const [loading, setLoading] =  useState(true);
    useEffect(()=>{
        fetch("../../public/Listing.json")
        .then(res=> res.json())
        .then(data=> {
            setListing(data);
            setLoading(false);
        })
    },[])
    return[listing, loading]

}

export default useListing;