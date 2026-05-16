import { PageLayout } from "../components/layout/PageLayout";
import Sidebar from "../components/Sidebar";
import { ContentLayout } from "../components/layout/ContentLayout";
import { DashboardGrid } from "../components/layout/DashboardGrid";
import { MetricCard } from "../components/DashboardCards/MetricCard";
import { DeviceActivityCard } from "../components/DashboardCards/DeviceActivityCard";

const TestKPIJSON = {
  Users: {
    Total: 12,
    Admin: 10,
    Users: 2,
  },
  Records: {
    Total: 9318,
    DailyRecords: 15,
  },
  Devices: {
    Total: 13,
    WeeklyDevices: 1,
  },
  Errors: {
    Total: 1,
    WeeklyErrors: 1,
  },
};

const result = Object.entries(TestKPIJSON).map((value, key) => {
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

          <DashboardGrid padding="0px 30px 30px 30px" gridTemplate="3fr 1fr">
            <DeviceActivityCard />
            <DeviceActivityCard />
          </DashboardGrid>
        </ContentLayout>
      </PageLayout>
    </>
  );
}
