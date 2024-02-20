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

// table data
const createData = (title: string, value: number) => ({ title, value })

const rows = [
  createData("Processing of Sold Production", 7000),
  createData("Investment", 3000),
  createData("Transportation and destribution", 11000),
  createData("Processing of Sold Production", 2000),
  createData("Investment", 9000),
  createData("Processing of Sold Production", 8000),
]

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

export const ScopeTable = () => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: "70px" }} align="left">
            #
          </TableCell>
          <TableCell sx={{ width: "500px" }}>Title</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow hover key={index}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography align="left" variant="subtitle1">
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
              sx={{ display: "flex", alignItems: "center", columnGap: "45px" }}
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
              <Button variant="contained" size="small" sx={{ color: "#FFF" }}>
                Detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
