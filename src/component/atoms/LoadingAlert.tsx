import { Alert, Snackbar } from "@mui/material";
import { Dispatch, memo, SetStateAction, VFC } from "react";

type Props = {
  messageLoading: boolean;
  setMessageLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingAlert:VFC<Props> = memo((props) => {
  const { messageLoading, setMessageLoading } = props;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageLoading(false);
  };

  return (
    <Snackbar open={messageLoading} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}} >
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          メッセージを取得中です
        </Alert>
      </Snackbar>
  )
})