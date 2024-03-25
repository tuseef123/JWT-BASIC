import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const { dataValue, error, loading } = useSelector((state) => state.data);
  console.log(dataValue);
  const handleGetData = async () => {
    try {
      const res = await fetch("/api/v1/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataValue}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Something went wrong,please try again");
      }
      setDashboardData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center  py-2">
      <div className="h-80 w-[500px]  px-12">
        <div className="flex flex-col items-center gap-2">
          <h2 className=" font-bold text-xl">Dashboard</h2>
          {dataValue ? (
            <p className="text-green-500 text-sm">token present</p>
          ) : (
            <p className="text-red-500 text-sm">No token passed</p>
          )}
        </div>
        <div className="py-12">
          {dashboardData ? (
            <div className="flex flex-col px-8 gap-4">
              <h2 className="text-xl ">{dashboardData.msg}</h2>
              <p className="w-[250px]">{dashboardData.secert}</p>
            </div>
          ) : (
            <p className="text-center">Not authrized to access this route</p>
          )}
        </div>
        <button
          onClick={handleGetData}
          className="w-full h-6 font-semibold capitalize  flex items-center justify-center text-white py-4 bg-blue-400 cursor-pointer"
        >
          Get Data
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
