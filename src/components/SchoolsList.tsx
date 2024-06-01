import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import { SchoolData } from "../interfaces/School";

const SchoolsList: React.FC<SchoolData> = ({ schools, onSelectSchool }) => {
  return (
    <div className="bg-[#FFFFFF] mobile:w-full">
      <h1 className="text-center text-[#080808] font-bold text-2xl pt-8">
        Schools
      </h1>

      <ul className="rounded-md p-6 flex flex-col">
        {schools.map((school) => (
          <li
            key={school.id}
            className="bg-[#F9F8FE] cursor-pointer rounded-md ml-6 mt-4 text-[#080808] font-bold flex place-items-center"
            onClick={() => onSelectSchool(school.id)}
          >
            <div className="w-8 h-8 bg-[#F4F4F4] ml-6 rounded flex justify-center items-center">
              <SchoolIcon sx={{ color: "#080808" }} />
            </div>
            {school.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolsList;
