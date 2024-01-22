import { Helmet } from "react-helmet-async";
import FeaturesSection from "../components/home/FeaturesSection";
import FAQSection from "../components/home/FAQSection";


const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Student Project Mangement  - Let&apos;s Study Together!</title>
      </Helmet>

      <FeaturesSection />
      <FAQSection />
      
    </main>
  );
};

export default Home;