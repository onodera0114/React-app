import { doc, getDoc } from "@firebase/firestore";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import { currentInquiryState } from "../store/currentInquiry";
import { formatTime } from "../utils/formatTime";

export const useCurrentInquiry = (id: string) => {
  const [currentInquiry, setCurrentInquiry] =
    useRecoilState(currentInquiryState);

  useEffect(() => {
    (async () => {
      const docSnap = await getDoc(doc(db, "inquiry", id));
      if (docSnap.exists()) {
        setCurrentInquiry({
          docId: docSnap.id,
          name: docSnap.data().name,
          email: docSnap.data().email,
          phone: docSnap.data().phone,
          product: docSnap.data().product,
          text: docSnap.data().text,
          timestamp: formatTime(docSnap.data().timestamp.toDate()),
          status: docSnap.data().status,
          staff: docSnap.data().staff,
        });
      }
    })();
  }, [id, setCurrentInquiry]);

  return currentInquiry;
};
