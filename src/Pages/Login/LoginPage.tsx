import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import loginSchema from "../../Validation/loginValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Topbar from "../../components/Topbar";

function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const [loginError, setLoginError] = useState("");
  type LoginForm = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true); 
    setLoginError("");

    
    try {
      
      const success = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(login(data.email, data.password));
        }, 1000); 
      });

      if (!success) {
        setLoginError("Invalid email or password");
      } else {
        console.log("Login successful!", { data });
        window.alert("Login successful!");
        navigate("/dashboard");
      }
    } finally {
      setLoading(false); 
    }
  };

  
  

  return (
    <>
    <Topbar />
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 4, mt: 10 }} variant="outlined">
          <Typography variant="h4" mb={3} textAlign="center">
            TaskForge Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
              disabled ={loading}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
              disabled ={loading}
            />

            {loginError && (
              <Typography color="error" mt={1}>
                {loginError}
              </Typography>
            )}

            <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit" disabled ={loading}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default LoginPage;
