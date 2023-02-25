import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Table from "../../components/TransactionTable/Table";

const Trans = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <Table></Table>
      <Footer></Footer>
    </div>
  );
};

export default Trans;
