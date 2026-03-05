import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Collapse,
  Stack,
  MenuItem,
  Chip,
  Select,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import type { Project } from "../../types/domain";
// import { useTaskForgeStore } from "../../store/useTaskForgeStore";
import { useState } from "react";
import useProjectStore from "../../store/uesProjectStore";




interface Props {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

function ProjectDialog({ open, project, onClose }: Props) {
  // const tasks = useTaskForgeStore((s) => s.tasks);
  const tasks = useProjectStore((s) => s.tasks);

  // const deleteProject = useTaskForgeStore((s) => s.deleteProject);
  const deleteProject = useProjectStore((s) => s.deleteProject);

  // const addTask = useTaskForgeStore((s) => s.addTask);
  const addTask = useProjectStore((s) => s.addTask);

  // const updateTaskStatus = useTaskForgeStore((s) => s.updateTaskStatus);
  const updateTaskStatus = useProjectStore((s) => s.updateTaskStatus);

  const [addingTask, setAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const [status, setStatus] = useState<"to-do" | "Done" | "in progress">(
    "to-do",
  );
  const [dueDate, setDueDate] = useState("");

  if (!project) return null;
  const projectTasks = tasks
    .filter((t) => t.projectId === project.id)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );

  const handleDelete = () => {
    deleteProject(project.id);
    onClose();
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{project.title}</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3 }}>{project.description}</Typography>

        <Typography variant="h6">Tasks</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {projectTasks.length === 0 ? (
            <Typography color="text.secondary">No tasks yet...</Typography>
          ) : (
            projectTasks.map((task) => (
              <Paper
                key={task.id}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack>
                  <Typography fontWeight={600}>{task.title}</Typography>

                  <Typography variant="body2" color="text.secondary">
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
          <Stack spacing={2} sx={{ mt: 2 }}>
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
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ mr: "auto" }}>
          Close
        </Button>

        <Button color="error" variant="contained" onClick={handleDelete}>
          Delete Project
        </Button>

        <Button
          variant="contained"
          onClick={() => setAddingTask((prev) => !prev)}
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDialog;
