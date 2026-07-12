import { ContentLayout } from "../components/layout/ContentLayout";
import { DashboardGrid } from "../components/layout/DashboardGrid";
import type {
  ConnMetrics,
  MetricCardData,
  MetricEntry,
} from "../types/dashboard";
import { ConnHealthCard } from "../components/dashboardCards/ConnHealthCard";
import { MetricCard } from "../components/dashboardCards/MetricCard";
import { DeviceActivityCard } from "../components/dashboardCards/DeviceActivityCard";
import { getMetricData } from "../services/dashboardApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const EmptyMetricCardJson: MetricCardData = {
  users: {
    total: 0,
    admin: 0,
    users: 0,
  },
  records: {
    total: 0,
    daily: 0,
  },
  devices: {
    total: 0,
    weekly: 0,
  },
  errors: {
    total: 0,
    weekly: 0,
  },
};

const ConnMetricsJson: ConnMetrics = {
  timestamp: "2023-10-01T12:00:00Z",
  latency: {
    lateRecords: 1,
    latePercentage: 9,
    latePerDevice: 4,
    futureRecords: 7,
    futurePercentage: 1,
    futurePerDevice: 5,
  },
  connections: {
    active: 97,
  },
  bandwidth: {
    used: 102.2,
    average: 12.4,
    series: [
      { timestamp: "Mon", value: 3.5 },
      { timestamp: "Tue", value: 5.1 },
      { timestamp: "Wed", value: 4.8 },
      { timestamp: "Thu", value: 5.7 },
      { timestamp: "Fri", value: 6.9 },
      { timestamp: "Sat", value: 2.1 },
      { timestamp: "Sun", value: 1.2 },
    ],
  },
};

const result: MetricEntry[] = Object.entries(EmptyMetricCardJson).map(
  ([category, value]) => {
    return {
      category,
      value,
    };
  },
);

export function DashboardPage() {
  const { data: metrics } = useQuery<MetricEntry[] | null>({
    queryKey: ["metrics"],
    queryFn: getMetricData,
    staleTime: 1000 * 60 * 1,
    initialData: result,
  });
  return (
    <>
      <ContentLayout>
        <DashboardGrid padding="30px" gridTemplate="repeat(4, 1fr)">
          {metrics?.map((category) => (
            <MetricCard
              key={category.category}
              cardType={category.category}
              kpiValues={category.value}
            />
          ))}
        </DashboardGrid>
        <DashboardGrid padding="0px 30px 30px 30px" gridTemplate="4fr 1fr">
          <DeviceActivityCard />
          <ConnHealthCard metric={ConnMetricsJson} />
        </DashboardGrid>
      </ContentLayout>
    </>
  );
}
