import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        try {
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error('Failed to create product');
            }

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));

            return {
                success: true,
                message: 'Product created successfully',
            };
        } catch (error) {
            console.error('Error creating product:', error);
            return {
                success: false,
                message: 'Server Down',
            };
        }
    },
    fetchProducts: async () => {
        try {
            const res = await fetch('/api/product');
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            set({ products: data.data });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/product/${pid}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete product');
            }

            set((state) => ({
                products: state.products.filter((product) => product._id !== pid),
            }));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    },
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/product/${pid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!res.ok) {
                throw new Error('Failed to update product');
            }

            const data = await res.json();
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? data.data : product
                ),
            }));

            return {
                success: true,
                message: 'Product updated successfully',
            };
        } catch (error) {
            console.error('Error updating product:', error);
            return {
                success: false,
                message: 'Server Down',
            };
        }
    },
}));