import React, { useState, useEffect, useCallback } from "react";
import { useStateContext } from "../../context/context";
import RenderUser from "./RenderUser";
import { apiGet } from "../../App/Services/Services";
import useAddClientModal from "../../Hooks/UseAddClientModal";
import { CiMenuBurger } from "react-icons/ci";
import { Drawer, Tooltip } from "antd";
import { TbRefresh } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
export const API_BASE_URL = "http://localhost:5142/api/clients/";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [surnameFilter, setSurnameFilter] = useState("");
  const { refresh } = useStateContext();
  const addClientModal = useAddClientModal();

  const onClick = useCallback(() => {
    addClientModal.onOpen();
  }, []);

  useEffect(() => {
    fetchClients();
  }, [refresh]);

  const fetchClients = async () => {
    try {
      const data = await apiGet(API_BASE_URL);
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const filterClients = async () => {
    try {
      const data = await apiGet(`${API_BASE_URL}search?s=${surnameFilter}`);
      setFilteredClients(data);
    } catch (error) {
      console.error("Error filtering clients:", error);
    }
  };

  const resetFilter = () => {
    setSurnameFilter("");
    setFilteredClients([]);
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="">
        <div className="flex  justify-between items-center fixed bg-slate-800/80 h-28 w-full z-10">
          <div className="container flex justify-between items-center mx-auto ">
            <div className="flex gap-12 items-center ">
              <p className="font-semibold text-3xl text-gray-300">Clients</p>
              <button className="buttons" onClick={onClick}>
                {" "}
                <Tooltip title="Add Client">Add Client</Tooltip>
              </button>
            </div>

            <div onClick={showDrawer} className="md:hidden ">
              <CiMenuBurger size={40} color="white" />
            </div>
            <Drawer
              style={{ color: "white" }}
              headerStyle={{ background: "rgb(44, 45, 46)" }}
              bodyStyle={{ background: "rgb(44, 45, 46)" }}
              title=""
              placement="right"
              onClose={onClose}
              open={open}
            >
              <div className="flex flex-col">
                <button className="buttons" onClick={resetFilter}>
                  <Tooltip title="Reset">
                    <TbRefresh />
                  </Tooltip>
                </button>
                <button className="buttons" onClick={filterClients}>
                  <Tooltip title="Search">
                    <ImSearch />
                  </Tooltip>
                </button>
                <input
                  className="px-4 py-2 m-2 rounded-lg"
                  type="search"
                  placeholder="Search..."
                  value={surnameFilter}
                  onChange={(e) => setSurnameFilter(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && filterClients()}
                />
              </div>
            </Drawer>
            <div className="hidden md:flex">
              <button className="buttons" onClick={resetFilter}>
                <Tooltip title="Reset">
                  <TbRefresh />
                </Tooltip>
              </button>
              <button className="buttons" onClick={filterClients}>
                <Tooltip title="Search">
                  <ImSearch />
                </Tooltip>
              </button>
              <input
                className="px-4 py-2 m-2 rounded-lg"
                type="search"
                placeholder="Search..."
                value={surnameFilter}
                onChange={(e) => setSurnameFilter(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && filterClients()}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="justify-items-center p-4  grid  grid-cols-1 gap-8  shadow-xl  pt-40  sm:pt-40 lg:mx-0 lg:max-w-none sm:grid-cols-2   md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filteredClients.length > 0 ? (
              <>
                {filteredClients.map((client, i) => (
                  <RenderUser
                    key={i}
                    client={client}
                  />
                ))}
              </>
            ) : (
              <>
                {clients?.map((client, i) => (
                  <RenderUser
                    key={i}
                    client={client}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientList;
