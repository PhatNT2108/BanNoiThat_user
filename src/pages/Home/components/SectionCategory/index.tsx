import "./SectionCategory.css"
import clientAPI from "../../../../api/client-api/rest-client";
import { useEffect, useState } from "react";
import ApiResponse from "../../../../model/ApiResponse";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  slug: string;
  categoryUrlImage: string;
}

const SectionCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    const data: ApiResponse = await clientAPI.service("categories/homepage").find();
    setCategories(data.result);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const navigateToFilterPage = (path: string) => {
    window.location.href = `/collections/${path}`;
  }

  return (
    categories.length > 0 ? (<section className="section-categories">
      <div className="item item-main" onClick={() => navigateToFilterPage(categories[0].slug || "#")}>
        <img className="img-category" src={categories[0].categoryUrlImage} alt="Bàn ăn" />
        <span className="text-center-category">{categories[0].name}</span>
      </div>
      {
        categories.slice(1).map((category, index) => (
          <div className="item" key={index} onClick={() => navigateToFilterPage(category.slug || "#")}>
            <img className="img-category" src={category.categoryUrlImage} alt={category.name} />
            <span className="text-center-category">{category.name}</span>
          </div>
        ))
      }
    </section >) : <div>None</div>
  );
}

export default SectionCategories;