import React from 'react';
import CheckOutMain from './components/CheckOutMain';
import CheckOutBill from './components/CheckOutBill';

const CheckOut: React.FC = () => {
    return (
        <div className="flex flex-row container mx-auto p-4">
            <CheckOutMain />
            <CheckOutBill />
        </div>
    );
};

export default CheckOut;