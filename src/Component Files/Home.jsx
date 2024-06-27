import AboutUs from "./Home Section/AboutUs";
import Category from "./Home Section/Category";
import Imotion from "./Home Section/Imotion";
import Question from "./Home Section/Question";
import Slider from "./Home Section/Slider";

const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <Category></Category>
           <Imotion></Imotion>
           <AboutUs></AboutUs>
           <Question></Question>
        </div>
    );
};

export default Home;