import { doc, updateDoc } from "@firebase/firestore";
import { Card, CardContent, Grid, Modal } from "@mui/material";
import { Dispatch, memo, SetStateAction, useCallback, VFC } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { useAuth } from "../../auth/LoginUser";
import { db } from "../../firebase";
import { userSettingState } from "../../store/adminUser";
import { inquiry } from "../../types/inquiry";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { InquiryCardUnit } from "../atoms/InquiryCardUnit";
import { ModalButtonGroup } from "./ModalButtonGroup";

type Props = {
  inquiry: inquiry;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "100%",
};

export const InquiryModalContent: VFC<Props> = memo((props) => {
  const { inquiry, open, setOpen } = props;
  const history = useHistory();
  const signInUser = useAuth();
  const [userSetting, setUserSetting] = useRecoilState(userSettingState);

  const handleClose = () => setOpen(false);

  const changeNoCorrespondence = useCallback(() => {
    const docRef = doc(db, "inquiry", inquiry.docId);
    updateDoc(docRef, {
      status: "未対応",
      staff: "未定",
    });
    setUserSetting({
      ...userSetting,
      status: "未対応",
    });
  }, [inquiry.docId, userSetting, setUserSetting]);

  const changeCorrespondence = useCallback(() => {
    const docRef = doc(db, "inquiry", inquiry.docId);
    updateDoc(docRef, {
      status: "対応中",
      staff: signInUser.email,
    });
    setUserSetting({
      ...userSetting,
      status: "対応中",
    });
  }, [inquiry.docId, signInUser.email, userSetting, setUserSetting]);

  const changeCompleted = useCallback(() => {
    const docRef = doc(db, "inquiry", inquiry.docId);
    updateDoc(docRef, {
      status: "対応済み",
      staff: signInUser.email,
    });
    setUserSetting({
      ...userSetting,
      status: "対応済み",
    });
  }, [inquiry.docId, signInUser.email, userSetting, setUserSetting]);

  const ToChatPage = useCallback(() => {
    history.push(`/chat/${inquiry.docId}`, inquiry);
  }, [history, inquiry]);


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <CardContent>
          <Grid container spacing={3}>
            <InquiryCardUnit size={6} label="名前" data={inquiry.name} />
            <InquiryCardUnit
              size={6}
              label="メールアドレス"
              data={inquiry.email}
            />
            <InquiryCardUnit size={6} label="電話番号" data={inquiry.phone} />
            <InquiryCardUnit size={6} label="製品番号" data={inquiry.product.ModelNumber} />
            <InquiryCardUnit
              size={6}
              label="お問い合わせ時刻"
              data={inquiry.timestamp}
            />
            <InquiryCardUnit
              size={12}
              label="お問い合わせ内容"
              data={inquiry.text}
              id="text"
            />
            <InquiryCardUnit size={6} label="対応状況" data={inquiry.status} />
            <InquiryCardUnit
              size={6}
              label="対応スタッフ"
              data={inquiry.staff}
            />
            {(inquiry.status === "未対応") && (
              <ModalButtonGroup>
                <Grid item>
                  <PrimaryButton onClick={changeCorrespondence} disabled={!(signInUser.displayName !== "")}>
                    対応する
                  </PrimaryButton>
                </Grid>
                <Grid item>
                  <PrimaryButton onClick={changeCompleted} disabled={!(signInUser.displayName !== "")}>
                    対応済みにする
                  </PrimaryButton>
                </Grid>
              </ModalButtonGroup>
            )}
            {inquiry.status === "対応中" && (
              <ModalButtonGroup>
                <Grid item>
                  <PrimaryButton
                    disabled={!(inquiry.staff === signInUser.email)}
                    onClick={changeNoCorrespondence}
                  >
                    未対応に戻す
                  </PrimaryButton>
                </Grid>
                <Grid item>
                  <PrimaryButton
                    disabled={!(inquiry.staff === signInUser.email)}
                    onClick={ToChatPage}
                  >
                    チャットページへ
                  </PrimaryButton>
                </Grid>
                <Grid item>
                  <PrimaryButton
                    disabled={!(inquiry.staff === signInUser.email)}
                    onClick={changeCompleted}
                  >
                    対応済みにする
                  </PrimaryButton>
                </Grid>
              </ModalButtonGroup>
            )}
            {inquiry.status === "対応済み" && (
              <ModalButtonGroup>
                <Grid item>
                  <PrimaryButton onClick={changeNoCorrespondence} disabled={!(signInUser.displayName !== "")}>
                    未対応に戻す
                  </PrimaryButton>
                </Grid>
                <Grid item>
                  <PrimaryButton onClick={changeCorrespondence} disabled={!(signInUser.displayName !== "")}>
                    対応中にする
                  </PrimaryButton>
                </Grid>
              </ModalButtonGroup>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
});
