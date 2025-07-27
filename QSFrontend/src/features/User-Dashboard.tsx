// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { UsAppSidebar } from "@/components/User - Sidebar";
// import { Label } from "@/components/ui/label";
// import { LineChart } from "@mui/x-charts";

// export function UserDashboard() {
//   return (
//     <div>
//       <SidebarProvider>
//         <div className="fixed top-0">
//           <UsAppSidebar />
//           <SidebarTrigger className="size-10" />
//         </div>
//         <div className="flex flex-col">
//           <div className="flex flex-col w-80 ml-10 mt-12 ">
//             <Label className="text-black font-medium mb-2 text-base">
//               Usage Analythics and Predictions
//             </Label>
//           </div>
//           <LineChart
//             xAxis={[{ scaleType: "point", data: ["a", "b", "c", "d", "e"] }]}
//             series={[
//               {
//                 data: [10, 20, 30, 40, 50],
//                 label: "Series U",
//               },
//             ]}
//             width={500}
//             height={300}
//           />
//         </div>
//       </SidebarProvider>
//     </div>
//   );
// }
// In your React component (e.g., UserDashboard.jsx)
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UsAppSidebar } from "@/components/User - Sidebar";
import { Label } from "@/components/ui/label";
// If you want to display the static image:
// import { LineChart } from "@mui/x-charts"; // Keep if you want to render with MUI charts from JSON data

export function UserDashboard() {
  const [plotUrl, setPlotUrl] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dateFormat, setDateFormat] = useState("day");
  const [scope, setScope] = useState(1);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a CSV file.");
      return;
    }

    setLoading(true);
    setError(null);
    setPlotUrl("");
    setForecastData([]);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("date_format", dateFormat);
    formData.append("scope", scope);

    try {
      // Make sure this URL matches your FastAPI server's address
      const response = await fetch("http://127.0.0.1:8000/predict_and_plot/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setPlotUrl(`http://127.0.0.1:8000${data.plot_url}`); // Prepend base URL for full path
      setForecastData(data.forecast_data);
      console.log("Forecast Data:", data.forecast_data);
    } catch (e) {
      setError(e.message);
      console.error("Error fetching forecast:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center place-self-center h-full">
      <SidebarProvider>
        <div className="fixed top-0">
          <UsAppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="flex flex-col p-4 md:p-8 lg:p-12">
          <div className="flex flex-col w-full md:w-80 ml-0 md:ml-10 mt-12 ">
            <Label className="text-black font-medium mb-4 text-lg">
              Usage Predictions
            </Label>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <Label
                  htmlFor="csvFile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload CSV File:
                </Label>
                <input
                  type="file"
                  id="csvFile"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                />
              </div>

              <div>
                <Label
                  htmlFor="dateFormat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date Format:
                </Label>
                <select
                  id="dateFormat"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="day">Day</option>
                  <option value="month">Month</option>
                </select>
              </div>

              <div>
                <Label
                  htmlFor="scope"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prediction Scope:
                </Label>
                <select
                  id="scope"
                  value={scope}
                  onChange={(e) => setScope(parseInt(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value={1}>1 (e.g., 365 days / 12 months)</option>
                  <option value={2}>2 (e.g., 730 days / 24 months)</option>
                  <option value={3}>3 (e.g., 1095 days / 36 months)</option>
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Forecast"}
              </button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {plotUrl && (
              <div className="mt-8">
                <Label className="text-black font-medium mb-2 text-base">
                  Forecast Plot
                </Label>
                <img
                  src={plotUrl}
                  alt="Usage Predictions Plot"
                  className="w-full h-auto max-w-xl rounded-lg shadow-md"
                  // You might want to adjust max-width or use responsive classes
                />
              </div>
            )}

            {/* Optional: Display raw forecast data in a table */}
            {forecastData.length > 0 && (
              <div className="mt-8">
                <Label className="text-black font-medium mb-2 text-base">
                  Raw Forecast Data (Last 5 entries)
                </Label>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Forecast (yhat)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lower Bound
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Upper Bound
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {forecastData.slice(-5).map(
                        (
                          row,
                          index // Show last 5 rows
                        ) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.ds}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.yhat.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.yhat_lower.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.yhat_upper.toFixed(2)}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
