# OLX Clone

A full-featured clone of OLX (India's popular online classifieds platform), built with React and Firebase. Users can browse listings, post their own ads, chat-ready seller profiles, save items to a wishlist, and manage their posted ads — all backed by real-time Firestore data and Cloudinary image hosting.

## Live Demo


## Features

- **Authentication** — Email/Password and Google Sign-In via Firebase Auth
- **Home Feed** — Category grid, product listings with pagination ("Load More")
- **Post an Ad** — Multi-step form with dynamic fields per category (Cars, Bikes, Mobiles, Properties, etc.), photo upload, location, and contact details
- **Product Details Page** — Image carousel with thumbnails, price, description, seller info card with live "items listed" count, Share and Wishlist actions
- **Edit & Delete Ads** — Owners can update or remove their own listings
- **My Ads** — Personal dashboard of everything a user has posted
- **Wishlist** — Save/unsave ads from Home or Details page, synced across the app in real time
- **Profile Page** — View account info, logout, quick links to My Ads and Wishlist
- **Responsive Category Mega-Menu** — Full category/subcategory dropdown navigation

## Tech Stack

| Layer          | Technology                          |
|-----------------|--------------------------------------|
| Frontend        | React (Vite)                        |
| Routing         | React Router                        |
| Auth & Database | Firebase Authentication, Firestore  |
| Image Hosting   | Cloudinary (unsigned upload preset) |
| Styling         | Plain CSS (component-scoped files)  |

## Project Structure

```
src/
├── assets/
│   ├── icons/              # category, UI, and social icons
│   ├── images/             # placeholder/sample images
│   └── data/                # static config: categories, form fields, states
├── components/
│   ├── Navbar/               # navbar, category tabs, mega-menu
│   ├── Footer/
│   ├── ProductCard/
│   └── Auth/                 # login/signup modal, phone & email auth screens
├── pages/
│   ├── Home/
│   ├── Profile/
│   ├── PostAd/                # category select + attributes form (create/edit)
│   ├── ProductDetails/
│   ├── MyProducts/
│   └── Wishlist/
├── context/
│   └── AuthContext.jsx        # global auth state + modal visibility
├── services/
│   ├── firebase.js            # Firebase app init
│   ├── auth.js                 # sign in/up/out helpers
│   ├── product.js              # Firestore CRUD + pagination
│   ├── wishlist.js             # wishlist CRUD
│   └── storage.js              # Cloudinary upload helper
├── routes/
│   └── AppRoutes.jsx
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A Firebase project (Firestore + Authentication enabled)
- A Cloudinary account (free tier works) with an **unsigned** upload preset

### Installation

```bash
git clone https://github.com/rubeenabadhi/olx-clone.git
cd olx-clone
npm install
```

### Environment Setup

Update `src/services/firebase.js` with your own Firebase project config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

Update `src/services/storage.js` with your Cloudinary details:

```javascript
const CLOUD_NAME = "YOUR_CLOUD_NAME";
const UPLOAD_PRESET = "YOUR_UNSIGNED_PRESET_NAME";
```

> **Note:** For a production project, move these values into a `.env` file and read them via `import.meta.env.VITE_*` instead of hardcoding them, then add `.env` to `.gitignore`.

### Firebase Setup Checklist
- [ ] Firestore Database created (start in test mode, then add real rules before going live)
- [ ] Authentication → Sign-in method → **Email/Password** enabled
- [ ] Authentication → Sign-in method → **Google** enabled (with a support email set)
- [ ] Authentication → Settings → Authorized domains includes `localhost` and your deployed domain

### Cloudinary Setup Checklist
- [ ] Upload preset created with **Signing Mode: Unsigned**
- [ ] (Optional) Asset folder set to `products` for organization

### Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for production

```bash
npm run build
```

## Firestore Data Model

**`products` collection** — one document per ad
```
{
  title, description, price, category, categoryId,
  photos: [url, url, ...],
  state, sellerName, sellerId, sellerPhoto, phone,
  memberSince, createdAt,
  ...category-specific fields (brand, year, kmDriven, etc.)
}
```

**`wishlists` collection** — one document per (user, product) pair, id format `${userId}_${productId}`
```
{
  userId, productId, title, price, photo, addedAt
}
```
## Images
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3453cbf4-2d0d-4179-8bb7-9bda6e5874d6" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/51b20e33-d8ba-4fd4-ba2b-a9abdb90e0d1" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fb8884ec-a09c-4e7d-9f9e-8564ed7884d7" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/effb5c7c-7093-4773-9ba9-c153f5461fb6" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/16013385-bbc9-4c5d-8789-dea02697fe56" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/81fdabd7-8eea-488e-bf85-7524dbd3d91a" />


## Known Limitations / Ideas for Next Steps

- Chat between buyer and seller is UI-only (button present, not yet functional)
- No search/filter by keyword or category on Home page yet
- No image compression before upload (large files upload as-is to Cloudinary)
- Security rules should be tightened before any public deployment (test-mode Firestore rules expire and are insecure by default)

## License

This project is for educational/portfolio purposes. OLX is a trademark of its respective owner; this clone is not affiliated with or endorsed by OLX.
