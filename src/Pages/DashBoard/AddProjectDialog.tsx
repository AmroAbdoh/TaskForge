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


interface Props {
  open: boolean;
  onClose: () => void;
}

function AddProjectDialog({ open, onClose }: Props) {

    const currentUser = useAuthStore((s) => s.currentUser);
    const addProject = useProjectStore((s) => s.addProject);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const selectAbleUsers = users.filter(
        (u) => currentUser && u.id !== currentUser.id
    );

    const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id]
        );
    };

    const handleCreate = () => {
    addProject(title, description, selectedMembers , currentUser!.id);

    
    setTitle("");
    setDescription("");
    setSelectedMembers([]);
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
                    checked={selectedMembers.includes(user.id)}
                    onChange={() => toggleMember(user.id)}
                  />
                }
                label={user.name}
              />
            ))}
          </div>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained" sx={{mr:"auto"}}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProjectDialog;
