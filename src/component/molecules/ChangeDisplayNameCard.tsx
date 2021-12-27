import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { getAuth, updateProfile } from "firebase/auth";
import React, { memo, useState, VFC } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const ChangeDisplayNameCard: VFC = memo(() => {
  const [displayName, setDisplayName] = useState<string>("");
  const auth = getAuth();

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
  };
  const onClickChangeDisplayName = () => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          alert("表示名を変更しました");
          setDisplayName("");
        })
        .catch((error) => {
          alert("表示名を変更に失敗しました");
        });
    }
  };

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
            <Typography sx={{ fontSize: "20px" }}>表示名変更</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{`現在の表示名：${
              auth.currentUser?.displayName
                ? auth.currentUser?.displayName
                : "未設定"
            }`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="新しい表示名"
              name="displayName"
              onChange={onChangeText}
              value={displayName}
            />
          </Grid>
          <Grid item xs={12}>
            <PrimaryButton
              disabled={displayName === ""}
              onClick={onClickChangeDisplayName}
            >
              変更
            </PrimaryButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
