
# 🥗 **Shastra Veg Restaurant – Official Website**

A modern, fully responsive website built for **Shastra Veg Restaurant**, Mogappair West / Nolambur, Chennai.
The project includes a complete digital menu, interactive pages, elegant branding, and a smooth user experience inspired by South Indian heritage.

---

## 🌟 **Overview**

This repository contains the source code for the **official Shastra Veg Restaurant website**, designed to provide customers with:

* A visually rich and modern browsing experience
* A complete and structured digital menu
* Signature dishes and festival specials
* Google review highlights
* Restaurant ambience gallery
* Table reservation interface
* SEO-optimized pages for better online visibility

The website is currently under active development, with future plans to expand functionality and add backend-powered features.

---

## ✨ **Features**

### 🎨 **Modern & Responsive UI**

* Premium South Indian design with maroon, gold, and teak accents
* Mobile-first layout for smooth UX across all devices
* Framer Motion animations & micro-interactions

### 🍽️ **Comprehensive Digital Menu**

* All menu categories extracted from the physical menu
* Jain, Signature, and Spicy indicators
* Special festival menus (Dosa Festival, Bangalore Specials)
* Mini Tiffin combos and breakfast options

### ⭐ **Restaurant Experience Sections**

* About Shastra Veg
* Customer reviews from Google
* Dish gallery & interior ambience
* Special highlights (e.g., Veg Meat biriyani, Benne dosa)

### 📞 **Reservation Interface**

* Clean table-booking UI
* WhatsApp quick-action button (planned)
* Ready for backend integration later

### 🔍 **SEO and Social Optimization**

* Meta tags
* OpenGraph tags
* Menu structured data (schema)

### 🧩 **Scalable Architecture**

Prepared for future integrations such as:

* CMS / Admin panel
* Online ordering
* Reservation backend
* Analytics & real-time updates

---

## 🛠️ **Tech Stack**

* **Next.js / React**
* **Tailwind CSS**
* **Framer Motion**
* **Static JSON for menu content**
* **Node ecosystem**

---

## 📁 **Project Structure**

```
shastra-veg-restaurant/
│
├── public/
│   └── images/     # Restaurant & dish images
│
├── src/
│   ├── components/ # Reusable UI components
│   ├── pages/      # Website pages
│   ├── data/
│   │   └── menu.json   # Full structured menu
│   ├── layouts/
│   └── utils/
│
├── styles/
│   └── globals.css
│
└── README.md
```

---

## 📜 **Menu Data Structure**

The entire restaurant menu is stored in `/src/data/menu.json`.

```json
{
  "category": "South Indian Starters",
  "items": [
    {
      "name": "Gobi 65",
      "price": 180,
      "isSignature": false,
      "isJain": false,
      "isSpicy": true
    }
  ]
}
```

This structure makes it easy to:

* Update prices
* Add/remove dishes
* Connect to a backend or CMS later

---

## 🛠️ **Installation & Local Setup**

### 1. Clone the repository

```sh
git clone https://github.com/yourname/shastra-veg-restaurant.git
cd shastra-veg-restaurant
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start development server

```sh
npm run dev
```

Your website will be available at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🚀 **Deployment**

The project will be deployed once development stabilizes.

Recommended hosting:

* **Vercel**
* Netlify
* Cloudflare Pages

Environment variables & production build instructions will be added at that stage.

---

## 🔮 **Planned Enhancements**

* Reservation backend
* Menu management system
* Admin dashboard
* Online ordering module
* Customer loyalty features
* Payment gateway integration
* Live updates for specials & events

---

## 🤝 **Contributing**

Contributions are welcome!
You may open an issue or create a pull request to suggest improvements.

---

## 📄 **License**

License will be added once the project is prepared for public use.

---

## 🍛 **Credits**

Developed for **Shastra Veg Restaurant**, Mogappair West / Nolambur, Chennai.
Designed & built with passion for great food and great digital experiences.

---

