import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const AllProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID sản phẩm", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: "stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 80,
      flex: 0.7,
    },

    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "Preview",
      flex: 0.7,
      minWidth: 100,
      headerName: "Xem",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.discountPrice + " VNĐ",
        stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      <div className="w-full flex justify-center p-4">
        <div className="w-[95%]">
          <h3 className="text-[22px] pb-2">Tất cả sản phẩm</h3>
          {/* <div className="w-full min-h-[45vh] bg-white rounded"> */}
          <div className="w-full bg-white rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
