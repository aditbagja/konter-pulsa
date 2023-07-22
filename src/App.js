import React, { Component } from "react";
import CategoryList from "./component/CategoryList";
import Hasil from "./component/Hasil";
import Navigation from "./component/Navigation";
import { API_URL } from "./utils/constants";
import axios from "axios";
import Menus from "./component/Menus";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelected: "Pulsa",
      keranjang: [],
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

    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjang !== prevState.keranjang) {
      axios
        .get(API_URL + "keranjang")
        .then((res) => {
          const keranjang = res.data;
          this.setState({ keranjang });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjang?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjang", keranjang)
            .then((res) => {
              swal({
                title: "Sukses",
                text: keranjang.product.nama + " Sukses masuk keranjang",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjang/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses",
                text: keranjang.product.nama + " Sukses masuk keranjang",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { menus, categorySelected, keranjang } = this.state;
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
                <Menus
                  key={menu.id}
                  menu={menu}
                  masukKeranjang={this.masukKeranjang}
                />
              ))}
            </div>
          </div>
          <Hasil keranjang={keranjang} />
        </div>
      </>
    );
  }
}
