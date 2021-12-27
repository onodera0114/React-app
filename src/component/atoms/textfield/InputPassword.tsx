import { Dispatch, memo, SetStateAction, VFC } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { password } from "../../../types/password";

type  Props = {
  password: password;
  setPassword: Dispatch<SetStateAction<password>>;
  label: string;
  id?: string;
}

export const InputPassword: VFC<Props> = memo((props) => {
  const { password, setPassword, label, id="outlined-adornment-password" } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword({...password, password: event.target.value})
    };

  const handleClickShowPassword = () => {
    setPassword({...password, showPassword: !password.showPassword})
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor={id}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={password.showPassword ? "text" : "password"}
        value={password.password}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {password.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
});
