import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobile,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Pulsa")
    return <FontAwesomeIcon icon={faMobile} className="mr-5" />;
  if (nama === "Paket Data")
    return <FontAwesomeIcon icon={faArrowRightArrowLeft} className="mr-5" />;

  return <FontAwesomeIcon icon={faMobile} className="mr-5" />;
};

export default class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catogories: [],
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categorySelected } = this.props;
    return (
      <div className="w-full md:w-1/4">
        <h1 className="border-b-2 border-black text-center text-lg font-bold">
          Daftar Kategori
        </h1>
        <ul className="mt-3 w-full rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900">
          {categories &&
            categories.map((category) => (
              <li
                key={category.id}
                className={`w-full cursor-pointer rounded-lg border-b border-gray-200 px-4 py-2 hover:bg-blue-800 hover:text-white ${
                  categorySelected === category.nama && "category-active"
                }`}
                onClick={() => changeCategory(category.nama)}
              >
                <p className="text-lg">
                  <Icon nama={category.nama} />
                  {category.nama}
                </p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
