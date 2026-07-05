const categoryFieldsConfig = {
  cars: {
    subcategory: "Cars",
    fields: [
      {
        id: "brand",
        label: "Brand",
        type: "select",
        required: true,
        options: [
          "Maruti Suzuki",
          "Hyundai",
          "Honda",
          "Toyota",
          "Tata",
          "Mahindra",
          "Kia",
          "MG",
          "Renault",
          "Volkswagen",
          "Skoda",
          "BMW",
          "Mercedes-Benz",
          "Audi",
          "Other",
        ],
      },
      { id: "year", label: "Year", type: "number", required: true },
      {
        id: "fuel",
        label: "Fuel",
        type: "chips",
        required: true,
        options: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "LPG"],
      },
      {
        id: "transmission",
        label: "Transmission",
        type: "chips",
        required: true,
        options: ["Manual", "Automatic"],
      },
      { id: "kmDriven", label: "KM Driven", type: "number", required: true },
      {
        id: "owners",
        label: "Owners",
        type: "chips",
        required: true,
        options: ["1st", "2nd", "3rd", "4th", "4+"],
      },
    ],
  },

  bikes: {
    subcategory: "Bikes",
    fields: [
      {
        id: "brand",
        label: "Brand",
        type: "select",
        required: true,
        options: [
          "Hero",
          "Honda",
          "Bajaj",
          "TVS",
          "Royal Enfield",
          "Yamaha",
          "Suzuki",
          "KTM",
          "Other",
        ],
      },
      { id: "year", label: "Year", type: "number", required: true },
      { id: "kmDriven", label: "KM Driven", type: "number", required: true },
      {
        id: "fuel",
        label: "Fuel",
        type: "chips",
        options: ["Petrol", "Electric"],
      },
      {
        id: "owners",
        label: "Owners",
        type: "chips",
        options: ["1st", "2nd", "3rd", "4+"],
      },
    ],
  },

  mobiles: {
    subcategory: "Mobiles",
    fields: [
      {
        id: "brand",
        label: "Brand",
        type: "select",
        required: true,
        options: [
          "Apple",
          "Samsung",
          "OnePlus",
          "Xiaomi",
          "Realme",
          "Vivo",
          "Oppo",
          "Google",
          "Motorola",
          "Nothing",
          "Other",
        ],
      },
      {
        id: "ram",
        label: "RAM",
        type: "select",
        options: ["2 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB"],
      },
      {
        id: "storage",
        label: "Storage",
        type: "select",
        options: [
          "32 GB",
          "64 GB",
          "128 GB",
          "256 GB",
          "512 GB",
          "1 TB",
        ],
      },
      {
        id: "condition",
        label: "Condition",
        type: "chips",
        options: ["New", "Like New", "Good", "Fair"],
      },
    ],
  },

  properties: {
    subcategory: "Properties",
    fields: [
      {
        id: "type",
        label: "Property Type",
        type: "select",
        options: [
          "Apartment",
          "House",
          "Villa",
          "Commercial",
          "Plot",
        ],
      },
      {
        id: "bedrooms",
        label: "Bedrooms",
        type: "chips",
        options: ["1", "2", "3", "4", "5+"],
      },
      {
        id: "bathrooms",
        label: "Bathrooms",
        type: "chips",
        options: ["1", "2", "3", "4+"],
      },
      { id: "area", label: "Area (sq.ft)", type: "number" },
      {
        id: "furnished",
        label: "Furnished",
        type: "chips",
        options: ["Furnished", "Semi Furnished", "Unfurnished"],
      },
    ],
  },

  electronics: {
    subcategory: "Electronics",
    fields: [
      {
        id: "category",
        label: "Category",
        type: "select",
        options: [
          "Laptop",
          "Desktop",
          "TV",
          "AC",
          "Refrigerator",
          "Washing Machine",
          "Other",
        ],
      },
      {
        id: "condition",
        label: "Condition",
        type: "chips",
        options: ["New", "Used"],
      },
      {
        id: "warranty",
        label: "Warranty",
        type: "chips",
        options: ["Yes", "No"],
      },
    ],
  },

  furniture: {
    subcategory: "Furniture",
    fields: [
      {
        id: "type",
        label: "Furniture Type",
        type: "select",
        options: [
          "Sofa",
          "Chair",
          "Table",
          "Bed",
          "Cupboard",
          "Dining Set",
          "Other",
        ],
      },
      {
        id: "condition",
        label: "Condition",
        type: "chips",
        options: ["New", "Used"],
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: ["Wood", "Steel", "Plastic", "Glass", "Other"],
      },
    ],
  },

  jobs: {
    subcategory: "Jobs",
    fields: [
      {
        id: "jobType",
        label: "Job Type",
        type: "chips",
        options: ["Full Time", "Part Time", "Internship", "Contract"],
      },
      {
        id: "salary",
        label: "Salary",
        type: "text",
      },
      {
        id: "experience",
        label: "Experience",
        type: "select",
        options: [
          "Fresher",
          "1-2 Years",
          "3-5 Years",
          "5+ Years",
        ],
      },
    ],
  },

  fashion: {
    subcategory: "Fashion",
    fields: [
      {
        id: "category",
        label: "Category",
        type: "select",
        options: ["Men", "Women", "Kids"],
      },
      {
        id: "size",
        label: "Size",
        type: "chips",
        options: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      {
        id: "condition",
        label: "Condition",
        type: "chips",
        options: ["New", "Used"],
      },
    ],
  },

  pets: {
    subcategory: "Pets",
    fields: [
      {
        id: "petType",
        label: "Pet Type",
        type: "select",
        options: ["Dog", "Cat", "Bird", "Fish", "Rabbit", "Other"],
      },
      {
        id: "age",
        label: "Age",
        type: "text",
      },
      {
        id: "vaccinated",
        label: "Vaccinated",
        type: "chips",
        options: ["Yes", "No"],
      },
    ],
  },

  default: {
    subcategory: "General",
    fields: [
      {
        id: "condition",
        label: "Condition",
        type: "chips",
        required: true,
        options: ["New", "Used"],
      },
    ],
  },
};

export default categoryFieldsConfig;