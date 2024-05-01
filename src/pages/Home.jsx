import { Helmet } from "react-helmet-async";
import FeaturesSection from "../components/home/FeaturesSection";
import FAQSection from "../components/home/FAQSection";


const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Students Project Mangement</title>
      </Helmet>

      <FeaturesSection />
      <FAQSection />
      
    </main>
  );
};

export default Home;