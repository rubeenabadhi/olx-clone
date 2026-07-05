const iconModules = import.meta.glob("../icons/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
});

const iconMap = {};
Object.entries(iconModules).forEach(([path, url]) => {
  const filename = path.split("/").pop();
  iconMap[filename] = url;
});

const megaMenuCategories = [
  {
    id: "cars",
    name: "Cars",
    icon: iconMap["cars.png"],
    subcategories: [],
  },
  {
    id: "bikes",
    name: "Bikes",
    icon: iconMap["bike.png"],
    subcategories: ["Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
  },
  {
    id: "properties",
    name: "Properties",
    icon: iconMap["properties.png"],
    subcategories: [
      "For Sale: Houses & Apartments",
      "For Rent: Houses & Apartments",
      "Lands & Plots",
      "For Sale: New Projects & Properties",
      "For Rent: Shops & Offices",
      "For Sale: Shops & Offices",
      "PG & Guest Houses",
    ],
  },
  {
    id: "electronics",
    name: "Electronics & Appliances",
    icon: iconMap["electronics.png"],
    subcategories: [
      "TVs, Video - Audio",
      "Kitchen & Other Appliances",
      "Computers & Laptops",
      "Cameras & Lenses",
      "Games & Entertainment",
      "Fridges",
      "Computer Accessories",
    ],
  },
  {
    id: "mobiles",
    name: "Mobiles",
    icon: iconMap["mobiles.png"],
    subcategories: ["Mobile Phones", "Accessories", "Tablets"],
  },
  {
    id: "commercial",
    name: "Commercial Vehicles & Spares",
    icon: iconMap["commercial.png"],
    subcategories: ["Commercial & Other Vehicles", "Spare Parts"],
  },
  {
    id: "jobs",
    name: "Jobs",
    icon: iconMap["jobs.png"],
    subcategories: [
      "Data entry & Back office",
      "Sales & Marketing",
      "BPO & Telecaller",
      "Driver",
      "Office Assistant",
      "Delivery & Collection",
      "Teacher",
      "Cook",
      "Receptionist & Front office",
      "Operator & Technician",
      "IT Engineer & Developer",
      "Hotel & Travel Executive",
      "Accountant",
      "Warehouse Staff",
      "Designer",
      "Security Guards",
    ],
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: iconMap["furniture.png"],
    subcategories: [
      "Sofa & Dining",
      "Beds & Wardrobes",
      "Home Decor & Garden",
      "Kids Furniture",
      "Other Household Items",
    ],
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: iconMap["fashion.png"],
    subcategories: ["Men", "Women", "Kids"],
  },
  {
    id: "books",
    name: "Books, Sports & Hobbies",
    icon: iconMap["books.png"],
    subcategories: [
      "Books",
      "Gym & Fitness",
      "Musical Instruments",
      "Sports Equipment",
      "Other Hobbies",
    ],
  },
  {
    id: "pets",
    name: "Pets",
    icon: iconMap["pets.png"],
    subcategories: [
      "Fishes & Aquarium",
      "Pet Food & Accessories",
      "Dogs",
      "Other Pets",
    ],
  },
  {
    id: "services",
    name: "Services",
    icon: iconMap["services.png"],
    subcategories: [
      "Education & Classes",
      "Tours & Travel",
      "Electronics Repair & Services",
      "Health & Beauty",
      "Home Renovation & Repair",
      "Cleaning & Pest Control",
      "Legal & Documentation Services",
      "Packers & Movers",
      "Other Services",
    ],
  },
];

export default megaMenuCategories;