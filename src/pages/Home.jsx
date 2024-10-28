import { Helmet } from "react-helmet-async";
import FeaturesSection from "../components/home/FeaturesSection";
import Banner from "./BannerCount";
import FeatureProject from "../components/home/FeatureProject";
import BannerPage from "../components/home/BannerPage";
import HeroSection from "../components/home/HeroSection";




const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Students Project Progess Mangement System</title>
      </Helmet>
      <HeroSection></HeroSection>
<Banner></Banner>
<BannerPage></BannerPage>


<FeatureProject></FeatureProject>
      <FeaturesSection />
     
      
    </main>
  );
};

export default Home;