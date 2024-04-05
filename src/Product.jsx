import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const Product = () => {
    const params = useParams();

    const mutation = useMutation({
        mutationFn: (newProduct) => {
            return axios.put(`https://dummyjson.com/products/${params.productId}`, newProduct)
        },
    })

    const fetchProduct = async () => {
        const response = await fetch(`https://dummyjson.com/products/${params.productId}`);
        const data = await response.json();
        return data
    }

    const {
        isLoading,
        data: product,
        error } = useQuery({
            queryKey: ['products', params.productId],
            queryFn: fetchProduct,
            staleTime: 10000
        })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error.message);
        return <div>{error.message}</div>
    }
    return (
        <>
            <div className="mt-24 w-1/2 mx-auto">

                <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${product.price}</p>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Product;
