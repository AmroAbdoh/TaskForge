import { Typography, Button, Grid, Stack } from "@mui/material";
import Layout from "../../components/Layout";
import { useState } from "react";
import AddProjectDialog from "./AddProjectDialog";
import ProjectCard from "../../components/projects/ProjectCard";
import useProjectStore from "../../store/uesProjectStore";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const projects = useProjectStore((s) => s.projects);

  const navigate = useNavigate();

  const userProjects = projects.filter(
    (project) => currentUser && project.accessUserIds.includes(currentUser.id),
  );

  const [openAddProject, setOpenAddProject] = useState(false);

  return (
    <Layout>
      <Stack spacing={2} sx={{ my: 2, width: 150 }}>
        <Typography variant="h4">Projects</Typography>

        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={() => setOpenAddProject(true)}
        >
          Add Project
        </Button>
      </Stack>

      {userProjects.length === 0 ? (
        <Typography>No Projects yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {userProjects.map((project) => (
            // @ts-ignore
            <Grid item xs={12} md={4} key={project.id}>
              <ProjectCard
                project={project}
                onView={() => navigate(`/projects/${project.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <AddProjectDialog
        open={openAddProject}
        onClose={() => setOpenAddProject(false)}
      />
    </Layout>
  );
}

export default DashBoard;
