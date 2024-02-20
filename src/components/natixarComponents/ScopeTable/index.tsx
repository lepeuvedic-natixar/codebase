// material-ui
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { LinkOutlined } from "@ant-design/icons"

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //
type ScopeTableItemProps = {
  title: string
  value: number
}

type ScopeTableProps = {
  data: ScopeTableItemProps[]
}

export const ScopeTable = ({ data }: ScopeTableProps) => (
  <TableContainer
    sx={{ border: "1px solid", borderColor: "#e6ebf1", borderRadius: "4px" }}
  >
    <Table>
      <TableHead
        sx={{
          border: "none",
          borderBottom: "1px solid",
          borderColor: "#e6ebf1",
        }}
      >
        <TableRow sx={{ height: "70px" }}>
          <TableCell sx={{ width: "70px" }} align="left">
            <Typography>#</Typography>
          </TableCell>
          <TableCell sx={{ width: "500px" }}>
            <Typography>Title</Typography>
          </TableCell>
          <TableCell>
            <Typography>Value</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow hover key={index} sx={{ height: "70px" }}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography align="left">
                    <Link
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "5px",
                        textDecoration: "underline",
                      }}
                    >
                      {row.title}
                      <LinkOutlined />
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "30px",
                height: "70px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <LinearProgress
                  sx={{ width: "100%" }}
                  variant="determinate"
                  value={row.value / 1000}
                  color="primary"
                />
                <Typography>{row.value / 1000}K</Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                sx={{
                  maxWidth: "25px",
                  height: "25px",
                  color: "#FFF",
                  backgroundColor: "#1890FF",
                  padding: "0px 0px 0px 0px",
                  marginRight: "40px",
                  fontSize: "12px",
                  boxSizing: "border-box",
                }}
              >
                Detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
