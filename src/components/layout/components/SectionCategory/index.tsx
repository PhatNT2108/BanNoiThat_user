import "./SectionCategory.css"

const SectionCategories = () => {
  return (
    <section className="section-categories">
      <div className="item item-main">
        <img className="img-category" src="https://productstorageimages.blob.core.windows.net/bannoithat-3dmodel/background_header.jpg" alt="Bàn ăn" />
        <span className="text-center-category">Bàn ăn</span>
      </div>
      <div className="item">
        <img className="img-category" src="https://productstorageimages.blob.core.windows.net/bannoithat-3dmodel/background-2.jpg" alt="Bàn ăn" />
        <span className="text-center-category">Bàn ăn</span>
      </div>
      <div className="item">
        <img className="img-category" src="https://productstorageimages.blob.core.windows.net/bannoithat-3dmodel/background_header.jpg" alt="Sofa" />
        <span className="text-center-category">Giường</span>
      </div>
      <div className="item">
        <img className="img-category" src="https://productstorageimages.blob.core.windows.net/bannoithat-3dmodel/background.jpg" alt="Sofa" />
        <span className="text-center-category">Sofa</span>
      </div>
      <div className="item">
        <img className="img-category" src="https://productstorageimages.blob.core.windows.net/bannoithat-3dmodel/background.jpg" alt="Sofa" />
        <span className="text-center-category">Sofa</span>
      </div>
    </section>
  );
}

export default SectionCategories;