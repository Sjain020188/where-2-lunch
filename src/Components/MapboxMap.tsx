import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/* -------------------------------------------------------------------------- */
/*                              Types                                     */
/* -------------------------------------------------------------------------- */

type Props = { lat: number; lng: number };

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render map with location of restaurant.
 * NOTE: Correct location is not displayed.
 *
 */
export function MapboxMap({ lat, lng }: Props) {
  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 20
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <Marker longitude={lng} latitude={lat} />
    </Map>
  );
}
