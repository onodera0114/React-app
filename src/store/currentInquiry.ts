import { atom } from "recoil";
import { inquiry } from "../types/inquiry";

export const currentInquiryState = atom<inquiry>({
  key: "currentInquiryList",
  default: {
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
});
