import { Grid, MenuItem, TextField } from "@mui/material";
import { memo, useState, VFC } from "react";
import { Header } from "../organisms/Header";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { validation } from "../../utils/validation";
import { useHistory } from "react-router";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { Loading } from "../atoms/Loading";
import { useProductList } from "../../hooks/productList";
import { useSetRecoilState } from "recoil";
import { inquiryState } from "../../store/inquiry";

export const Contact: VFC = memo(() => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    product: {
      docId: "",
      ModelNumber: "",
      name: "",
    },
    text: "",
  });
  const [message, setMessage] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    text: "",
  });
  const history = useHistory();
  const productList = useProductList();
  const setInquiry = useSetRecoilState(inquiryState);

  const onClickConfirm = () => {
    setLoading(true);
    addDoc(collection(db, "inquiry"), {
      name: values.name,
      email: values.email,
      phone: values.phone,
      product: values.product,
      text: values.text,
      timestamp: serverTimestamp(),
      status: "未対応",
      staff: "未定",
    })
      .then(async (docRef) => {
        const list = productList.find(
          (value) => values.product.docId === value.docId
        );
        if (list !== undefined) {
          updateDoc(doc(db, "product", values.product.docId), {
            number: list.number + 1,
          });
        }
        await setDoc(doc(db, "MessageList", docRef.id), {});
        setInquiry({
          docId: docRef.id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          product: {
            docId: values.product.docId,
            ModelNumber: values.product.ModelNumber,
            name: values.product.name,
          },
          text: values.text,
        });
        history.push("/contact/complete", "contact");
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
      });
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const key: string = event.target.name;

    setValues({ ...values, [key]: value });
    setMessage({ ...message, [key]: validation(key, value) });
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const key: string = event.target.name;

    if (event.target.value === "") {
      setMessage({ ...message, [key]: validation(key, value) });
    }
  };
  const onChangeSelectValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const modelNumber: string = event.target.value;
    const list = productList.find((value) => value.ModelNumber === modelNumber);

    if (list !== undefined) {
      setValues({
        ...values,
        product: {
          docId: list.docId,
          ModelNumber: modelNumber,
          name: list.name,
        },
      });
      setMessage({ ...message, product: validation("product", modelNumber) });
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <Header />
          <form>
            <Grid
              container
              spacing={3}
              sx={{ width: "75%", marginTop: "64px" }}
              alignItems="center"
              mx="auto"
            >
              <Grid item xs={12}>
                <p>お問い合わせ</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="名前"
                  name="name"
                  onChange={onChangeText}
                  onBlur={onBlur}
                  error={message.name !== "" ? true : false}
                  helperText={message.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="メールアドレス"
                  name="email"
                  onChange={onChangeText}
                  onBlur={onBlur}
                  error={message.email !== "" ? true : false}
                  helperText={message.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="電話"
                  name="phone"
                  onChange={onChangeText}
                  onBlur={onBlur}
                  error={message.phone !== "" ? true : false}
                  helperText={message.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-select-currency"
                  select
                  label="製品種別"
                  name="product"
                  defaultValue=""
                  onChange={onChangeSelectValue}
                  onBlur={onBlur}
                  error={message.product !== "" ? true : false}
                  helperText={message.product}
                >
                  {productList.map((option, index) => (
                    <MenuItem key={index} value={option.ModelNumber}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  name="text"
                  label="お問い合わせ内容"
                  multiline
                  rows={10}
                  defaultValue=""
                  onChange={onChangeText}
                  onBlur={onBlur}
                  error={message.text !== "" ? true : false}
                  helperText={message.text}
                />
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton
                  disabled={
                    values.name === "" ||
                    values.email === "" ||
                    values.phone === "" ||
                    values.product.ModelNumber === "" ||
                    values.product.name === "" ||
                    values.text === ""
                  }
                  onClick={onClickConfirm}
                >
                  送信する
                </PrimaryButton>
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
});
