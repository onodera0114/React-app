import { Backdrop, CircularProgress } from "@mui/material"

export const Loading = () => {
    return(
        <>
        <Backdrop sx={{ color: '#fff'}} open>
            <CircularProgress color="inherit" />
        </Backdrop>
    </>
    )
}