import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Study Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl">Documents</h2>
          <p className="text-3xl">{data.totalDocuments}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl">Bookmarks</h2>
          <p className="text-3xl">{data.totalBookmarks}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl">Revisions Today</h2>
          <p className="text-3xl">{data.todayRevisions}</p>
        </div>

      </div>

    </div>

  );
}

export default Dashboard;
