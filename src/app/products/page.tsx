"use client";
import UpdateProductDialog from "../components/UpdateProductDialog";
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
  Pagination,
  CircularProgress,
} from "@mui/material";
import DashboardShell from "@/app/components/Dashboardshell";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [openDelete, setOpenDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const limit = 12; 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${
            (page - 1) * limit
          }&limit=${limit}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);
  
  const handleEditClick = (product: any) => {
  setSelectedProduct(product);
  setOpenDialog(true);
  };
  const handleDelete = (product: any) => {
    setProductToDelete(product);
    setOpenDelete(true);
  };
  const fetchProducts = async () => {
  const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=10");
  const data = await res.json();
  setProducts(data);
  };
  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await fetch(
        `https://api.escuelajs.co/api/v1/products/${productToDelete.id}`,
        { method: "DELETE" }
      );
      setProducts(products.filter((p) => p.id !== productToDelete.id));
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setOpenDelete(false);
      setProductToDelete(null);
    }
  };

  return (
    <DashboardShell>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            href="products/add"
          >
            Add Product
          </Button>
          
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={7}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                   width:'220px',
                   height:'100%',
                   backgroundColor: '#fff',
                   border:'1px solid #ddd',
                   borderRadius: '8px',
                   padding:'12px',
                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                   textAlign: 'center',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.images?.[0]}
                    alt={product.title}
                    sx={{ objectFit: "cover", 
                          width:"100%",
                          height:"180px",
                          marginBottom: '10px' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle2">
                      {product.title}
                    </Typography>
                    <Typography>${product.price}</Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                    }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={()=>handleEditClick(product)}>
                      Update
                    </Button>
                    
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={10} 
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
        <UpdateProductDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          product={selectedProduct}
          onUpdated={fetchProducts}/>

        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete{" "}
            <strong>{productToDelete?.title}</strong>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        
      </Box>
      
    </DashboardShell>
  );
}
