import { useEffect, useState } from "react";


const ProductList = ({ category }: { category: string }) => {
    const [products, setProducts] = useState<{id: number, name: string}[]>([]);

    useEffect(() => {
        console.log("Fetching Products in ", category)
        setProducts([{id: 1, name: 'Clothing'}, {id: 2, name: 'Household'}]);
    }, [category]);

    return (
        <div>
            ProductList
        </div>
    );
    
}   

export default ProductList;