import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Stack,
  CSSObject,
  ButtonGroup
} from "@mui/material"
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { CaretDownOutlined, DownloadOutlined } from "@ant-design/icons"
import IconButton from "../../@extended/IconButton"
import MainCard from "components/MainCard"
import { NatixarTitleCard } from "components/natixarComponents/ChartCard/NatixarTitleCard"

type ChartCardProps = {
  children: ReactNode
  title?: string
  value?: string | number | undefined
  date?: string
  slot: string
  setSlot: Dispatch<SetStateAction<string>>
  compareButton?: boolean
  compare?: boolean
  setCompare?: Dispatch<SetStateAction<boolean>>
}

interface CustomButtonGroupProps {
  children?: ReactNode
  onChange: Function
  value: string
}

export const ChartCardCopy = ({
  children,
  title,
  value,
  date,
  compareButton,
  slot,
  setSlot,
  compare,
  setCompare,
}: ChartCardProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment) setSlot(newAlignment)
  }

  const [rangeType, setRangeType] = useState('month')
  const isMonth = rangeType == 'month'
  const isYear = rangeType == 'year'
  const isQuarter = rangeType == 'quarter'

  return (
    <Stack direction={'column'}>
      <Stack direction='row' spacing={2} mb={4}>
        <Button
          variant={isMonth ? "contained" : 'outlined'}
          color={isMonth ? "success" : 'primary'}
          sx={{ marginRight: 2, fontSize: '18px', minWidth: 110, color: isMonth && '#fff' }}
          onClick={() => setRangeType('month')}
        >
          Month
        </Button>
        <Button
          variant={isQuarter ? "contained" : 'outlined'}
          color={isQuarter ? "success" : 'primary'}
          sx={{ marginRight: 2, fontSize: '18px', minWidth: 110, color: isQuarter && '#fff' }}
          onClick={() => setRangeType('quarter')}
        >
          Quarter
        </Button>
        <Button
          variant={isYear ? "contained" : 'outlined'}
          color={isYear ? "success" : 'primary'}
          sx={{ marginRight: 2, fontSize: '18px', minWidth: 110, color: isYear && '#fff' }}
          onClick={() => setRangeType('year')}
        >
          Year
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NatixarTitleCard>{title}</NatixarTitleCard>
        <Box sx={{ display: "flex", gap: "10px" }}>
          {compareButton && setCompare && (
            <Button
              sx={{
                color: compare ? "#1890FF" : "#000000",
                borderColor: compare ? "#1890FF" : "#D9D9D9",
              }}
              variant="outlined"
              color="secondary"
              onClick={() => setCompare(!compare)}
            >
              Compare to previous year
            </Button>
          )}
          <IconButton
            variant="outlined"
            color="secondary"
            sx={{ borderColor: "#D9D9D9" }}
          >
            <DownloadOutlined style={{ color: "#000" }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!compare ? (
          <Box>
            <Typography variant="h5">{value}</Typography>
            <Typography variant="subtitle2" sx={{ color: "#8C8C8C" }}>
              {date}
            </Typography>
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                color: "red",
                display: "flex",
                columnGap: "5px",
                alignItems: "center",
              }}
            >
              <CaretDownOutlined />
              <Typography variant="h5">{value}</Typography>
              <Typography>(45,67%)</Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ color: "#8C8C8C" }}>
              Compare: {date} to {date}
            </Typography>
          </Box>
        )}
      </Box>
      {children}
    </Stack >
  )
}
