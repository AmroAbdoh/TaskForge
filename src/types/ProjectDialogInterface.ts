import type { Project } from "./domain";

export interface ProjectDialogProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}



