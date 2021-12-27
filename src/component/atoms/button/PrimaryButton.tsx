import { Button } from "@mui/material"
import { memo, ReactNode, VFC } from "react"

type Props = {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
}

export const PrimaryButton:VFC<Props> = memo((props) => {
    const { children, disabled=false, onClick } = props;

    return (
        <Button variant="contained" type="button" disabled={disabled} onClick={onClick}>{children}</Button>
    )
})