import { useEffect, useState } from "react";
import { MapContainer,Marker,CircleMarker , Popup, TileLayer, useMap } from "react-leaflet";
import Modal from "./Modal";
import useAddMapModal from "../../Hooks/UseAddMapModal";
import { apiGet } from "../../App/Services/Services";
import "leaflet/dist/leaflet.css";
import { useStateContext } from "../../context/context";

const AddMapModal = () => {
  const addMapModal = useAddMapModal();
  const { IPAddress } = useStateContext();
  const [mapData, setMapData] = useState({});
  const position = [mapData.lat, mapData.lon];

  const getMapData = async () => {
    try {
        const data = await apiGet(`http://ip-api.com/json/${IPAddress}`,position);
      setMapData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
     getMapData();
  }, [IPAddress]);

  const MapComponent = () => {
    const map = useMap();
    useEffect(() => {
      if (position && position.length === 2) {
        map.setView(position, 11);
      }
    }, [map, position]);

    return (
      <CircleMarker  center={position}>
        <Popup>
          Latitude: {position[0]}, Longitude: {position[1]}
        </Popup>
      </CircleMarker>
    );
  };

  const bodyModal = (
    <div className="">
      <div>
        {mapData.status === "success" ? (
          <div className="sm:flex justify-center gap-8">
            <div className="flex flex-col text-white gap-8 min-w-[35%] bg-slate-800 items-start justify-evenly rounded-xl p-4">
              <p><strong>Country : </strong>{mapData?.country}</p>
              <p><strong>City : </strong>{mapData?.city}</p>
              <p><strong>Time Zone : </strong>{mapData?.timezone}</p>
              <p><strong>Country Code : </strong>{mapData?.countryCode}</p>
            </div>
            <MapContainer
              center={position}
              zoom={11}
              style={{ width: "100%", height: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapComponent />
            </MapContainer>
          </div>
        ) : (
          <h2 className="text-white text-3xl">NOT FOUND!</h2>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={addMapModal.isOpen}
      title="IP Details"
      actionLabel=""
      onClose={addMapModal.onClose}
      body={bodyModal}
    />
  );
};

export default AddMapModal;
