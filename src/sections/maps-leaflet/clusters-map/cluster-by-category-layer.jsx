import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"

import L from 'leaflet'
import { Marker } from "react-leaflet"
import MarkerClusterGroup from 'react-leaflet-cluster'

import _ from "lodash"
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
const CLUSTER_RADIUS = MAX_ICON_SIZE * 1.75

const sizeByValue = (value) => {
    const ratio = (_.clamp(value, MIN_EMISSION, MAX_EMISSION) - MIN_EMISSION) / (MAX_EMISSION - MIN_EMISSION)
    const newSize = MIN_ICON_SIZE + ratio * (MAX_ICON_SIZE - MIN_ICON_SIZE)
    return _.clamp(newSize, MIN_ICON_SIZE, MAX_ICON_SIZE)
}

const clusterRadiusByZoom = (zoom) => {
    return CLUSTER_RADIUS
}

const createClusterCustomIcon = (cluster) => {
    // https://github.com/Leaflet/Leaflet.markercluster/blob/master/src/MarkerClusterGroup.js#L821
    const childCount = cluster.getChildCount()
    const childMarkers = cluster.getAllChildMarkers()

    let category = "cluster"
    if (childCount > 0) {
        category = childMarkers[0].options.dataPoint.category
        const thereIsOtherCategory = childMarkers.some(marker => category !== marker.options.dataPoint.category)
        if (thereIsOtherCategory) {
            category = "cluster"
        }
    }
    category = category.toLowerCase()

    let amountLabel = childCount >= 1000 ? ((childCount / 1000).toFixed(1) + "k") : childCount

    const size = sizeByValue(childCount)
    const iconClass = "marker-cluster-category-" + category

    return L.divIcon({
        html: `<div class="marker-cluster-icon"><span>${amountLabel}</span></div>`,
        className: `cluster-icon-container ${iconClass}`,
        iconSize: L.point(size, size, true)
    })
}

const ClusterByCategoryLayer = () => {
    const clusterGroupRef = useRef()
    const dataPoints = useSelector(selectVisibleData)
    
    useEffect(() => {
        let acceptTransformation = true

        const retrieveMarkers = async () => {
            const markers = dataPoints.map(dataPoint => {
                const address = dataPoint.location
                const marker = L.marker(
                    new L.LatLng(address.lat, address.lon),
                    {
                        key: dataPoint.id,
                        title: dataPoint.country,
                        icon: customIcon,
                        dataPoint: dataPoint
                    }
                )
                return marker
            })

            if (acceptTransformation) {
                const clusterGr = clusterGroupRef.current
                clusterGr.clearLayers()
                clusterGr.addLayers(markers)
            }
        }

        retrieveMarkers()

        return () => {
            acceptTransformation = false
        }
    }, [dataPoints])

    return (<MarkerClusterGroup
        chunkedLoading
        singleMarkerMode={true}
        iconCreateFunction={createClusterCustomIcon}
        maxClusterRadius={CLUSTER_RADIUS}
        ref={clusterGroupRef}
    />)
}

export default ClusterByCategoryLayer