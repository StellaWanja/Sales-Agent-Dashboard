import CollectionsIcon from "@mui/icons-material/Collections";
import { SchoolData } from "../interfaces/School";

const CollectionStats: React.FC<SchoolData> = ({ schools }) => {
  // Calculate the total number of collections
  let totalCollections = 0;
  schools.forEach(school => {
    school.invoices.forEach(invoice => {
      totalCollections += invoice.collections.length;
    });
  });

  return (
    <div id="collection-stats" className="bg-[#3570FF] rounded-md pt-6 pb-6">
      <div className="w-8 h-8 bg-[#729BFF]  rounded ml-6 flex justify-center items-center">
        <CollectionsIcon sx={{ color: "#FFFFFF" }} />
      </div>
      <p className="ml-6 mt-4 text-[#FFFFFF]">Total Number of Collections</p>
      <h2 className="ml-6 text-[#FFFFFF] font-bold text-4xl">
        {totalCollections}
      </h2>
    </div>
  );
};

export default CollectionStats;
