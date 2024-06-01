import { useState, useEffect } from "react";
import { School } from "../interfaces/School";
import CollectionStats from "../components/CollectionStats";
import SignupStats from "../components/SignupStats";
import RevenueStats from "../components/RevenueStats";
import ChequeStats from "../components/ChequeStats";
import PieCharts from "../components/PieCharts";
import BarCharts from "../components/BarCharts";

const Dashboard = () => {
  const [schoolsData, setSchoolsData] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  // Example data
  const productTargets = {
    "Zeraki Analytics": { achieved: 75, target: 100 },
    "Zeraki Finance": { achieved: 50, target: 120 },
    "Zeraki Timetable": { achieved: 90, target: 110 },
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
    <div className="w-full bg-[#F8F8F9] p-8 ">
      <div className="flex gap-8 mobile:flex-col ">
        {loading && !schoolsData && <p>Loading...</p>}
        <div className="mt-0 pt-0 w-1/3 mobile:w-full flex flex-col gap-8">
        {!loading && schoolsData && <CollectionStats schools={schoolsData} />}
        {!loading && schoolsData && <ChequeStats schools={schoolsData} />}

        </div>
        {!loading && schoolsData && <SignupStats schools={schoolsData} />}
        {!loading && schoolsData && <RevenueStats schools={schoolsData} />}
      </div>

      <PieCharts data={productTargets} />

      <h1 className="text-2xl font-bold mb-4">
        Distribution of Sign-ups Across School Types
      </h1>
      <BarCharts data={productTypeTargets} />
    </div>
  );
};

export default Dashboard;
