import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { SchoolData } from "../interfaces/School";

interface RevenuePerProduct {
  'Zeraki Analytics': number;
  'Zeraki Finance': number;
  'Zeraki Timetable': number;
}

const RevenueStats: React.FC<SchoolData> = ({ schools }) => {
  // Calculate the overall revenue collected and revenue per product
  let overallRevenue = 0;
  const revenuePerProduct:RevenuePerProduct= {
    "Zeraki Analytics": 0,
    "Zeraki Finance": 0,
    "Zeraki Timetable": 0,
  };
  schools.forEach((school) => {
    school.invoices.forEach((invoice) => {
      overallRevenue += invoice.amount;
      school.products.forEach((product) => {
        revenuePerProduct[product as keyof RevenuePerProduct] += invoice.amount / school.products.length;
      });
    });
  });

  return (
    <div
      id="revenue-stats"
      className="bg-[#FFFFFF] w-1/3 mobile:w-full rounded-md pb-6"
    >
      <div className="w-8 h-8 bg-[#F4F4F4] rounded mt-6 ml-6 flex justify-center items-center">
        <AttachMoneyIcon sx={{ color: "#080808" }} />
      </div>
      <p className="ml-6 mt-4 text-[#080808]">Overall Revenue Collected</p>
      <h2 className="ml-6 text-[#080808] font-bold text-4xl">
        {overallRevenue.toFixed(2)}
      </h2>
      <p className="ml-6 mt-4 text-[#080808]">Revenue Breakdown by Product:</p>
      <ul>
        {Object.keys(revenuePerProduct).map((product, index) => (
          <li key={index} className="ml-6 mt-1 text-[#080808] font-bold">
            {product}: {revenuePerProduct[product  as keyof RevenuePerProduct].toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RevenueStats;
