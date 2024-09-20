import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineArrowRight, AiOutlineDollar } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/orderActions";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellersActions";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers, sellersLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const columns = [
    { field: "id", headerName: "ID đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Đã giao hàng" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Ngày đặt hàng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + "VNĐ",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center p-4">
          <div className="w-[95%]">
            <h3 className="text-[22px] pb-2">Tổng quan</h3>
            <div className="w-full block 800px:flex items-center justify-between">
              <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5 flex flex-col justify-between">
                <div className="flex items-center justify-start pl-4">
                  <AiOutlineDollar
                    size={30}
                    className="mr-2"
                    fill="#00000085"
                  />
                  <h3
                    className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    Tổng thu nhập
                  </h3>
                </div>
                <h5 className="pt-2 text-[22px] font-[500] text-center pb-14">
                  10.000.000
                </h5>
              </div>
              <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5 flex flex-col justify-between">
                <div className="flex items-center justify-start pl-4">
                  <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                  <h3
                    className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    Người bán
                  </h3>
                </div>
                <h5 className="pt-2 text-[22px] font-[500] text-center">
                  {sellers && sellers.length}
                </h5>
                <Link to="/admin-sellers">
                  <h5 className="pt-4 text-[#077f9c] text-center">
                    Xem người bán
                  </h5>
                </Link>
              </div>
              <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5 flex flex-col justify-between">
                <div className="flex items-center justify-start pl-4">
                  <AiOutlineDollar
                    size={30}
                    className="mr-2"
                    fill="#00000085"
                  />
                  <h3
                    className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    Đơn hàng
                  </h3>
                </div>
                <h5 className="pt-2 text-[22px] font-[500] text-center">
                  {adminOrders && adminOrders.length}
                </h5>
                <Link to="/admin-orders">
                  <h5 className="pt-4 text-[#077f9c] text-center">
                    Xem đơn hàng
                  </h5>
                </Link>
              </div>
            </div>

            <br />
            <h3 className="text-[22px] pb-2">Đơn hàng mới nhất</h3>
            {/* <div className="w-full min-h-[45vh] bg-white rounded"> */}
            <div className="w-full bg-white rounded">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableRowSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
