import React, { Component } from "react";
import CategoryList from "./component/CategoryList";
import Hasil from "./component/Hasil";
import Navigation from "./component/Navigation";
import { API_URL } from "./utils/constants";
import axios from "axios";
import Menus from "./component/Menus";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelected: "Pulsa",
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categorySelected)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      categorySelected: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { menus, categorySelected } = this.state;
    return (
      <>
        <Navigation />
        <div className="container mx-auto mt-3 flex flex-wrap">
          <CategoryList
            changeCategory={this.changeCategory}
            categorySelected={categorySelected}
          />
          <div className="w-full md:w-1/2">
            <h1 className="mb-3 border-b-2 border-black text-center text-lg font-bold">
              Daftar Produk
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {menus.map((menu) => (
                <Menus key={menu.id} menu={menu} />
              ))}
            </div>
          </div>
          <Hasil />
        </div>
      </>
    );
  }
}
