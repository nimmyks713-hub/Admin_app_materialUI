"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

interface UpdateProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: any; 
  onUpdated: () => void; 
}

export default function UpdateProductDialog({
  open,
  onClose,
  product,
  onUpdated,
}: UpdateProductDialogProps) {
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [images, setImages] = useState(product?.images?.[0] || "");
  const [categoryId, setCategoryId] = useState(product?.category?.id || "");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setImages(product.images?.[0] || "");
      setCategoryId(product.category?.id || "");
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleUpdate = async () => {
    const updatedProduct = {
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [images],
    };

    await fetch(`https://api.escuelajs.co/api/v1/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    onUpdated(); 
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
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
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
