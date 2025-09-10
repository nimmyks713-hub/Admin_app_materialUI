"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DashboardShell from "@/app/components/Dashboardshell";

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [images], 
    };

    await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    router.push("/products"); 
  };

  return (
    <DashboardShell>
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ p: 4, maxWidth: 600, width: "100%" }} elevation={3}>
          <Typography variant="h4" gutterBottom>
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <TextField
              label="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Image URL"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" size="large">
              Add Product
            </Button>
          </form>
        </Paper>
      </Box>
    </DashboardShell>
  );
}
