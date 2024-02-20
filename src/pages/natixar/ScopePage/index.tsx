// material-ui
import { Grid, Typography } from "@mui/material"

// assets
import MainCard from "components/MainCard"
import { ScopeTable } from "../../../components/natixarComponents/ScopeTable"

// ==============================|| WIDGET - CHARTS ||============================== //
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

const ScopePage = () => (
  <Grid container rowSpacing={4.5} columnSpacing={3}>
    <MainCard sx={{ width: "100%" }}>
      <Grid item xs={12} md={12} xl={12}>
        {/* head */}
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <Typography variant="h5" sx={{ marginBottom: "15px" }}>
          Scope Emissions bar
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <ScopeTable data={rows} />
      </Grid>
    </MainCard>
  </Grid>
)

export default ScopePage
