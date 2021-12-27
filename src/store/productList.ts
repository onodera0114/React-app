import { atom } from "recoil";
import { productList } from "../types/productList";

export const productListState = atom<productList[]>({
  key: "productList",
  default: [
    {
      docId: "",
      ModelNumber: "",
      name: "",
      number: 0,
    },
  ],
});
