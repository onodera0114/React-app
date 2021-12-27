import { TextField } from "@mui/material";
import { memo, VFC } from "react";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const ChatTextField: VFC<Props> = memo((props) => {
  const { value, onChange } = props;

  return (
    <TextField
      id="outlined-multiline-static"
      label="Message"
      multiline
      maxRows={5}
      fullWidth
      onChange={onChange}
      value={value}
      sx={{borderRadius: "12px"}}
    />
  );
});
