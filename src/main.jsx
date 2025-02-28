import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Products from './Products.jsx';
import Product from './Product.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/products',
        element: <Products />,
    },
    {
        path: '/products/:productId',
        element: <Product />,
    },
]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
    </QueryClientProvider>
);
