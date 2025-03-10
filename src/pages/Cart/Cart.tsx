// /c:/FileCaNhan/KLTN/MainProject/my-app/src/pages/Cart/Cart.tsx
import React from 'react';
import CartItem from './components/CartItem';
const Image1 = require('../../assets/images/1.jpg');
const Image2 = require('../../assets/images/2.jpg');
const Image3 = require('../../assets/images/3.jpg');

const Cart: React.FC = () => {
    const items = [
        { id: 1, name: 'Item 1', price: 10, quantity: 2, imageUrl: Image1 },
        { id: 2, name: 'Item 2', price: 20, quantity: 1, imageUrl: Image2 },
        { id: 3, name: 'Item 3', price: 15, quantity: 3, imageUrl: Image3 },
    ];

    const handleCheckout = () => {
        alert('Proceeding to checkout');
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="w-1/2 container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                {items.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
                <div className="flex justify-between items-center mt-6">
                    <span className="text-xl font-semibold">Total: ${calculateTotal()}</span>
                    <button 
                        onClick={handleCheckout} 
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;