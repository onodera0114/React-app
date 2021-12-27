import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import { productListState } from "../store/productList";

export const useProductList = () => {
  const [productList, setProductList] = useRecoilState(productListState);

  useEffect(() => {
    (async () => {
      const q = await query(
        collection(db, "product"),
        orderBy("ModelNumber", "asc")
      );
      const unsub = onSnapshot(q, (snapshot) => {
        setProductList(
          snapshot.docs.map((doc) => {
            return {
              docId: doc.id,
              ModelNumber: doc.data().ModelNumber,
              name: doc.data().name,
              number: doc.data().number,
            };
          })
        );
      });
      return () => {
        unsub();
      };
    })();
  }, [setProductList]);

  return productList ;
};
