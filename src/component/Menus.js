import React from "react";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <div className="lg:w-1/4" onClick={() => masukKeranjang(menu)}>
      <div className="max-w-xs overflow-hidden rounded shadow-lg lg:h-72">
        <img
          className="w-full"
          src={`assets/img/${menu.image}`}
          alt={menu.nama}
        />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{menu.nama}</div>
          <p className="text-base text-gray-700">
            Rp. {numberWithCommas(menu.harga)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menus;
