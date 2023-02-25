import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProperty } from "../../redux/property";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProperty());
  }, []);

  const property = useSelector((state) => state.property);

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured data={property} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList data={property} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
