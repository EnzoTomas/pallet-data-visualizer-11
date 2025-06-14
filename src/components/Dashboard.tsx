
import { MainKPICards } from "./MainKPICards";
import { CircularProgress } from "./CircularProgress";
import { VolumeChart } from "./VolumeChart";
import { TrendChart } from "./TrendChart";
import { RejectAnalysisCharts } from "./RejectAnalysisCharts";
import { PalletRobot } from "./PalletRobot";

interface DashboardProps {
  filteredData: any[];
  aggregatedData: any;
  trendData: any[];
}

export const Dashboard = ({ filteredData, aggregatedData, trendData }: DashboardProps) => {
  const volumeData = filteredData.map(item => ({
    date: item.date,
    totalInseridos: item.totalInseridos,
    totalRejeitos: item.totalRejeitos
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <MainKPICards aggregatedData={aggregatedData} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <CircularProgress
          title="1º Turno"
          inseridos={aggregatedData.inseridos1T}
          rejeitos={aggregatedData.rejeitos1T}
          eficiencia={aggregatedData.aderencia1T}
          shiftNumber={1}
          data={filteredData}
        />
        <CircularProgress
          title="2º Turno"
          inseridos={aggregatedData.inseridos2T}
          rejeitos={aggregatedData.rejeitos2T}
          eficiencia={aggregatedData.aderencia2T}
          shiftNumber={2}
          data={filteredData}
        />
        <CircularProgress
          title="3º Turno"
          inseridos={aggregatedData.inseridos3T}
          rejeitos={aggregatedData.rejeitos3T}
          eficiencia={aggregatedData.aderencia3T}
          shiftNumber={3}
          data={filteredData}
        />
        <div className="flex items-center justify-center">
          <PalletRobot
            isActive={aggregatedData.totalInseridos > 0}
            efficiency={aggregatedData.eficiencia}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <VolumeChart volumeData={volumeData} />
        <TrendChart 
          trendData={trendData} 
          currentEfficiency={aggregatedData.eficiencia}
        />
      </div>

      <RejectAnalysisCharts data={filteredData} />
    </div>
  );
};
