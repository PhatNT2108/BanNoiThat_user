import React, { useState } from "react";

interface TabsProps {
  description: string;
  product_id: string | null;
}

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return <Description />;
      case "reviews":
        return <Reviews />;
      default:
        return null;
    }
  };

  const Description = () => (<div>
    <span dangerouslySetInnerHTML={{ __html: props.description }} />
  </div>);
  const Reviews = () => <div>Đánh giá sản phẩm (55 đánh giá).</div>;

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tabs-nav flex space-x-4 border-b">
        <button
          className={`tab ${activeTab === "description" ? "active font-bold" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Mô tả
        </button>
        <button
          className={`tab ${activeTab === "reviews" ? "active font-bold" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Đánh giá (55)
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

export default Tabs;