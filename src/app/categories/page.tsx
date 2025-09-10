"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DashboardShell from "@/app/components/Dashboardshell";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (editingCategory) {
      await fetch(
        `https://api.escuelajs.co/api/v1/categories/${editingCategory.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, image }),
        }
      );
    } else {
      await fetch("https://api.escuelajs.co/api/v1/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });
    }
    setOpenDialog(false);
    setEditingCategory(null);
    setName("");
    setImage("");
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
      method: "DELETE",
    });
    fetchCategories();
  };

  const openForEdit = (category: any) => {
    setEditingCategory(category);
    setName(category.name);
    setImage(category.image);
    setOpenDialog(true);
  };

  const openForAdd = () => {
    setEditingCategory(null);
    setName("");
    setImage("");
    setOpenDialog(true);
  };

  return (
    <DashboardShell>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Button variant="contained" onClick={openForAdd}>
            Add Category
          </Button>
        </Box>

        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
              <Card sx={{width:'180px',height:'100%'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={cat.image}
                  alt={cat.name}
                />
                <CardContent>
                  <Typography variant="subtitle1">{cat.name}</Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <Button size="small" variant="outlined" onClick={() => openForEdit(cat)}>
                    Update
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <DialogTitle>
            {editingCategory ? "Update Category" : "Add Category"}
          </DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editingCategory ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardShell>
  );
}

