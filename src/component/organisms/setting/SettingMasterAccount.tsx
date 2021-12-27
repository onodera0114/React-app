import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { memo, useState, VFC } from "react";
import { password } from "../../../types/password";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { InputPassword } from "../../atoms/textfield/InputPassword";

export const SettingMasterAccount: VFC = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<password>({
    password: "",
    showPassword: false,
  });
  const [checkPassword, setCheckPassword] = useState<password>({
    password: "",
    showPassword: false,
  });
  const auth = getAuth();

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };
  const onClickAddStaff = () => {
    createUserWithEmailAndPassword(auth, email, password.password)
    .then((userCredential) => {
      alert("追加")
    })
    .catch((error) => {
      alert("追加できない")
    });
  }

  return (
    <>
      <Card variant="outlined" sx={{margin: "20px 0"}}>
        <CardContent>
          <Grid
            container
            spacing={3}
            alignItems="center"
            mx="auto"
            sx={{ width: "100%" }}
          >
            <Grid item xs={12}>
              <Typography sx={{ fontSize: "20px" }}>スタッフ追加</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="メールアドレス"
                name="email"
                onChange={onChangeText}
              />
            </Grid>
            <Grid item xs={12}>
              <InputPassword
                password={password}
                setPassword={setPassword}
                label="パスワード"
              />
            </Grid>
            <Grid item xs={12}>
              <InputPassword
                password={checkPassword}
                setPassword={setCheckPassword}
                label="パスワード(確認用)"
                id="outlined-adornment-check-password"
              />
            </Grid>
            <Grid item xs={12}>
              <PrimaryButton
                disabled={
                  password.password === "" ||
                  checkPassword.password === "" ||
                  email === ""
                }
                onClick={onClickAddStaff}
              >
                追加
              </PrimaryButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
});
