import React, { useState } from "react";

const Description = () => <div>Mô tả sản phẩm ở đây.</div>;
const Reviews = () => <div>Đánh giá sản phẩm (55 đánh giá).</div>;
const Policies = () => <div>Chính sách sản phẩm ở đây.</div>;
const Maintenance = () => <div>Hướng dẫn bảo quản sản phẩm.</div>;

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("description");

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return <Description />;
      case "reviews":
        return <Reviews />;
      case "policies":
        return <Policies />;
      case "maintenance":
        return <Maintenance />;
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tabs-nav flex space-x-4 border-b">
        <button
          className={`tab ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Mô tả
        </button>
        <button
          className={`tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Đánh giá (55)
        </button>
        <button
          className={`tab ${activeTab === "policies" ? "active" : ""}`}
          onClick={() => setActiveTab("policies")}
        >
          Chính sách
        </button>
        <button
          className={`tab ${activeTab === "maintenance" ? "active" : ""}`}
          onClick={() => setActiveTab("maintenance")}
        >
          Bảo quản
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

export default Tabs;
