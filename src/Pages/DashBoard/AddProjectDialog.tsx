import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useProjectStore from "../../store/uesProjectStore";
import useAuthStore from "../../store/useAuthStore";
import { users } from "../../utils/seed";
import type { addProjectDialogProps } from "../../types/addProjectDialogInterface";

function AddProjectDialog({ open, onClose }: addProjectDialogProps) {
  const currentUser = useAuthStore((s) => s.currentUser);
  const addProject = useProjectStore((s) => s.addProject);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAccessUserIds, setSelectedAccessUserIds] = useState<string[]>(
    [],
  );

  const selectAbleUsers = users.filter(
    (user) => currentUser && user.id !== currentUser.id,
  );

  function toggleUser(userId: string) {
    setSelectedAccessUserIds((previousUserIds) => {
      const isSelected = previousUserIds.includes(userId);

      if (isSelected) {
        return previousUserIds.filter((id) => id !== userId);
      }

      return [...previousUserIds, userId];
    });
  }

  const handleCreate = () => {
    addProject(title, description, selectedAccessUserIds, currentUser!.id);

    setTitle("");
    setDescription("");
    setSelectedAccessUserIds([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Project</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <div>
            <Typography variant="subtitle1">
              Who can access this project?
            </Typography>

            {selectAbleUsers.map((user) => (
              <FormControlLabel
                key={user.id}
                control={
                  <Checkbox
                    checked={selectedAccessUserIds.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                  />
                }
                label={user.name}
              />
            ))}
          </div>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button
          onClick={onClose}
          color="error"
          variant="contained"
          sx={{ mr: "auto" }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProjectDialog;
