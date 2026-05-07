// USERS
export const users = [
  {
    id: 1,
    full_name: "Shreeya Sahu",
    mobile: "9876543210",
  },
];

// PRODUCTS
export const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 150.0,
    description: "High-quality wireless headphones with noise cancellation.",
    category: "Electronics",
    image_url: "https://unsplash.com/photos/black-smartphone-beside-pen-rNYCrcjUnOA",
    sold: false,
    is_sale: true,
    date_of_sale: null,
  },
  {
    id: 2,
    title: "Gaming Laptop",
    price: 1200.0,
    description: "High-performance laptop for gaming and productivity.",
    category: "Electronics",
    image_url: "https://unsplash.com/photos/black-smartphone-beside-pen-rNYCrcjUnOA",
    sold: true,
    is_sale: false,
    date_of_sale: "2026-04-28",
  },
];

export const cart = [
  {
    id: 1,
    user: 1,       // user id
    product: 1,    // product id
    quantity: 2,
  },
  {
    id: 2,
    user: 1,
    product: 2,
    quantity: 1,
  },
];

export const orders = [
  {
    id: 1,
    user: 1,
    product: 2,
    price: 1200.0,
    quantity: 1,
    payment_mode: "COD",
  },
  {
    id: 2,
    user: 1,
    product: 1,
    price: 150.0,
    quantity: 2,
    payment_mode: "Online",
  },
];

export const wishlist = [
  {
    id: 1,
    user: 1,
    product: 1,
  },
];
export let carts = [
  {
    id: 1,
    user: 1,
    product: 1,
    quantity: 1,
  },
];