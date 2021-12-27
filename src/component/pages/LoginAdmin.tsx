import { signInWithEmailAndPassword } from "@firebase/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { memo, useState, VFC } from "react";
import { auth } from "../../firebase";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { Header } from "../organisms/Header";

export const LoginAdmin: VFC = memo(() => {
  const [values, setValues] = useState({
    id: "",
    password: "",
    showPassword: false
  })

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value:string = event.target.value;
    const key:string = event.target.name;

    setValues({...values, [key]: value});
  }
  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onClickLogin = () => {
    signInWithEmailAndPassword(auth, values.id, values.password)
    .then((success) => {
      alert("ログインしました。");
    })
    .catch((error) => {
      alert("サインイン認証に失敗しました。");
    });
  };
  
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <Grid container spacing={3} sx={{ width: '50%', marginTop: "64px" }} alignItems="center" mx="auto">
        <Grid item xs={12}>
          <p>管理者ログインページ</p>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth id="outlined-basic" label="id" name="id" onChange={onChangeText} />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <PrimaryButton disabled={values.id === "" || values.password === ""} onClick={onClickLogin}>ログイン</PrimaryButton>
        </Grid>
      </Grid>
    </>
  );
});
