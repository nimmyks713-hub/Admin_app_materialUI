'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import {useState} from "react";
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert'
import { error } from 'console';
export default function login(){
  const router=useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const handleLogin=async()=>{
      setError("");
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token); 
      router.push("/dashboard"); 
    } else {
      setError("Invalid email or password");
    }
  };
  
    return(
        <div>
        <h1 style={{textAlign:'center',color:'#d32f2f',marginTop:50}}>Welcome to shopaholic Admin</h1>
             <Box sx={{ width:500,marginLeft:50}}>
      <Paper elevation={3} sx={{height:450}}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <InputLabel htmlFor="username" sx={{marginLeft:3,paddingTop:5}}>Username</InputLabel>

        <TextField
        sx={{
          margin:3,
          width:450
        }}
          required
          id="username"
          label="Required"
          margin='normal'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          onChange={(e)=>setEmail(e.target.value)}
        />
      <InputLabel htmlFor="password" sx={{marginLeft:3}}>Password</InputLabel>
        <TextField
        sx={{
          margin:3,
          width:450
        }}
          required
          id="password"
          label="Required"
          margin='normal'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button variant="contained" color="error" sx={{width:450,margin:3}}
        onClick={handleLogin}>Login
</Button>
      </Paper>
    </Box>
    </div>
    )
  }