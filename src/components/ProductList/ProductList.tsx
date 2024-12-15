import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Modal from '../Modal/Modal';
import { Pagination } from '@mui/material';
import { Product, ProductListProps } from '../../types/types';

export default function ProductList({ category, name, inStock }: ProductListProps) {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error('Ошибка загрузки данных:', error));
    }, []);


    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleCardClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };


    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filtertedProducts = products
        .filter((product) => {
            const matchName = name
                ? product.name.toLowerCase().includes(name.toLowerCase())
                : true;
            const matchStock = inStock ? product.quantity > 0 : true;
            const matchCategory = category ? product.category === category : true;

            return matchName && matchStock && matchCategory;
        });

    const currentProducts = filtertedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            marginLeft: '60px',
        }}
        >

            {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={handleCardClick} />
            ))}
            {selectedProduct && <Modal product={selectedProduct} onClose={handleCloseModal} open={Boolean(selectedProduct)}
            />}

            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'white',
                padding: '10px',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Pagination
                    count={Math.ceil(filtertedProducts.length / productsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </div>
        </div>
    );
}



