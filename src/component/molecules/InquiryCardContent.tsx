import { Grid } from "@mui/material";
import { memo, VFC } from "react";
import { inquiry } from "../../types/inquiry";
import { InquiryCardUnit } from "../atoms/InquiryCardUnit";

type Props = {
  inquiry: inquiry;
};

export const InquiryCardContent: VFC<Props> = memo((props) => {
  const { inquiry } = props;

  return (
    <Grid container spacing={3}>
      <InquiryCardUnit size={12} label="名前" data={inquiry.name} />
      <InquiryCardUnit size={12} label="メールアドレス" data={inquiry.email} />
      <InquiryCardUnit size={12} label="電話番号" data={inquiry.phone} />
      <InquiryCardUnit size={12} label="製品番号" data={inquiry.product.ModelNumber} />
      <InquiryCardUnit
        size={12}
        label="お問い合わせ時刻"
        data={inquiry.timestamp}
      />
      <InquiryCardUnit
        size={12}
        label="お問い合わせ内容"
        data={
          inquiry.text.length > 100 ? `${inquiry.text.slice(0, 100)}…` : inquiry.text
        }
        id="text"
      />
      <InquiryCardUnit
        size={12}
        label="お問い合わせ状況"
        data={inquiry.status}
      />
    </Grid>
  );
});
