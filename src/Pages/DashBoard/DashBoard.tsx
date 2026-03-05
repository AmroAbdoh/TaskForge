import { Typography, Button, Grid } from "@mui/material";
import Layout from "../../components/Layout";
// import { useTaskForgeStore } from "../../store/useTaskForgeStore";
import { useState } from "react";
import AddProjectDialog from "./AddProjectDialog";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectDialog from "./ProjectDialog";
import type { Project } from "../../types/domain"

import useProjectStore from "../../store/uesProjectStore";
import useAuthStore from "../../store/useAuthStore";



function DashBoard() {

  const currentUser = useAuthStore((s) => s.currentUser);
  // const currentUser = useTaskForgeStore((s) => s.currentUser);
  
  // const projects = useTaskForgeStore((s) => s.projects);
  const projects = useProjectStore((s) => s.projects);

  const userProjects = projects.filter(
    (project) => currentUser && project.memberIds.includes(currentUser.id),
  );

  
  
  const [openAddProject, setOpenAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openProject, setOpenProject] = useState(false);

  return (
    <Layout>
      <Typography variant="h4"   >
        Projects
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setOpenAddProject(true)}
      >
        Add Project
      </Button>

      {userProjects.length === 0 ? (
        <Typography>No Projects yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {userProjects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>

              <ProjectCard project={project} onView = {() =>{
                setSelectedProject(project);
                setOpenProject(true);
              }}/>
                

            </Grid>
          ))}
        </Grid>
      )}
      <AddProjectDialog
        open={openAddProject}
        onClose={() => setOpenAddProject(false)}
      />

      <ProjectDialog
        open={openProject}
        project={selectedProject}
        onClose={() => setOpenProject(false)}
      />

    </Layout>
    
  );
}

export default DashBoard;
