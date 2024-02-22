import { FunctionComponent, memo } from "react";
import { BarChart } from '@mui/x-charts/BarChart';

import { COLOR_OPERATION, COLOR_UPSTREAM, COLOR_DOWNSTREAM } from "utils/CategoryColors";

interface CompanyData {
    operation: number,
    upstream: number,
    downstream: number,
    cluster: number,
    company: string
}

interface EmissionByCountryProps {
    emissionData: any[]
}

const valueFormatter = (value: number) => `${value}mm`;

const EmissionByCountry: FunctionComponent<EmissionByCountryProps> = ({ emissionData }) => {
    return (emissionData.length <= 0 ? null : <BarChart
        height={500}
        dataset={emissionData}
        slotProps={{ legend: { hidden: true } }}
        yAxis={[{ scaleType: 'band', dataKey: 'country' }]}
        layout="horizontal"
        series={[
            { dataKey: 'operation', label: 'Operation', valueFormatter, color: COLOR_OPERATION },
            { dataKey: 'upstream', label: 'Upstream', valueFormatter, color: COLOR_UPSTREAM },
            { dataKey: 'downstream', label: 'Downstream', valueFormatter, color: COLOR_DOWNSTREAM },
        ]}
    />)
}

export default memo(EmissionByCountry)