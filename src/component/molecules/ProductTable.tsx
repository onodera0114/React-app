import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, memo, SetStateAction, VFC } from "react";
import { productList } from "../../types/productList";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../firebase";

type Props = {
  productList: productList[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

export const ProductTable: VFC<Props> = memo((props) => {
  const { productList, selected, setSelected } = props;

  const onChangeSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = productList.map((n, i) => i);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const selectedIndex = selected.indexOf(i);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, i);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const onClickDeleteProduct = () => {
    for (let i = 0; i < selected.length; i++) {
      deleteDoc(doc(db, "product", productList[selected[i]].docId));
    }
    setSelected([]);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                m: 1,
              }}
            >
              <Typography sx={{fontSize: "20px"}}>製品リスト</Typography>
              <Button
                variant="contained"
                onClick={onClickDeleteProduct}
                disabled={selected.length === 0}
                startIcon={<DeleteIcon />}
              >
                削除
              </Button>
            </Box>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          productList.length > 0 &&
                          productList.length === selected.length
                        }
                        onChange={onChangeSelectAll}
                      />
                    </TableCell>
                    <TableCell>型番</TableCell>
                    <TableCell>製品名</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.indexOf(index) !== -1}
                          onChange={(e: any) => handleCheck(e, index)}
                        />
                      </TableCell>
                      <TableCell>{row.ModelNumber}</TableCell>
                      <TableCell>{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </>
  );
});
