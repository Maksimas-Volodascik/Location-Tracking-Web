import { PageLayout } from "../components/layout/PageLayout";
import Sidebar from "../components/Sidebar";
import { ContentLayout } from "../components/layout/ContentLayout";
import { DashboardGrid } from "../components/layout/DashboardGrid";
import { MetricCard } from "../components/dashboardCards/MetricCard";
import { DeviceActivityCard } from "../components/dashboardCards/DeviceActivityCard";
import { ConnHealthCard } from "../components/dashboardCards/ConnHealthCard";
import type { ConnMetrics } from "../types/dashboard";

const MetricCardJson = {
  users: {
    total: 12,
    admin: 10,
    users: 2,
  },
  records: {
    total: 9318,
    daily: 15,
  },
  devices: {
    total: 13,
    weekly: 1,
  },
  errors: {
    total: 1,
    weekly: 1,
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
      { timestamp: "Mon", value: 2.5 },
      { timestamp: "Tue", value: 3.6 },
      { timestamp: "Wed", value: 4.8 },
      { timestamp: "Thu", value: 5.7 },
      { timestamp: "Fri", value: 6.9 },
      { timestamp: "Sat", value: 7.1 },
      { timestamp: "Sun", value: 8.3 },
    ],
  },
};

const result = Object.entries(MetricCardJson).map((value, key) => {
  return {
    category: key,
    value: value,
  };
});

export default function DashboardPage() {
  return (
    <>
      <PageLayout>
        <Sidebar />
        <ContentLayout>
          <DashboardGrid padding="30px" gridTemplate="repeat(4, 1fr)">
            {result.map((category) => (
              <MetricCard
                kpiValues={category.value[1]}
                cardType={category.value[0]}
              />
            ))}
          </DashboardGrid>

          <DashboardGrid padding="0px 30px 30px 30px" gridTemplate="4fr 1fr">
            <DeviceActivityCard />
            <ConnHealthCard metric={ConnMetricsJson} />
          </DashboardGrid>
        </ContentLayout>
      </PageLayout>
    </>
  );
}
