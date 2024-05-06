import { Helmet } from "react-helmet-async";
import FeaturesSection from "../components/home/FeaturesSection";




const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Students Project Mangement</title>
      </Helmet>

      <FeaturesSection />
    
      
    </main>
  );
};

export default Home;