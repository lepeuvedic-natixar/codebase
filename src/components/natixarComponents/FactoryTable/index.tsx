// material-ui
import {
  Box,
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

export const FactoryTable = ({ data }: ScopeTableProps) => (
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
          <TableCell sx={{ width: "280px" }}>
            <Typography variant="subtitle2">Title</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2">Value</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow hover key={index} sx={{ height: "70px" }}>
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
                  sx={{
                    width: "100%",
                    backgroundColor: "transparent",
                    height: "24px",
                    borderRadius: "4px",

                    ".MuiLinearProgress-bar.MuiLinearProgress-bar1Determinate":
                      {
                        backgroundColor: "#52C41A",
                        borderRadius: "4px",
                      },
                  }}
                  variant="determinate"
                  value={row.value / 1000}
                />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
