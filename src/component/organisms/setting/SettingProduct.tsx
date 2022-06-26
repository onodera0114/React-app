import { Grid, TextField, Typography, Card, CardContent } from "@mui/material";
import { memo, useState, VFC } from "react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../../firebase";
import { ProductTable } from "../../molecules/ProductTable";
import { useProductList } from "../../../hooks/productList";

type product = {
  ModelNumber: string;
  name: string;
};

export const SettingProduct: VFC = memo(() => {
  const [newProduct, setNewProduct] = useState<product>({
    ModelNumber: "",
    name: "",
  });
  const productList = useProductList();
  const [error, setError] = useState<string>("");
  const [selected, setSelected] = useState<number[]>([]);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const key: string = event.target.name;

    setNewProduct({
      ...newProduct,
      [key]: value,
    });
    key === "ModelNumber" && setError(checkModelNumber(value));
  };

  const checkModelNumber = (model: string) => {
    return productList.find((value) => value.ModelNumber === model)
      ? "登録されている型番です"
      : "";
  };

  const onClickAddProduct = () => {
    addDoc(collection(db, "product"), {
      ModelNumber: newProduct.ModelNumber,
      name: newProduct.name,
      number: 0,
    })
      .then(async (docRef) => {
        alert("追加しました");
        setNewProduct({
          ModelNumber: "",
          name: "",
        });
      })
      .catch((e) => {
        alert("追加できませんでした");
      });
  };

  return (
    <>
      <Typography sx={{ fontSize: "24px" }} align="center">
        製品管理
      </Typography>
      <Card variant="outlined" sx={{ margin: "20px 0" }}>
        <CardContent>
          <Grid
            container
            spacing={3}
            alignItems="center"
            mx="auto"
            sx={{ width: "100%" }}
          >
            <Grid item xs={12}>
              <Typography sx={{ fontSize: "20px" }}>製品追加</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="型番"
                name="ModelNumber"
                value={newProduct.ModelNumber}
                onChange={onChangeText}
                error={error !== "" ? true : false}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="製品名"
                name="name"
                value={newProduct.name}
                onChange={onChangeText}
              />
            </Grid>

            <Grid item xs={12}>
              <PrimaryButton
                disabled={
                  newProduct.ModelNumber === "" ||
                  newProduct.name === "" ||
                  error !== ""
                }
                onClick={onClickAddProduct}
              >
                追加
              </PrimaryButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ProductTable
        productList={productList}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
});
