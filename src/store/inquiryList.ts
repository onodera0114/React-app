import { atom } from "recoil";
import { inquiry } from "../types/inquiry";

export const inquiryListState = atom<inquiry[]>({
  key: "inquiryList",
  default: [
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
      timestamp: "",
      status: "",
      staff: "",
    },
  ],
});
