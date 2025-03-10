import React from "react";

const ItemCheckOut = () => {
  return (
    <div className="flex items-center p-4 border-b">
      <div className="w-16 h-16 bg-gray-100 mr-4 flex-shrink-0">
        <img src="path_to_image" alt="Product Image" className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow">
        <h2 className="text-sm font-medium">Ghế Sofa MOHO LYNGBY 601</h2>
        <p className="text-xs text-gray-500">Be</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-sm">7.999.000₫</p>
      </div>
    </div>
  );
};
export default ItemCheckOut;