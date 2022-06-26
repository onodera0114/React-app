import { memo, VFC } from "react";
import { ChangeDisplayNameCard } from "../../molecules/ChangeDisplayNameCard";
import { ChangePasswordCard } from "../../molecules/ChangePasswordCard";

export const SettingGeneralAccount: VFC = memo(() => {

  return (
    <>
      <ChangePasswordCard />
      <ChangeDisplayNameCard />
    </>
  );
});
