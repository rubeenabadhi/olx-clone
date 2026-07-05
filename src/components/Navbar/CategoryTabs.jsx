import { useState, useEffect } from "react";
import CategoriesMegaMenu from "./CategoriesMegaMenu";
import "./CategoryTabs.css";

const tabs = [
  "All categories",
  "Cars",
  "Motorcycles",
  "Mobile Phones",
  "For Sale: Houses & Apartments",
  "For Rent: Houses & Apartments",
  "Beds-Wardrobes",
  "TVs, Video - Audio",
];

function formatToday() {
  const today = new Date();
  return today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CategoryTabs() {
  const [today, setToday] = useState(formatToday());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
    const timer = setTimeout(() => setToday(formatToday()), msUntilMidnight);
    return () => clearTimeout(timer);
  }, [today]);

  return (
    <div className="category-tabs-wrapper">
      <div className="category-tabs">
        <button
          className="all-categories-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰ ALL CATEGORIES {menuOpen ? "︿" : ""}
        </button>

        {tabs.slice(1).map((tab, index) => (
          <button key={index} className="tab-btn">
            {tab}
          </button>
        ))}

        <span className="date-text">{today}</span>
      </div>

      {menuOpen && <CategoriesMegaMenu onClose={() => setMenuOpen(false)} />}
    </div>
  );
}

export default CategoryTabs;