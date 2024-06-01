import { School } from "../interfaces/School";
import BasicDetails from "./BasicDetails";
import Invoices from "./Invoices";

interface SchoolDetailsProps {
  school: School;
}

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ school }) => {
  return (
    <div className="bg-[#FFFFFF] px-12 pt-8 pb-8 ">
      <BasicDetails school={school} />
      <br />
      <Invoices school={school} />
    </div>
  );
};

export default SchoolDetails;
