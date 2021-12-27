import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { memo, ReactNode, VFC } from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

export const SendButton:VFC<Props> = memo((props) => {
  const { onClick, disabled, children } = props;
  return (
    <Button variant="contained" endIcon={<SendIcon />} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  )
});
