import { Paper, Typography, Button, Stack } from "@mui/material";
import type { ProjectCardProps } from "../../types/projectCard";

function ProjectCard({ project, onView }: ProjectCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {project.title}
      </Typography>

      <Typography variant="body2">{project.description}</Typography>

      {/* Button section */}
      <Stack direction="row" spacing={1} sx={{ mt: "70px", mx: "auto" }}>
        <Button variant="contained" color="success" onClick={onView}>
          View Project
        </Button>
      </Stack>
    </Paper>
  );
}

export default ProjectCard;
