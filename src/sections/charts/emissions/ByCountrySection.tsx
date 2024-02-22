import { FunctionComponent } from "react";
import Paper from "@mui/material/Paper";
import EmissionByCountry from "components/charts/emissions/EmissionByCountry";

import { ByCompanyDataPoint } from "data/store/types/Types";
import { useSelector } from "react-redux";
import { RootState } from "data/store";
import MainCard from "components/MainCard";

const selectByCompany = (state: RootState) => state.coordinates.visibleFrame.byCountry

const ByCountrySection: FunctionComponent = () => {
    const visibleFrame: ByCompanyDataPoint[] = useSelector(selectByCompany)

    return (
        (visibleFrame == null || visibleFrame.length <= 0) ? null :
            <MainCard title="Performance by Country">
                <EmissionByCountry emissionData={visibleFrame} />
            </MainCard>
    )
}

export default ByCountrySection