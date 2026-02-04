// --------------------
// Image Imports (LOCAL)
// --------------------
import hoodieImg from "../images/hoodie.png";
import watchImg from "../images/smartwatch.png";
import coffeeImg from "../images/coffemaker.png";
import yogamatsImg from "../images/mats.png";
import phoneImg from "../images/phone.png";

// --------------------
// Product Categories
// --------------------
const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Fitness",
  "Books"
];

// --------------------
// Base Product Types (WITH FIXED CATEGORY)
// --------------------
const items = [
  {
    name: "Pro Phone",
    price: 69999,
    desc: "Flagship smartphone with OLED display",
    category: "Electronics"
  },
  {
    name: "Cotton Hoodie",
    price: 2499,
    desc: "Premium heavy-weight cotton",
    category: "Fashion"
  },
  {
    name: "Smart Watch",
    price: 15999,
    desc: "Health tracking and notifications",
    category: "Electronics"
  },
  {
    name: "Coffee Maker",
    price: 4500,
    desc: "Automatic drip coffee machine",
    category: "Home & Kitchen"
  },
  {
    name: "Yoga Mat",
    price: 899,
    desc: "Non-slip eco-friendly mat",
    category: "Fitness"
  }
];

// --------------------
// 🔒 IMAGE MAP (MATCH PRODUCT NAMES)
// --------------------
const productImages = {
  "Pro Phone": phoneImg,
  "Cotton Hoodie": hoodieImg,
  "Smart Watch": watchImg,
  "Coffee Maker": coffeeImg,
  "Yoga Mat": yogamatsImg
};

// --------------------
// Generate Products
// --------------------
const products = [];

for (let i = 1; i <= 100; i++) {
  const base = items[i % items.length];

  products.push({
    id: i,
    name: `${base.name} ${String.fromCharCode(65 + (i % 26))}${i}`,
    price: base.price + i * 10,
    category: base.category,          // ✅ FIXED CATEGORY
    description: base.desc,
    image: productImages[base.name],  // ✅ FIXED IMAGE
    stock: Math.floor(Math.random() * 50) + 10
  });
}

export default products;
