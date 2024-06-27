import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
        
    <div className="">
    <img className="lg:h-[350px] text-center m-auto" src="https://i.ibb.co/1XD2cyF/monitor-1350918-1280.png" alt="Finding..." />
    </div>
     <p className="text-center">
       <Link to="/"><button className="btn btn-link text-3xl font-bold">Go To Home</button></Link>
     </p>
     <p className="text-4xl">
       <i>{error.statusText || error.message}</i>
     </p>
   </div>
  );
}