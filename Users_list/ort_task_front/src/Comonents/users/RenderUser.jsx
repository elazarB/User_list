import React, { useCallback, useState } from "react";
import DeleteUser from "./DeleteUser";
import { TbListDetails } from "react-icons/tb";
import useAddMapModal from "../../Hooks/UseAddMapModal";
import { useStateContext } from "../../context/context";
import { Tooltip } from "antd";

export default function RenderUser({ client }) {
  const addMapModal = useAddMapModal();
  const { setIPAddress } = useStateContext();
  const onClick = useCallback(() => {
    setIPAddress(client.ipAddress);
    addMapModal.onOpen();
  }, []);

  return (
    <div>
      <div className="flex w-72 sm:w-52 pb-4 border border-slate-500/60 rounded-xl shadow-lg flex-col items-start justify-between transition-all hover:scale-105 duration-500 card_area">
        <div className="w-full mb-2 border-b border-slate-500 p-4 justify-center flex items-center gap-3">
          <img
            src={`https://fakeimg.pl/50x50/?text=${client.fullName.substring(
              0,
              2
            )}&font_size=40`}
            alt=""
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <p className="font-semibold text-gray-400">{client.fullName}</p>
        </div>

        <div className="text-sm text-gray-400 p-4 flex w-full flex-col gap-2 leading-6">
          <div className=" flex justify-between">
            <span>Phone: </span>
            <a
              className="text-sky-500 hover:underline"
              href={`tel:${client.phoneNumber}`}
            >
              {client.phoneNumber}
            </a>
          </div>
          <div className="flex justify-between">
            <span>Identity: </span>
            <span>{client.id}</span>
          </div>
          <div className="flex justify-between">
            <span>IP: </span>
            <span>{client.ipAddress}</span>
          </div>
          <div className="flex justify-between">
            IP Details:{" "}
            <Tooltip placement="bottomRight" title={'Click to see details'}>
        <span
              onClick={onClick}
              className="flex items-center text-xl text-sky-600 hover:scale-125 duration-500"
            >
              <TbListDetails />
            </span>
      </Tooltip>
            
          </div>
        </div>
        <div className="-z-0 mx-auto del_btn hover:scale-105 duration-300 ">
          <DeleteUser client={client} />
        </div>
      </div>
    </div>
  );
}
