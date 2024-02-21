import L from 'leaflet';
import { useSelector } from "react-redux";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Marker } from "react-leaflet";
import _ from "lodash";
import MapMarker from "components/third-party/map/MapMarker"

import 'leaflet/dist/leaflet.css'
import './map-style.css'

const selectVisibleData = (state) => state.coordinates.visibleFrame.allPoints

const customIcon = new L.Icon({
    iconUrl: MapMarker,
    iconSize: new L.Point(40, 47)
});

const MIN_EMISSION = 2;
const MAX_EMISSION = 200;
const MIN_ICON_SIZE = 30;
const MAX_ICON_SIZE = 120;
const CLUSTER_RADIUS = MAX_ICON_SIZE * 2.2;

const sizeByValue = (value) => {
    const ratio = (_.clamp(value, MIN_EMISSION, MAX_EMISSION) - MIN_EMISSION) / (MAX_EMISSION - MIN_EMISSION)
    const newSize = MIN_ICON_SIZE + ratio * (MAX_ICON_SIZE - MIN_ICON_SIZE)
    return _.clamp(newSize, MIN_ICON_SIZE, MAX_ICON_SIZE)
}

const clusterRadiusByZoom = (zoom) => {
    return MAX_ICON_SIZE * 1.1
}

const createClusterCustomIcon = (cluster) => {
    // https://github.com/Leaflet/Leaflet.markercluster/blob/master/src/MarkerClusterGroup.js#L821
    const childCount = cluster.getChildCount()
    const dataPoints = cluster.getAllChildMarkers()
        .map(marker => marker.options.dataPoint)

    const totalAmount = childCount
    let amountLabel = totalAmount >= 1000 ? ((totalAmount / 1000).toFixed(1) + "k") : totalAmount

    const categories = _.uniq(dataPoints.map(dataPoint => dataPoint.category.toLowerCase()))
    const category = categories.length === 1 ? categories[0] : "cluster"

    const size = sizeByValue(totalAmount)
    const iconClass = "marker-cluster-category-" + category

    return L.divIcon({
        html: `<div class="marker-cluster-icon"><span>${amountLabel}</span></div>`,
        className: `cluster-icon-container ${iconClass}`,
        iconSize: L.point(size, size, true)
    })
}

const ClusterByCategoryLayer = () => {
    const dataPoints = useSelector(selectVisibleData)

    const markers = dataPoints.map(dataPoint => {
        const address = dataPoint.location
        const marker = <Marker
            key={dataPoint.id}
            position={[address.lat, address.lon]}
            title={dataPoint.country}
            icon={customIcon}
            dataPoint={dataPoint}
        />
        return marker
    })

    return (<MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        singleMarkerMode={true}
        maxClusterRadius={CLUSTER_RADIUS}
    >
        {markers}
    </MarkerClusterGroup>)
}

export default ClusterByCategoryLayer