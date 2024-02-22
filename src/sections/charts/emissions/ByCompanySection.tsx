import { FunctionComponent } from "react"
import Paper from "@mui/material/Paper"
import EmissionByCompany from "components/charts/emissions/EmissionByCompany";

import { ByCompanyDataPoint } from "data/store/types/Types";
import { useSelector } from "react-redux";
import { RootState } from "data/store";
import MainCard from "components/MainCard";

const selectByCompany = (state: RootState) => state.coordinates.visibleFrame.byCompany

const ByCompanySection: FunctionComponent = () => {
    const visibleFrame: ByCompanyDataPoint[] = useSelector(selectByCompany)

    return (
        (visibleFrame == null || visibleFrame.length <= 0) ? null :
            <MainCard title="Performance by Country">
                <EmissionByCompany emissionData={visibleFrame} />
            </MainCard>
    )
}

export default ByCompanySection