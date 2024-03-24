
import { CSSObject } from "@mui/material/styles"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useTheme, Divider, styled, Stack, Box, Collapse, } from "@mui/material"
import { StackProps, SxProps } from "@mui/system";
import React from "react";

import { ScopeTableItemProps } from ".";
import { scopeColor, scopeTextColor } from '../CO2DonutSection'
import { RightArrowIcon } from "assets/images/icons/IconComponents/RightArrowIcon"
import { UpArrowIcon } from "assets/images/icons/IconComponents/UpArrowIcon"
import { DownArrowIcon } from "assets/images/icons/IconComponents/DownArrowIcon"

export interface NewScopeTableProps extends StackProps {
  active?: boolean
  onRowClicked: Function
  index: number
  data: ScopeTableItemProps[]
  bgcolor: string
  textColor: string
}

export const NatixarExpandableRow = ({ data, bgcolor = scopeColor[0], textColor = scopeTextColor[0], active = false, onRowClicked, index, ...props }: NewScopeTableProps) => {

  const rows = data

  const total = data.reduce((acc, elem) => acc + elem.value, 0)

  const theme = useTheme()

  const styleRow = (): CSSObject => ({
    font: 'normal 400 20px/21px Questrial',
    color: "#053759",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px'
  })

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    width: 150,
    marginRight: 32,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.lighter : theme.palette.primary.lighter,
    },
  }));

  const styleHeaderRow = (): CSSObject => ({
    padding: '12px 24px',
    borderRadius: '24px',
    backgroundColor: bgcolor,
    color: textColor,
    font: 'bold 20px/1 "Urbanist"',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all .3s',
    "&:hover": {
      filter: "brightness(1.05)"
    }
  })

  const handleClick = () => {
    onRowClicked(index);
  }

  props.sx = {
    ...props.sx,
    ...styleHeaderRow()
  } as SxProps

  const stackProps: StackProps = { ...props } as StackProps

  return (
    <React.Fragment>
      <Stack {...stackProps} direction={'row'} onClick={handleClick}>
        <Box component='span' width="120px">Scope 1</Box>
        <Collapse sx={{ flexGrow: 1, marginRight: 2 }} in={active}>
          <Stack sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center', }}>
            <Box>Direct emissions</Box>
            <Box>Total : 44</Box>
          </Stack>
        </Collapse>
        {active && <UpArrowIcon customColor={textColor} />}
        {!active && <DownArrowIcon customColor={textColor} />}
      </Stack>

      <Collapse in={active}>
        {
          rows.map((row, index) => (
            <React.Fragment>
              <Stack direction='row' key={row.emissionID} my={1} sx={styleRow}>
                <Box width={"40%"}>{row.title}</Box>
                <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={row.value * total / 100}
                  />
                  <Box mr={2}>
                    {row.value} K
                  </Box>
                  <RightArrowIcon customColor={theme.palette.primary.main} sx={{ fontSize: 15 }} />
                </Stack>
              </Stack>
              <Divider sx={{ marginBottom: index == rows.length - 1 && 2 }} orientation='horizontal' />
            </React.Fragment>
          ))
        }
      </Collapse>
    </React.Fragment>
  )
}