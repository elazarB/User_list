import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
import { API_BASE_URL } from "./UsersList";
import { useStateContext } from "../../context/context";
import { apiDelete } from "../../App/Services/Services";
import { Tooltip } from "antd";

export default function DeleteUser({ client }) {
  const { refresh, setRefresh } = useStateContext();

  const removeClient = async (id) => {
    try {
      await apiDelete(`${API_BASE_URL}${id}`);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error removing client:", error);
    }
  };

  return (
    <div>
      <button
        onDoubleClick={() => removeClient(client.id)}
        className="relative  rounded-full bg-red-500 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
      >
        <Tooltip title="Double Click To Delete" placement="bottom">
          <RiDeleteBin6Line />
        </Tooltip>
      </button>
    </div>
  );
}
