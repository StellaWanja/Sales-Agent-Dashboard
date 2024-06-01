import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { SchoolData } from "../interfaces/School";

const RevenueStats: React.FC<SchoolData> = ({ schools }) => {
  // Calculate the overall revenue collected and revenue per product
  const revenueBreakdown = schools.reduce<Record<string, number>>(
    (acc, school) => {
      school.products.forEach((product) => {
        if (!acc[product]) {
          acc[product] = 0;
        }
      });

      school.collections.forEach((collection) => {
        const equalShare = collection.amount / school.products.length;
        school.products.forEach((product) => {
          acc[product] += equalShare;
        });
      });

      return acc;
    },
    {}
  );

  const overallRevenue = Object.values(revenueBreakdown).reduce(
    (total, amount) => total + amount,
    0
  );

  return (
    <div className="bg-[#FFFFFF] w-1/3 mobile:w-full rounded-md pb-6">
      <div className="w-8 h-8 bg-[#F4F4F4] rounded mt-6 ml-6 flex justify-center items-center">
        <AttachMoneyIcon sx={{ color: "#080808" }} />
      </div>
      <p className="ml-6 mt-4 text-[#080808]">Overall Revenue Collected</p>
      <h2 className="ml-6 text-[#080808] font-bold text-4xl">
        {overallRevenue.toFixed(2)}
      </h2>
      <p className="ml-6 mt-4 text-[#080808]">Revenue Breakdown by Product:</p>
      <ul>
        {Object.keys(revenueBreakdown).map((product, index) => (
          <li key={index} className="ml-6 mt-1 text-[#080808] font-bold">
            {product}: {revenueBreakdown[product].toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RevenueStats;
