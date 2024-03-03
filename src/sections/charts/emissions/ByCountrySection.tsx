import { FunctionComponent } from "react"
import EmissionByCountry from "components/charts/emissions/EmissionByCountry"

import { ByCountryDataPoint } from "data/store/features/coordinates/Types"
import { useSelector } from "react-redux"
import { RootState } from "data/store"
import MainCard from "components/MainCard"
import HeaderWithCategoriesLegend from "components/charts/HeaderWithCategoriesLegend"

const selectByCompany = (state: RootState) =>
  state.coordinates.visibleFrame.byCountry
const selectVisibleCategories = (state: RootState) =>
  state.globalFilter.availableValues.categories

const ByCountrySection: FunctionComponent = () => {
  const visibleFrame: ByCountryDataPoint[] = useSelector(selectByCompany)
  const categories: string[] = useSelector(selectVisibleCategories)

  return visibleFrame == null || visibleFrame.length <= 0 ? null : (
    <MainCard
      contentSX={{ height: 500 }}
      title={
        <HeaderWithCategoriesLegend
          categories={categories}
          titleText="Performance by Country"
        />
      }
    >
      <EmissionByCountry emissionData={visibleFrame} />
    </MainCard>
  )
}

export default ByCountrySection
