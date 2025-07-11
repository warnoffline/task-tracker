import { DoneIcon, InProgressIcon, OpenIcon } from "@/shared/assets";

export const taskStatusIcon: Record<string, React.ReactNode> = {
  open: <OpenIcon />,
  inProgress: <InProgressIcon />,
  done: <DoneIcon />,
};
