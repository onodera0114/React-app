import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { Typography } from "@mui/material";
import { memo, useEffect, useState, VFC } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts";
import { db } from "../../../firebase";
import { productList } from "../../../types/productList";

export const ViewChart: VFC = memo(() => {
  const [numberList, setNumberList] = useState<productList[]>([
    {
      docId: "",
      ModelNumber: "",
      name: "",
      number: 0,
    },
  ]);

  useEffect(() => {
    (async () => {
      const q = await query(
        collection(db, "product"),
        orderBy("number", "desc"),
        limit(10)
      );
      const unsub = onSnapshot(q, (snapshot) => {
        setNumberList(
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
  }, []);
  return (
    <>
      <Typography sx={{ fontSize: "24px" }} align="center">
        お問い合わせ件数
      </Typography>
      <ResponsiveContainer width="100%" height="100%" maxHeight={600}>
        <BarChart data={numberList}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: "製品名",
              position: "insideBottom",
              offset: 0,
            }}
          />
          <YAxis
            label={{ value: "件数（件）", angle: -90, position: "insideLeft" }}
            allowDecimals={false}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="number" name="件数" unit="件" fill="#1e90ff" legendType="none" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
});
