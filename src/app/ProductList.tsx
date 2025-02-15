import React from "react";
import { useState, useEffect } from "react";

interface Product {
  title: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products/?delay=2000&limit=3");
      const data = await response.json();
      setProducts(data.products);
      setIsLoading(false);
    };
 
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h2>Список задач: {products.length}</h2>
      <ul>
        {products.map((product) => (
          <li>
            <ProductItem title={product.title} price={product.price} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;


const ProductItem: React.FC<Product> = (props) => {
  return (
    <div>
      <input type="checkbox" /> {props.title} - ${props.price}
      
    </div>
  );
};
