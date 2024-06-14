import { Helmet } from "react-helmet-async";
import FeaturesSection from "../components/home/FeaturesSection";
import Banner from "./BannerCount";
import FeatureProject from "../components/home/FeatureProject";




const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Students Project Mangement</title>
      </Helmet>
<Banner></Banner>

<FeatureProject></FeatureProject>
      <FeaturesSection />
     
      
    </main>
  );
};

export default Home;