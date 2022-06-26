import { Card, CardContent, Grid, Typography } from "@mui/material";
import { memo, useState, VFC } from "react";
import { password } from "../../types/password";
import { PrimaryButton } from "..//atoms/button/PrimaryButton";
import { getAuth, updatePassword } from "@firebase/auth";
import { InputPassword } from "../atoms/textfield/InputPassword";

export const ChangePasswordCard: VFC = memo(() => {
  const [password, setPassword] = useState<password>({
    password: "",
    showPassword: false,
  });
  const [checkPassword, setCheckPassword] = useState<password>({
    password: "",
    showPassword: false,
  });
  const auth = getAuth();

  const onClickChangePassword = () => {
    if(password.password === checkPassword.password && auth.currentUser){
      updatePassword(auth.currentUser, password.password).then(() => {
        alert("パスワードを変更しました");
      }).catch((error) => {
        alert("パスワードの変更に失敗しました");
      });
    }
    else{
      alert("パスワードが一致しません")
    }
  }
  return (
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
            <Typography sx={{ fontSize: "20px" }}>パスワード変更</Typography>
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
                password.password === "" || checkPassword.password === ""
              }
              onClick={onClickChangePassword}
            >
              変更
            </PrimaryButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
