import prisma from "../src/db/prisma.js"; // make sure path is correct
console.log("SEED FILE STARTED");
const products = [
  {
    title: "Wireless Headphones",
    price: 150,
    description: "High-quality wireless headphones with noise cancellation.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
    sold: false,
    isSale: true
  },
  {
    title: "Gaming Laptop",
    price: 1200,
    description: "High-performance laptop for gaming and productivity.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    sold: false,
    isSale: false
  },
  {
    title: "Smartphone Pro",
    price: 999,
    description: "Latest smartphone with advanced camera and performance.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    sold: false,
    isSale: true
  },
  {
    title: "Bluetooth Speaker",
    price: 80,
    description: "Portable speaker with deep bass and long battery life.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a41552231658",
    sold: false,
    isSale: true
  },
  {
    title: "Mechanical Keyboard",
    price: 120,
    description: "RGB mechanical keyboard with fast response keys.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    sold: false,
    isSale: false
  },
  {
    title: "Running Shoes",
    price: 90,
    description: "Comfortable running shoes for everyday fitness.",
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1528701800489-20be3c0a2d8f",
    sold: false,
    isSale: true
  },
  {
    title: "Men's Jacket",
    price: 140,
    description: "Stylish winter jacket with premium material.",
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    sold: false,
    isSale: false
  },
  {
    title: "Women's Handbag",
    price: 110,
    description: "Elegant handbag with spacious compartments.",
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    sold: false,
    isSale: true
  },
  {
    title: "Office Chair",
    price: 200,
    description: "Ergonomic office chair with lumbar support.",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    sold: false,
    isSale: false
  },
  {
    title: "Wooden Desk",
    price: 350,
    description: "Modern wooden desk for workspace.",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    sold: false,
    isSale: true
  },
  {
    title: "LED Monitor",
    price: 250,
    description: "24-inch full HD LED monitor.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4c5d3d9a77b",
    sold: false,
    isSale: false
  },
  {
    title: "Tablet Device",
    price: 400,
    description: "Portable tablet for entertainment and work.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    sold: false,
    isSale: true
  },
  {
    title: "Fitness Band",
    price: 60,
    description: "Track your fitness and health easily.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fdc9f",
    sold: false,
    isSale: true
  },
  {
    title: "Coffee Maker",
    price: 180,
    description: "Automatic coffee maker for home use.",
    category: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    sold: false,
    isSale: false
  },
  {
    title: "Air Fryer",
    price: 220,
    description: "Healthy cooking with less oil.",
    category: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707",
    sold: false,
    isSale: true
  },
  {
    title: "Backpack",
    price: 70,
    description: "Durable backpack for travel and daily use.",
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1b",
    sold: false,
    isSale: false
  },
  {
    title: "Smart Watch",
    price: 199,
    description: "Smartwatch with health tracking features.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    sold: false,
    isSale: true
  },
  {
    title: "Gaming Mouse",
    price: 75,
    description: "High precision gaming mouse with RGB.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    sold: false,
    isSale: true
  },
  {
    title: "Bookshelf",
    price: 180,
    description: "Wooden bookshelf for home decor.",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    sold: false,
    isSale: false
  },
  {
    title: "Sunglasses",
    price: 50,
    description: "Stylish sunglasses with UV protection.",
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    sold: false,
    isSale: true
  }
];

const seedingProductDataToDB = async () => {
  try {
    await prisma.product.createMany({
      data: products,
    });

    console.log("All Products seeded successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedingProductDataToDB();
