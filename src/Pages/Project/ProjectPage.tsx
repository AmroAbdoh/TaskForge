import {
  Typography,
  Button,
  TextField,
  Collapse,
  Stack,
  MenuItem,
  Chip,
  Select,
  Paper,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";
import useProjectStore from "../../store/uesProjectStore";
import Topbar from "../../components/Topbar";
import type { Task } from "../../types/domain";
import { useTheme } from "@mui/material/styles";


function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = useProjectStore((s) => s.projects);
  const tasks = useProjectStore((s) => s.tasks);
  const deleteProject = useProjectStore((s) => s.deleteProject);
  const addTask = useProjectStore((s) => s.addTask);
  const updateTaskStatus = useProjectStore((s) => s.updateTaskStatus);

  const project = projects.find((p) => p.id === id);

  const [addingTask, setAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [status, setStatus] = useState<"to-do" | "Done" | "in progress">(
    "to-do",
  );
  const [dueDate, setDueDate] = useState("");



  if (!project) return <Typography>Project not found</Typography>;

  const projectTasks = tasks
    .filter((t) => t.projectId === project.id)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );

  const handleDelete = () => {
    deleteProject(project.id);
    // navigate("/projects");
    navigate(-1);
  };

  const handleAddTask = () => {
    if (!taskTitle.trim() || !dueDate) return;

    addTask({
      id: crypto.randomUUID(),
      projectId: project.id,
      title: taskTitle,
      status: status,
      dueDate: dueDate,
    });

    setTaskTitle("");
    setDueDate("");
    setStatus("to-do");
    setAddingTask(false);
  };

  const isOverdue = (date : string) => {
    return dayjs( date ).isBefore( dayjs() , "day" );
  };

  const statusColor = (status: "to-do" | "in progress" | "Done") => {
    switch (status) {
      case "to-do":
        return "default";
      case "in progress":
        return "warning";
      case "Done":
        return "success";
    }
  };
  
  const theme = useTheme();
  const checkBorder = (task: Task) => {
   

    if(task.status === "Done")
        return `2px solid ${theme.palette.success.main}`;
    else if(isOverdue(task.dueDate))
        return `2px solid ${theme.palette.error.main}`;
    else if(task.status === "in progress")
        return `2px solid ${theme.palette.warning.main}`;
    else
        return `1px solid ${theme.palette.grey[300]}`;

  };

  const datedueColor = (task : Task) => {

    if( task.status !== "Done" && isOverdue(task.dueDate)) 
        return "error"
    else
        return "text.secondary"
  }

  return (
    <>
      <Topbar />
      <Container maxWidth="lg" sx={{ mt: 6 , pb:6 }}>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h4">{project.title}</Typography>
          

          <Typography color="text.secondary">{project.description}</Typography>
        </Stack>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography variant="h6">Tasks</Typography>

          {projectTasks.length === 0 ? (
            <Typography color="text.secondary">No tasks yet...</Typography>
          ) : (
            projectTasks.map((task) => (
                
              <Paper
                key={task.id}
                sx={{
                  p: 2.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 1.5,
                  border: checkBorder(task),
                  
                  
                }}
              >
                <Stack>
                  <Typography fontWeight={600}>{task.title}</Typography>

                  <Typography variant="body2" color={ datedueColor(task) } >
                    Due: {dayjs(task.dueDate).format("DD/MM/YYYY")}
                  </Typography>
                </Stack>

                <Select
                  size="small"
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(task.id, e.target.value as any)
                  }
                  renderValue={(value) => (
                    <Chip
                      label={value}
                      color={statusColor(value)}
                      size="small"
                    />
                  )}
                >
                  <MenuItem value="to-do">To Do</MenuItem>
                  <MenuItem value="in progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </Paper>
            ))
          )}
        </Stack>

        <Collapse in={addingTask}>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <TextField
              label="Task title"
              fullWidth
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <MenuItem value="to-do">To Do</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>

            <DatePicker
              label="Due date"
              value={dueDate ? dayjs(dueDate) : null}
              onChange={(value) => setDueDate(value?.toISOString() ?? "")}
            />

            <Button variant="contained" onClick={handleAddTask}>
              Save Task
            </Button>
          </Stack>
        </Collapse>

        <Stack direction="row" spacing={2} sx={{ mt: 4 , justifyContent:"space-between" }}>
          <Button onClick={() => navigate(-1)}>Back</Button>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 5, justifyContent: "flex-end" }}
          >
            <Button color="error" variant="contained" onClick={handleDelete}>
              Delete Project
            </Button>

            <Button
              variant="contained"
              onClick={() => setAddingTask((prev) => !prev)}
            >
              Add Task
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default ProjectPage;
