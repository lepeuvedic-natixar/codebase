// material-ui
import { Theme } from "@mui/material/styles"

// third-party
import { merge } from "lodash"

// project import
import Typography from "./Typography"

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Typography(),
  )
}
