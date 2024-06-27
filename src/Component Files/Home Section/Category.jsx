import { useEffect } from "react";
import { useState } from "react";
import CardCategory from "./CardCategory";


const Category = () => {
  const [category, setCategory] = useState();
  useEffect(() => {
    // fetch("../../../public/category.json")
    fetch("category.json")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);
  //console.log(category);

  return (
    <div>
      <h1 className="text-center text-[#FFF] text-3xl font-bold border bg-slate-500 w-4/6 m-auto rounded-lg mt-10">
        <marquee> Category for Animals</marquee>
      </h1>
    
       <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 mt-10">
       {
            category?.map(item=> <CardCategory
                 key={item._id}
                 item={item}
            ></CardCategory>)
        }
       </div>
    
    </div>
  );
};

export default Category;
