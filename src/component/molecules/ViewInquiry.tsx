import { Card, CardContent, Grid, Modal } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, memo, SetStateAction, useCallback, VFC } from "react";
import { useRecoilState } from "recoil";
import { useAuth } from "../../auth/LoginUser";
import { db } from "../../firebase";
import { currentInquiryState } from "../../store/currentInquiry";
import { inquiry } from "../../types/inquiry";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { InquiryCardUnit } from "../atoms/InquiryCardUnit";
import { ModalButtonGroup } from "./ModalButtonGroup";

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  inquiry: inquiry;
}

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

export const ViewInquiry:VFC<Props> = memo((props) => {
  const { openModal, setOpenModal, inquiry} = props;
  const signInUser = useAuth();
  const [currentInquiry, setCurrentInquiry] = useRecoilState(currentInquiryState);

  const handleClose = () => setOpenModal(false);

  const changeCorrespondence = useCallback(() => {
    const docRef = doc(db, "inquiry", inquiry.docId);
    updateDoc(docRef, {
      status: "対応中",
      staff: signInUser.email,
    });
    setCurrentInquiry({
      ...currentInquiry,
      status: "対応中"
    });
  }, [inquiry.docId, signInUser.email, currentInquiry, setCurrentInquiry]);

  const changeCompleted = useCallback(() => {
    const docRef = doc(db, "inquiry", inquiry.docId);
    updateDoc(docRef, {
      status: "対応済み",
      staff: signInUser.email,
    });
    setCurrentInquiry({
      ...currentInquiry,
      status: "対応済み"
    });
  }, [inquiry.docId, signInUser.email, currentInquiry, setCurrentInquiry]);

    return (
        <Modal
          open={openModal}
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
                  <ModalButtonGroup>
                    <Grid item>
                      <PrimaryButton onClick={changeCorrespondence} disabled={!(signInUser.displayName !== "") || inquiry.status === "対応中"}>
                        対応中にする
                      </PrimaryButton>
                    </Grid>
                    <Grid item>
                      <PrimaryButton
                        disabled={!(inquiry.staff === signInUser.email) || inquiry.status === "対応済み"}
                        onClick={changeCompleted}
                      >
                        対応済みにする
                      </PrimaryButton>
                    </Grid>
                  </ModalButtonGroup>
                  </Grid>
            </CardContent>
          </Card>
        </Modal>
    )
})