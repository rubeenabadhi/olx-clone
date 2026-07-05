import { useNavigate } from "react-router-dom";
import { useState } from "react";
import postAdCategories from "../../assets/data/postAdCategories";
import "./PostAd.css";

function CategorySelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (category) => {
    setSelected(category);
  };

  const handleContinue = () => {
    if (selected) {
      navigate(`/post/attributes?category=${selected.id}`);
    }
  };

  return (
    <div className="postad-page">
      <div className="postad-topbar">
        <button className="back-btn-icon" onClick={() => navigate(-1)}>
          ←
        </button>
      </div>

      <h1 className="postad-title">POST YOUR AD</h1>

      <div className="category-select-card">
        <h3 className="category-select-heading">CHOOSE A CATEGORY</h3>

        <div className="category-select-body">
          <div className="category-select-list">
            {postAdCategories.map((cat) => (
              <div
                key={cat.id}
                className={`category-select-row ${
                  selected?.id === cat.id ? "active" : ""
                }`}
                onClick={() => handleSelect(cat)}
              >
                <div className="category-select-left">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="category-select-icon"
                  />
                  <span>{cat.name}</span>
                </div>
                <span className="chevron">›</span>
              </div>
            ))}
          </div>

          <div className="category-select-panel">
            {selected && (
              <div
                className="category-select-subitem"
                onClick={handleContinue}
              >
                {selected.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySelect;