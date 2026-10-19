import { ContentLayout } from "../components/layout/ContentLayout";
import {
  deleteDevice,
  getAllDevices,
  updateDevice,
} from "../services/deviceApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { DeviceData, DeviceForm } from "../types/device";
import { OptionMenu, type MenuOptions } from "../components/ui/OptionMenu";
import { useState, type MouseEvent } from "react";
import { DeviceListFooter } from "../components/deviceList/DeviceListFooter";
import { DeviceRecordsModal } from "../components/deviceList/DeviceRecordsModal";
import { Header } from "../components/ui/Header";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { DeviceModal } from "../components/deviceList/DeviceModal";
import { deviceToRow } from "../utils/rowMapper";
import { EntityList } from "../components/entityList/EntityList";

export function DevicesPage() {
  const {
    data: devices,
    isLoading,
    isLoadingError,
  } = useQuery<DeviceData[] | null>({
    queryKey: ["devices"],
    queryFn: getAllDevices,
    staleTime: 1000 * 60 * 2,
  });
  const queryClient = useQueryClient();

  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);
  const [isRecordListOpen, setIsRecordListOpen] = useState(false);
  const handleClose = () => setIsRecordListOpen(false);
  const handleOpen = (device: DeviceData) => {
    setSelectedDevice(device);
    setIsRecordListOpen(true);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAction = (type: MenuOptions, device: DeviceData) => {
    if (type === "edit") {
      setSelectedDevice(device);
      setIsEditModalOpen(true);
    } else if (type === "delete") {
      setSelectedDevice(device);
      setIsDeleteDialogOpen(true);
    } else {
      handleOpen(device);
    }
  };
  const [menuIsOpen, setMenuIsOpen] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const findDevice = (deviceId: string) =>
    devices?.find((d) => d.id === deviceId);

  // left click -> records modal
  const handleRowClick = (deviceId: string) => {
    const device = findDevice(deviceId);
    if (device) handleOpen(device);
  };

  // right click -> option menu at cursor position
  const handleRowContextMenu = (
    deviceId: string,
    event: MouseEvent<HTMLElement>,
  ) => {
    const device = findDevice(deviceId);
    if (!device) return;
    setSelectedDevice(device);
    setMenuIsOpen({ top: event.clientY, left: event.clientX });
  };

  const handleMenuClose = () => setMenuIsOpen(null);

  const handleMenuAction = (type: MenuOptions) => {
    if (selectedDevice) handleAction(type, selectedDevice);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!selectedDevice) return;
    await deleteDevice(selectedDevice.id);
    queryClient.invalidateQueries({ queryKey: ["devices"] });
  };

  const handleUpdate = async (form: DeviceForm, deviceId: string | null) => {
    if (!deviceId) return;
    await updateDevice(form, deviceId);
    queryClient.invalidateQueries({ queryKey: ["devices"] });
  };

  return (
    <>
      <ContentLayout overflow="hidden">
        <Header page="Devices" tab="Telematics" />
        <EntityList
          rows={devices?.map(deviceToRow)}
          onRowClick={handleRowClick}
          onRowContextMenu={handleRowContextMenu}
          isLoading={isLoading}
          isLoadingError={isLoadingError}
        />
        <DeviceListFooter />
      </ContentLayout>
      <OptionMenu
        menuIsOpen={menuIsOpen}
        handleMenuClose={handleMenuClose}
        handleAction={handleMenuAction}
        entity="devices"
      />
      <DeviceModal
        open={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        onSubmit={handleUpdate}
        initialData={selectedDevice}
      />
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title={`Are you sure you want to delete ${selectedDevice?.imei}?`}
        message="Deleting this device will permanently remove all of its data. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
      <DeviceRecordsModal
        isOpen={isRecordListOpen}
        handleClose={handleClose}
        device={selectedDevice ? selectedDevice : null}
      />
    </>
  );
}
