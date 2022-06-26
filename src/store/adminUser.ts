import { OrderByDirection } from "@firebase/firestore";
import { atom } from "recoil";

type setting = {
    status: string;
    filter: OrderByDirection;
}

export const userSettingState = atom<setting>({
  key: "admin/status",
  default: {
    status: "未対応",
    filter: "asc"
  },
});
