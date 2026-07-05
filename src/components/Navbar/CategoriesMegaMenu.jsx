import { useRef, useEffect } from "react";
import megaMenuCategories from "../../assets/data/megaMenuCategories";
import "./CategoriesMegaMenu.css";

function CategoriesMegaMenu({ onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Split into 4 columns for the grid layout
  const columns = [[], [], [], []];
  megaMenuCategories.forEach((cat, index) => {
    columns[index % 4].push(cat);
  });

  return (
    <div className="mega-menu" ref={menuRef}>
      <div className="mega-menu-arrow" />
      <div className="mega-menu-grid">
        {columns.map((column, colIndex) => (
          <div className="mega-menu-column" key={colIndex}>
            {column.map((cat) => (
              <div className="mega-menu-section" key={cat.id}>
                <div className="mega-menu-heading">
                  <img src={cat.icon} alt={cat.name} className="mega-menu-icon" />
                  <span>{cat.name}</span>
                </div>

                {cat.subcategories.length > 0 && (
                  <ul className="mega-menu-sublist">
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>{sub}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesMegaMenu;