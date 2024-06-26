import CreditCardIcon from "@mui/icons-material/CreditCard";
import { SchoolData } from "../interfaces/School";

const ChequeStats: React.FC<SchoolData> = ({ schools }) => {
  // Calculate the number of bounced cheques
  let bouncedCheques: number = 0;

  schools.map((school) => {
    school.invoices.forEach((inv) => {
      inv.collections.map((collection) => {
        if (collection.status === "Bounced") {
          bouncedCheques++;
        }
      })
    })
  })


  return (
    <div id="bounced-cheques-stats" className="bg-[#FFFFFF] rounded-md pt-6 pb-6">
      <div className="w-8 h-8 bg-[#F4F4F4]  rounded ml-6 flex justify-center items-center">
        <CreditCardIcon sx={{ color: "#080808" }} />
      </div>
      <p className="ml-6 mt-4 text-[#080808]">Number of Bounced Cheques</p>
      <h2 className="ml-6 text-[#080808] font-bold text-4xl">
        {bouncedCheques}
      </h2>
    </div>
  );
};

export default ChequeStats;
