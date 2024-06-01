import { useState, useEffect, useCallback } from "react";
import { School } from "../interfaces/School";
import CollectionStats from "../components/CollectionStats";
import SignupStats from "../components/SignupStats";
import RevenueStats from "../components/RevenueStats";
import ChequeStats from "../components/ChequeStats";
import PieCharts from "../components/PieCharts";
import BarCharts from "../components/BarCharts";
import UpcomingInvoices from "../components/UpcomingInvoices";

const Dashboard: React.FC = () => {
  const [schoolsData, setSchoolsData] = useState<School[]>([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleProductBreakdown = useCallback(
    (productBreakdownData: Record<string, number>) => {
      setProduct(productBreakdownData);
    },
    []
  );

  // Example data
  const productTargets = {
    "Zeraki Analytics": { achieved: product["Zeraki Analytics"], target: 5 },
    "Zeraki Finance": { achieved: product["Zeraki Finance"], target: 5 },
    "Zeraki Timetable": { achieved: product["Zeraki Timetable"], target: 6 },
  };

  const productTypeTargets = {
    "Zeraki Analytics": { primary: 50, secondary: 30, igcse: 20 },
    "Zeraki Finance": { primary: 40, secondary: 35, igcse: 25 },
    "Zeraki Timetable": { primary: 45, secondary: 40, igcse: 15 },
  };

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
