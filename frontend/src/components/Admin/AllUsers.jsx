import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/userActions";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../server";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });
    dispatch(getAllUsers());
  };

  const columns = [
    { field: "id", headerName: "ID người dùng", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Tên",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "role",
      headerName: "Vai trò",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "jointAt",
      headerName: "Ngày tham gia",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Xóa",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  users &&
    users.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        jointAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-[95%]">
        <h3 className="text-[22px] pb-2">Tất cả người dùng</h3>
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
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded-2xl shadow p-5">
              <h3 className="text-[25px] text-center py-5 text-[#000000cb]">
                Bạn có chắc chắn muốn xóa người dùng này?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Hủy
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Xóa
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
