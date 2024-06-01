import SchoolIcon from "@mui/icons-material/School";
import { SchoolData } from "../interfaces/School";
import { useEffect } from "react";

interface SignupStatsProps {
  schools: SchoolData[];
  onProductBreakdown: (productBreakdownData: Record<string, number>) => void;
}

const SignupStats: React.FC<SignupStatsProps> = ({
  schools,
  onProductBreakdown,
}) => {
  // Calculate the total number of new school sign-ups
  const totalSignUps = schools.length;

  // Calculate the breakdown by product
  const productBreakdown = schools.reduce<Record<string, number>>(
    (acc, school) => {
      school.products.forEach((product: string | number) => {
        if (!acc[product]) {
          acc[product] = 0;
        }
        acc[product]++;
      });
      return acc;
    },
    {}
  );

  useEffect(() => {
    onProductBreakdown(productBreakdown);
  }, [onProductBreakdown]);

  return (
    <div className="bg-[#FFFFFF] w-1/3 mobile:w-full rounded-md pb-6">
      <div className="w-8 h-8 bg-[#F4F4F4] rounded mt-6 ml-6 flex justify-center items-center">
        <SchoolIcon sx={{ color: "#080808" }} />
      </div>
      <p className="ml-6 mt-4 text-[#080808]">
        Total Number of New School Sign-ups
      </p>
      <h2 className="ml-6 text-[#080808] font-bold text-4xl">{totalSignUps}</h2>
      <p className="ml-6 mt-4 text-[#080808]">Breakdown by Product:</p>
      <ul>
        {Object.keys(productBreakdown).map((product, index) => {
          return (
            <li key={index} className="ml-6 mt-1 text-[#080808] font-bold">
              {product}: {productBreakdown[product]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SignupStats;
