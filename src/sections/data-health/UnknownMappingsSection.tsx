import { memo, useCallback, useEffect, useState } from "react"
import {
  Box,
  Button,
  Collapse,
  Fade,
  Link,
  Skeleton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import RefreshIcon from "@mui/icons-material/Refresh"
import MainCard from "components/MainCard"
import UnknownMappingsTable from "components/data-health/UnknownMappingsTable"
import UnknownMappingForm from "components/data-health/UnknownMappingForm"

import { useSelector } from "react-redux"
import { RootState } from "data/store"
import {
  useGetCurrentUnknownMappingIdsQuery,
  useLazyGetCurrentUnknownMappingsQuery,
} from "data/store/features/codemappings/UnknownCodeMappingsClient"
import { CodeMapping } from "data/store/features/codemappings/Types"

const CODES_REGISTRY_URL =
  "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Expand=true"
const allMappingsSelector = (state: RootState) => state.unknownCodeMappings
const mappingToEditSelector = (state: RootState) =>
  state.mappingToEdit.mappingToEdit
const idsRefreshInterval = 5 * 1000

interface UnknownMappingsHeaderProps {
  onSaveAll: () => void
}

const UnknownMappingsHeader = (props: UnknownMappingsHeaderProps & SxProps) => {
  const { onSaveAll, ...sxProps } = props
  const onSaveClick = useCallback(() => onSaveAll(), [onSaveAll])
  return (
    <Stack
      sx={{ height: "100%", p: 0, m: 0, ...sxProps }}
      direction="row"
      gap={2}
      alignItems="center"
    >
      <Typography variant="h5">Unknown codes</Typography>
      <Link
        underline="always"
        target="_blank"
        rel="noopener noreferrer"
        href={CODES_REGISTRY_URL}
      >
        Public code base
      </Link>
      <Button
        sx={{ marginLeft: "auto" }}
        startIcon={<DoneAllIcon />}
        onClick={onSaveClick}
      >
        Save all
      </Button>
    </Stack>
  )
}

const mappingIsFilled = (mapping: CodeMapping): boolean => {
  const goodsCodeIsFilled = mapping.goodsCode?.trim().length
  const keywordsAreFilled = mapping.precision?.length

  return (
    goodsCodeIsFilled !== undefined &&
    goodsCodeIsFilled > 0 &&
    keywordsAreFilled !== undefined &&
    keywordsAreFilled > 0
  )
}

const UnknownMappingsSection = (props: SxProps) => {
  const { ...sxProps } = props

  const [pullMappings, { isLoading }] = useLazyGetCurrentUnknownMappingsQuery()
  const onPullClick = useCallback(() => {
    pullMappings()
  }, [pullMappings])
  useEffect(onPullClick, [pullMappings])

  const allMappings = useSelector(allMappingsSelector)
  const [filledMappings, setFilledMappings] = useState<
    Record<string, CodeMapping | undefined>
  >({})
  useEffect(() => {
    const computedFilledMappings: Record<string, CodeMapping> =
      allMappings.mappings
        .filter(mappingIsFilled)
        .map((m) => ({ ...m })) // De-reduxing
        .reduce(
          (acc, newMapping) => {
            acc[newMapping.id] = newMapping
            return acc
          },
          {} as Record<string, CodeMapping>,
        )
    setFilledMappings(computedFilledMappings)
  }, [allMappings.mappings])

  const onSaveAllClick = useCallback(() => {
    // filledMappings
  }, [allMappings])

  const mappingToEdit = useSelector(mappingToEditSelector)
  const onValueSubmit = (newMapping: CodeMapping) => {
    if (mappingIsFilled(newMapping)) {
      filledMappings[newMapping.id] = newMapping
    } else {
      filledMappings[newMapping.id] = undefined
    }
    setFilledMappings(filledMappings)
    alert(`Yes, I see new value ${JSON.stringify(newMapping)}`)
  }

  useGetCurrentUnknownMappingIdsQuery(undefined, {
    pollingInterval: idsRefreshInterval,
  })
  const newMappingsCount =
    allMappings.recentKnownIds.length - allMappings.currentIds.length
  const mappingsMessageText =
    newMappingsCount > 0
      ? `New ${newMappingsCount} mappings`
      : "Mappings are up-to-date!"
  const messageColor = newMappingsCount > 0 ? "info" : "success"

  return (
    <MainCard
      title={<UnknownMappingsHeader onSaveAll={onSaveAllClick} />}
      sx={{ ...sxProps }}
      contentSX={{
        p: 0,
        m: 0,
        position: "relative",
      }}
    >
      <Box sx={{ width: "100%", minHeight: "440px", position: "relative" }}>
        <Stack
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <Collapse in={newMappingsCount > 0}>
            <Button
              color={messageColor}
              onClick={onPullClick}
              sx={{
                width: "100%",
                border: 0,
                p: 0,
                m: 0,
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
                sx={{
                  width: "100%",
                  color: "white",
                  backgroundColor: (theme) => theme.palette.info.main,
                  p: 2,
                }}
              >
                <Typography variant="h5">{mappingsMessageText}</Typography>
                <RefreshIcon color="action" sx={{ color: "secondary" }} />
              </Stack>
            </Button>
          </Collapse>
          <UnknownMappingsTable
            mostRecentTimestamp={allMappings.mostRecentTimestamp}
            initialMappings={allMappings.mappings}
            onRowUpdated={onValueSubmit}
          />
        </Stack>
        {isLoading ? (
          <Skeleton
            sx={{
              top: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 2,
            }}
            variant="rectangular"
          />
        ) : null}
        <Fade in={mappingToEdit != null} timeout={300}>
          <Box
            sx={{
              top: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 3,
            }}
          >
            <UnknownMappingForm
              mappingToEdit={mappingToEdit}
              valueObserver={onValueSubmit}
            />
          </Box>
        </Fade>
      </Box>
    </MainCard>
  )
}

export default memo(UnknownMappingsSection)
