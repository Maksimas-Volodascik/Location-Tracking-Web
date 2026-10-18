import type { MouseEvent, ReactNode } from "react";

export interface EntityListProps {
  rows: ListRow[] | undefined | null;
  onRowClick?: (id: string, event: MouseEvent<HTMLElement>) => void;
  onRowContextMenu?: (id: string, event: MouseEvent<HTMLElement>) => void; // right click
  isLoadingError?: boolean;
  isLoading?: boolean;
}

export type ListRow = {
  id: string;
  icon?: ReactNode; // avatar
  main: TextBlock;
  details?: TextBlock; // Model Name and Serial GUID
  tags?: ListTag[];
};

export type TextBlock = {
  primary: string;
  secondary?: string;
};

export type TagStyle = {
  color: string;
  bgcolor: string;
  borderColor: string;
};

export type ListTag = {
  label: string;
  sx?: TagStyle;
};
