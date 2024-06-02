import { useState, useEffect, useCallback } from "react";
import { School } from "../interfaces/School";
import CollectionStats from "../components/CollectionStats";
import SignupStats from "../components/SignupStats";
import RevenueStats from "../components/RevenueStats";
import ChequeStats from "../components/ChequeStats";
import PieCharts from "../components/PieCharts";
import BarCharts from "../components/BarCharts";
import UpcomingInvoices from "../components/UpcomingInvoices";

type ProductName = "Zeraki Analytics" | "Zeraki Finance" | "Zeraki Timetable";

const Dashboard: React.FC = () => {
  const [schoolsData, setSchoolsData] = useState<School[]>([]);
  const [product, setProduct] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const handleProductBreakdown = useCallback(
    (productBreakdownData: Record<string, number>) => {
      setProduct(productBreakdownData);
    },
    []
  );

  // Product Targets
  const productTargets = {
    "Zeraki Analytics": { achieved: product["Zeraki Analytics"], target: 5 },
    "Zeraki Finance": { achieved: product["Zeraki Finance"], target: 5 },
    "Zeraki Timetable": { achieved: product["Zeraki Timetable"], target: 6 },
  };

  const productTypeTargets: Record<
    ProductName,
    { primary: number; secondary: number; igcse: number }
  > = {
    "Zeraki Analytics": { primary: 0, secondary: 0, igcse: 0 },
    "Zeraki Finance": { primary: 0, secondary: 0, igcse: 0 },
    "Zeraki Timetable": { primary: 0, secondary: 0, igcse: 0 },
  };

  schoolsData.forEach((school: School) => {
    school.products.forEach((product) => {
      if (productTypeTargets[product as ProductName]) {
        if (school.type === "Primary") {
          productTypeTargets[product as ProductName].primary += 1;
        } else if (school.type === "Secondary") {
          productTypeTargets[product as ProductName].secondary += 1;
        } else {
          productTypeTargets[product as ProductName].igcse += 1;
        }
      }
    });
  });

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("http://localhost:3000/schools");
        const data = await response.json();
        setSchoolsData(data);
      } catch (err) {
        setSchoolsData([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="w-full bg-[#F8F8F9] p-10 overflow-hidden">
      <div className="flex gap-8 mobile:flex-col">
        {loading && !schoolsData && <p>Loading...</p>}
        <div className="mt-0 pt-0 w-1/4 mobile:w-full flex flex-col gap-8">
          {!loading && schoolsData && <CollectionStats schools={schoolsData} />}
          {!loading && schoolsData && <ChequeStats schools={schoolsData} />}
        </div>
        {!loading && schoolsData && (
          <SignupStats
            schools={schoolsData}
            onProductBreakdown={handleProductBreakdown}
          />
        )}
        {!loading && schoolsData && <RevenueStats schools={schoolsData} />}
      </div>

      <div className="bg-[#ffffff] mt-8">
        <h2 className="text-center text-[#080808] font-bold text-2xl pt-8">
          Signup Targets
        </h2>
        {!loading && schoolsData && (
          <PieCharts data={productTargets} schools={schoolsData} />
        )}
      </div>

      <div className="bg-[#ffffff] mt-8">
        <h2 className="text-center text-[#080808] font-bold text-2xl pt-8">
          Distribution of Sign-ups Across School Types
        </h2>
        {!loading && schoolsData && <BarCharts data={productTypeTargets} />}
      </div>

      <div className="mt-8">
        {!loading && schoolsData && <UpcomingInvoices schools={schoolsData} />}
      </div>
    </div>
  );
};

export default Dashboard;
