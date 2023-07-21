import { useState, useEffect } from 'react';

const Bam = ({bamData, handleDelBam}) => {

    
    
    return (
    <tr key={bamData._id} >
      <th>
        <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
            className="shadow-1-strong rounded-circle"
            alt="avatar 1"
            style={{ width: "55px", height: "auto" }}
        />
        <span className="ms-2">{bamData.assignee}</span>
        </th>
        <td className="align-middle">
        <span>{bamData.bamName}</span>
        </td>
        <td className="align-middle">
        <h6 className="mb-0">
            <span className="badge bg-danger">{bamData.dueDate}</span>
        </h6>
        </td>
        <td className="align-middle">{bamData.points}</td>
        <td className="align-middle">
        <a href="#!" data-mdb-toggle="tooltip" title="Done">
            <i className="fas fa-check text-success me-3"></i>
        </a>
        <a href="#!" data-mdb-toggle="tooltip" title="Remove">
            <i className="fas fa-trash-alt text-danger"></i>
        </a>
        </td>
    </tr>
    )
};

export default Bam;