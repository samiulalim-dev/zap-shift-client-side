import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useState } from "react";
// Custom marker icon fix (Leaflet's default icon has a bug in React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Map controller to fly to district
const FlyToDistrict = ({ lat, lng }) => {
  const map = useMap();
  if (lat && lng) {
    map.flyTo([lat, lng], 10, { duration: 1.5 });
  }
  return null;
};

const CoverageMap = () => {
  const districts = useLoaderData();
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const found = districts.find((d) => {
      return (
        d.district.toLowerCase() === search.toLowerCase() ||
        d.city.toLowerCase() === search.toLowerCase() ||
        d.covered_area.some(
          (area) => area.toLowerCase() === search.toLowerCase()
        )
      );
    });
    if (found) {
      setTarget({ lat: found.latitude, lng: found.longitude });
    } else {
      alert("no matching area found!");
    }
  };
  return (
    <div className=" md:w-11/12  m-2 md:mx-auto rounded-2xl bg-white p-2 md:p-20 my-10">
      <div className=" mb-10">
        <h2 className="  text-2xl md:text-4xl font-bold mb-4">
          We are available in 64 districts
        </h2>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search here"
          />
        </label>
        <button onClick={handleSearch} className="bg-lime-400 btn  ml-1">
          Search
        </button>
      </div>
      <div className="w-full h-[500px] ">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          className="h-full w-full"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {districts.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
            >
              {district.covered_area.map((area, idx) => (
                <Popup key={idx}>{area}</Popup>
              ))}
            </Marker>
          ))}
          {/* Fly to searched location */}
          {target && <FlyToDistrict lat={target.lat} lng={target.lng} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;
