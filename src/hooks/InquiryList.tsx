import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../firebase";
import { userSettingState } from "../store/adminUser";
import { inquiryListState } from "../store/inquiryList";
import { formatTime } from "../utils/formatTime";

export const useInquiryList = () => {
  const userSetting = useRecoilValue(userSettingState);
  const [inquiryList, setInquiryList] = useRecoilState(inquiryListState);

  useEffect(() => {
    (async () => {
      const q = await query(
        collection(db, "inquiry"),
        where("status", "==", userSetting.status),
        orderBy("timestamp", userSetting.filter)
      );
      const unsub = onSnapshot(q, (snapshot) => {
        setInquiryList(
          snapshot.docs.map((doc) => {
            return {
              docId: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              phone: doc.data().phone,
              product: doc.data().product,
              text: doc.data().text,
              timestamp: formatTime(doc.data().timestamp.toDate()),
              status: doc.data().status,
              staff: doc.data().staff,
            };
          })
        );
      });
      return () => {
        unsub();
      };
    })();
  }, [userSetting, setInquiryList]);

  return inquiryList;
};
