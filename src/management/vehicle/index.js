import React, { useState, useEffect } from "react";
import DashboardLayout from "../../component/dashboardLayout";
import { useDispatch } from "react-redux";
// import { getAllRoles } from '../../store/actions/rolesAndPermissions'
import TableSimpleUI from "../../component/tables/TableSimpleUI";
import { formStyle } from "../../style/adminStyle";
import VehicleForm from "./vehicleForm";
import { RiRefreshLine } from "react-icons/ri";
import {
  getAllVehicles,
  updateVehicleDetails,
} from "../../store/features/vehicle/vehicleService";
import { useSelector } from "react-redux";
import { imageURL } from "../../store/api";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import VehicleEditForm from "./vehicleEditForm";

const Vehicle = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [addNewModal, setaddNewModal] = useState(false);
  const [selectedVehicleEdit, setselectedVehicleEdit] = useState(null);

  const { vehicles } = useSelector((state) => state.vehicles);
  let [vehicleList, setvehicleList] = useState([]);

  useEffect(() => {
    getAllVehiclesHandler();
  }, []);

  useEffect(() => {
    setvehicleList(vehicles);
  }, [vehicles]);

  const getAllVehiclesHandler = () => {
    dispatch(getAllVehicles((data) => setvehicleList(data)));
  };

  const viewDetailsHandler = (id) => {
    navigation(`/vehicle/${id}`);
  };

  const editDetailsHandler = (item) => {
    setselectedVehicleEdit(item);
  };

  const handleStatusUpdate = (item, index) => {
    dispatch(
      updateVehicleDetails(
        item._id,
        {
          status: item.status === "active" ? "inactive" : "active",
        },
        () => {
          dispatch(getAllVehicles((data) => setvehicleList(data)));
        }
      )
    );
  };
  const renderRoleTableBody = (item, index) => {
    return (
      <>
        <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
          <img
            src={`${imageURL}${item.images[0]}`}
            className={"w-20 rounded-md h-12"}
          />
        </td>
        <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
          {item.vin}
        </td>

        <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
          {item.status}
        </td>

        <td className="px-6 py-4 text-sm  items-center flex space-x-4 capitalize text-gray-800 whitespace-nowrap">
          <Switch
            onChange={() => handleStatusUpdate(item, index)}
            checked={item.status === "active"}
          />

          <button
            onClick={() => editDetailsHandler(item)}
            className="border-[1px] rounded-md border-gray-700 px-4 hover:shadow-md text-gray-700 py-1"
          >
            Edit
          </button>
          <button
            onClick={() => viewDetailsHandler(item._id)}
            className="border-[1px] rounded-md border-gray-700 px-4 hover:shadow-md text-gray-700 py-1"
          >
            View
          </button>
        </td>
      </>
    );
  };

  const defaultView = () => {
    return (
      <>
        <p className={`${formStyle.h1Dashboard} px-2`}>Vehicle Management</p>

        <div className="flex mt-4 items-center justify-between">
          <p
            className={`${formStyle.h1Dashboard} capitalize text-lg px-2 pt-4`}
          >
            All Vehicles
          </p>

          <div>
            <div className="flex space-x-4 text-xs text-white">
              <div
                onClick={() => getAllVehiclesHandler()}
                className="bg-secondary w-28  h-[35px] flex space-x-3  rounded-md items-center justify-center
         cursor-pointer hover:bg-primary duration-300 ease-in-out"
              >
                <RiRefreshLine size={15} />
                <p> Refresh</p>
              </div>
              <div
                onClick={() => setaddNewModal(true)}
                className="bg-secondary w-32  px-4 h-[35px] flex space-x-3  rounded-md items-center justify-center
         cursor-pointer hover:bg-primary duration-300 ease-in-out"
              >
                Add New Vehicle
              </div>
            </div>
          </div>
        </div>
        <TableSimpleUI
          thead={["Image", "Vin Number", "Status", "Action"]}
          data={vehicleList}
          tdcells={renderRoleTableBody}
        />
      </>
    );
  };

  return (
    <DashboardLayout>
      {/* <VehicleEditForm toggleForm={()=>setselectedVehicleEdit({})} data={selectedVehicleEdit}/>: */}
      {!!selectedVehicleEdit && Object.keys(selectedVehicleEdit).length > 0 ? (
        <VehicleForm
          edit={true}
          editData={selectedVehicleEdit}
          toggleForm={() => setselectedVehicleEdit({})}
        />
      ) : addNewModal ? (
        <VehicleForm toggleForm={() => setaddNewModal(!addNewModal)} />
      ) : (
        defaultView()
      )}
    </DashboardLayout>
  );
};

export default Vehicle;
