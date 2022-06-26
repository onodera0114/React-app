import { atom } from "recoil";

type inquiry = {
  docId: string;
  name: string;
  email: string;
  phone: string;
  product: {
    docId: string;
    ModelNumber: string;
    name: string;
  },
  text: string;
}

export const inquiryState = atom<inquiry>({
  key: "inquiry",
  default:
  {
    docId: "",
    name: "",
    email: "",
    phone: "",
    product: {
      docId: "",
      ModelNumber: "",
      name: "",
    },
    text: "",

  },
});
