import React from "react";
import { School } from "../interfaces/School";

interface SchoolDetailsProps {
  school: School;
}

const BasicDetails: React.FC<SchoolDetailsProps> = ({ school }) => {
  return (
    <div>
      <h2 className="text-[#080808] font-bold text-2xl">{school.name}</h2>
      <p className="text-[#080808]">
        <span className="font-bold">Type:</span> {school.type}
      </p>
      <p className="text-[#080808]">
        <span className="font-bold">Products:</span>{" "}
        {school.products.join(", ")}
      </p>
      <p className="text-[#080808]">
        <span className="font-bold">County:</span> {school.county}
      </p>
      <p className="text-[#080808]">
        <span className="font-bold">Registration Date: </span>
        {new Date(school.registration_date).toLocaleDateString()}
      </p>
      <p className="text-[#080808]">
        <span className="font-bold">Contact Information:</span>{" "}
        {school.contact_info.phone}, {school.contact_info.email}
      </p>
      <p className="text-[#080808]">
        {" "}
        <span className="font-bold">School Balance:</span>{" "}
        {school.school_balance}
      </p>
    </div>
  );
};

export default BasicDetails;
