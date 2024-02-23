import { FunctionComponent, memo } from "react"
import { DataPoint } from "data/store/types/Types"
import { MapContainer, TileLayer } from "react-leaflet"
import { LatLngTuple } from "leaflet";

import 'leaflet/dist/leaflet.css'
import './map-style.css'

import ClusterByCategoryLayer from "./cluster-by-category-layer";

interface SimpleMapProps {
  allPoints: DataPoint[]
}

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom: number = 8;

const ClusteredMap: FunctionComponent = () => {
  return (
    <MapContainer center={defaultLatLng} zoom={zoom} style={{ width: '100%', height: '100%' }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png" attribution="©OpenStreetMap, ©CartoDB" />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png" attribution="©OpenStreetMap, ©CartoDB" />
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors" /> */}
      <ClusterByCategoryLayer />
    </MapContainer>
  )
}

export default memo(ClusteredMap)
