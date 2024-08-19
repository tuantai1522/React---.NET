import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { productsSelector } from "./catalogSlice";
import { MetaData } from "../../app/models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const AppPagination = ({ metaData, onPageChange }: Props) => {
  const { curPage, totalCount, totalPage, pageSize } = metaData;
  return (
    <>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>
            Displaying {(curPage - 1) * pageSize + 1} -
            {curPage * pageSize > totalCount ? totalCount : curPage * pageSize}{" "}
            of {metaData?.totalCount} items
          </Typography>
          <Pagination
            color="secondary"
            size="large"
            count={metaData?.totalPage}
            page={metaData?.curPage}
            onChange={(e, page) => onPageChange(page)}
          ></Pagination>
        </Box>
      </Grid>
    </>
  );
};

export default AppPagination;
