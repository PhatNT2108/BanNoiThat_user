import React, { useState } from 'react';
import { Checkbox, Button, InputNumber } from 'antd';

interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        imageUrl: string;
    };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [checked, setChecked] = useState(false);

    const handleQuantityChange = (value: number | null) => {
        if (value === null) return;
        setQuantity(value);
    };

    const handleCheckboxChange = (e: any) => {
        setChecked(e.target.checked);
    };

    return (
        <div className="flex items-center p-4 border-b border-gray-200 bg-white rounded-lg shadow-md">
            <Checkbox className="mr-4" checked={checked} onChange={handleCheckboxChange} />
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover mr-4 rounded-md" />
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                    <Button onClick={() => handleQuantityChange(quantity > 1 ? quantity - 1 : 1)} disabled={quantity <= 1}>-</Button>
                    <InputNumber min={1} value={quantity} onChange={handleQuantityChange} className="mx-2" />
                    <Button onClick={() => handleQuantityChange(quantity + 1)}>+</Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;