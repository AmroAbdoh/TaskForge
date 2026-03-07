import type { Project } from "./domain";

export interface ProjectCardProps {
  project: Project;
  onView: () => void;
}