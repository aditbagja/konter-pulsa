import React, { Component } from "react";
import { numberWithCommas } from "../utils/utils";

export default class Hasil extends Component {
  render() {
    const { keranjang } = this.props;
    return (
      <div className="w-full md:w-1/4">
        <h1 className="border-b-2 border-black text-center text-lg font-bold">
          Hasil
        </h1>
        {keranjang.length !== 0 && (
          <ul>
            {keranjang.map((keranjang) => (
              <li
                key={keranjang.id}
                className="flex w-full border-b border-black py-4">
                <div className="mr-3 w-auto">
                  <div className="rounded-full bg-blue-500 p-3">
                    <p className="text-sm text-white">{keranjang.jumlah}</p>
                  </div>
                </div>
                <div className="w-2/4">
                  <h5 className="font-bold">{keranjang.product.nama}</h5>
                  <p className="text-sm">
                    Rp. {numberWithCommas(keranjang.product.harga)}
                  </p>
                </div>
                <div className="w-5/12">
                  <p className="float-right font-bold">
                    Rp. {numberWithCommas(keranjang.total_harga)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
