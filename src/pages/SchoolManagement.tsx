import { School } from "../interfaces/School";
import { useEffect, useState } from "react";
import SchoolsList from "../components/SchoolsList";
import SchoolDetails from "../components/SchoolDetails";

const SchoolManagement = () => {
  const [schoolsData, setSchoolsData] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

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

  const handleSchoolSelect = (schoolId: string) => {
    const school = schoolsData.find((s) => s.id === schoolId);
    setSelectedSchool(school || null);
  };

  return (
    <div className="w-full bg-[#F8F8F9] p-10 overflow-hidden">
      {loading && !schoolsData && <p>Loading...</p>}
      <div className="flex flex-col gap-8">
        {!loading && schoolsData && (
          <SchoolsList
            schools={schoolsData}
            onSelectSchool={handleSchoolSelect}
          />
        )}
        {!loading && selectedSchool && (
          <SchoolDetails school={selectedSchool} />
        )}
      </div>
    </div>
  );
};

export default SchoolManagement;
