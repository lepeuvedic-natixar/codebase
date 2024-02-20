import { Box, Button, Grid, Typography } from "@mui/material"
import MainCard from "components/MainCard"
import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons"

import { useNavigate } from "react-router-dom"
import { ScopeTable } from "../../../components/natixarComponents/ScopeTable"
import Breadcrumb from "../../../components/@extended/Breadcrumbs"

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

const links = [
  {
    title: "Scopes",
    to: "/contributor/dashboard",
  },
  {
    title: "Scope 3 emissions",
    to: "",
  },
]

const ScopePage = () => {
  const navigate = useNavigate()
  return (
    <MainCard>
      <Grid container rowSpacing={4.5} columnSpacing={3}>
        <Grid item xs={12} md={12} xl={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            padding="10px 0px"
          >
            <Button
              variant="contained"
              sx={{ color: "#FFF", position: "absolute", left: 0, top: 0 }}
              startIcon={<ArrowLeftOutlined color="#FFF" />}
              onClick={() => navigate(-1)}
            >
              Back to scopes
            </Button>
            <Breadcrumb
              custom
              title={false}
              links={links}
              separator={RightOutlined}
              sx={{
                mb: "0px !important",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12} xl={12}>
          <Typography variant="h5">Scope Emissions bar</Typography>
        </Grid>
        <Grid item xs={12} md={12} xl={12}>
          <ScopeTable data={rows} />
        </Grid>
      </Grid>
    </MainCard>
  )
}

export default ScopePage
