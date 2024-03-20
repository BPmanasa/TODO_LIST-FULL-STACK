import React from "react";
import "./todo.css";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableSortLabel } from "@mui/material";
const TodoCard = ({ title, description, priority, id, delid, display }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Desc</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{priority}</TableCell>
            <TableCell
              onClick={() => {
                display("block");
              }}
            >
              <GrDocumentUpdate className="card-icons" />
            </TableCell>
            <TableCell
              onClick={() => {
                delid(id);
              }}
            >
              <AiFillDelete className="card-icons del" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    // <div className="p-4 todo-card">

    //   <div>
    //     <h5>{title}</h5>
    //     <p>{description}</p>
    //     <p>{priority}</p>
    //     <p></p>
    //   </div>
    //   <div className="d-flex justify-content-around">
    //     <div
    //       className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
    // onClick={() => {
    //   display("block");
    // }}
    //     >
    //       <GrDocumentUpdate className="card-icons" />
    //       Update
    //     </div>
    //     <div
    //       className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
    // onClick={() => {
    //   delid(id);
    // }}
    //     >
    //       <AiFillDelete className="card-icons del" />
    //       Delete
    //     </div>
    //   </div>
    // </div>
  );
};

export default TodoCard;
