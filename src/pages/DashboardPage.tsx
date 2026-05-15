import { Box } from "@mui/material";
import { PageLayout } from "../components/layout/PageLayout";
import Sidebar from "../components/Sidebar";
import { ContentLayout } from "../components/layout/ContentLayout";
import { DashboardGrid } from "../components/layout/DashboardGrid";
import { TotalDeviceCard } from "../components/DashboardCards/TotalDeviceCard";
import { DeviceActivityCard } from "../components/DashboardCards/DeviceActivityCard";

export default function DashboardPage() {
  return (
    <>
      <PageLayout>
        <Sidebar />
        <ContentLayout>
          <DashboardGrid padding="30px" gridTemplate="repeat(4, 1fr)">
            <TotalDeviceCard />
            <TotalDeviceCard />
            <TotalDeviceCard />
            <TotalDeviceCard />
          </DashboardGrid>

          <DashboardGrid padding="0px 30px 30px 30px" gridTemplate="75% 25%">
            <DeviceActivityCard />

            <TotalDeviceCard />
          </DashboardGrid>
        </ContentLayout>
      </PageLayout>
    </>
  );
}
