const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User.model");
const Product = require("./models/Product.model");
const Order = require("./models/Order.model");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/firstcart",
    );
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("Cleared existing data");

    // Create dummy users
    const dummyUsers = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        isVerified: true,
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        isVerified: true,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        isVerified: true,
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        isVerified: false,
      },
      {
        name: "Sarah Williams",
        email: "sarah@example.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        isVerified: true,
      },
    ];

    const createdUsers = await User.insertMany(dummyUsers);
    console.log(`Created ${createdUsers.length} users`);

    // Create dummy products
    const dummyProducts = [
      {
        name: "Wireless Headphones",
        description:
          "Premium quality wireless headphones with noise cancellation",
        price: 89.99,
        category: "Electronics",
        imageUrl: "https://via.placeholder.com/400?text=Wireless+Headphones",
        stock: 50,
        rating: 4.5,
        numReviews: 128,
      },
      {
        name: "USB-C Cable",
        description: "Fast charging USB-C cable, 2 meters long",
        price: 12.99,
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/400?text=USB-C+Cable",
        stock: 200,
        rating: 4.2,
        numReviews: 342,
      },
      {
        name: "Portable Phone Charger",
        description: "20000mAh portable power bank with fast charging",
        price: 34.99,
        category: "Electronics",
        imageUrl: "https://via.placeholder.com/400?text=Phone+Charger",
        stock: 75,
        rating: 4.7,
        numReviews: 256,
      },
      {
        name: "Screen Protector",
        description: "Tempered glass screen protector for smartphones",
        price: 9.99,
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/400?text=Screen+Protector",
        stock: 150,
        rating: 4.0,
        numReviews: 89,
      },
      {
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for better posture",
        price: 49.99,
        category: "Office Supplies",
        imageUrl: "https://via.placeholder.com/400?text=Laptop+Stand",
        stock: 40,
        rating: 4.6,
        numReviews: 167,
      },
      {
        name: "Wireless Mouse",
        description: "Silent wireless mouse with precision tracking",
        price: 24.99,
        category: "Electronics",
        imageUrl: "https://via.placeholder.com/400?text=Wireless+Mouse",
        stock: 85,
        rating: 4.3,
        numReviews: 201,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with custom switches",
        price: 129.99,
        category: "Electronics",
        imageUrl: "https://via.placeholder.com/400?text=Mechanical+Keyboard",
        stock: 30,
        rating: 4.8,
        numReviews: 312,
      },
      {
        name: "Monitor Stand",
        description: "Dual monitor stand with cable management",
        price: 59.99,
        category: "Office Supplies",
        imageUrl: "https://via.placeholder.com/400?text=Monitor+Stand",
        stock: 25,
        rating: 4.4,
        numReviews: 95,
      },
    ];

    const createdProducts = await Product.insertMany(dummyProducts);
    console.log(`Created ${createdProducts.length} products`);

    // Create dummy orders
    const dummyOrders = [
      {
        user: createdUsers[1]._id, // John Doe
        items: [
          {
            productId: createdProducts[0]._id, // Wireless Headphones
            qty: 1,
            price: "89.99",
          },
          {
            productId: createdProducts[1]._id, // USB-C Cable
            qty: 2,
            price: "12.99",
          },
        ],
        totalAmount: 115.97,
        address: {
          fullname: "John Doe",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
        },
        status: "delivered",
      },
      {
        user: createdUsers[2]._id, // Jane Smith
        items: [
          {
            productId: createdProducts[2]._id, // Portable Phone Charger
            qty: 1,
            price: "34.99",
          },
          {
            productId: createdProducts[5]._id, // Wireless Mouse
            qty: 1,
            price: "24.99",
          },
        ],
        totalAmount: 59.98,
        address: {
          fullname: "Jane Smith",
          street: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          postalCode: "90001",
        },
        status: "shipped",
      },
      {
        user: createdUsers[4]._id, // Sarah Williams
        items: [
          {
            productId: createdProducts[6]._id, // Mechanical Keyboard
            qty: 1,
            price: "129.99",
          },
          {
            productId: createdProducts[4]._id, // Laptop Stand
            qty: 1,
            price: "49.99",
          },
        ],
        totalAmount: 179.98,
        address: {
          fullname: "Sarah Williams",
          street: "789 Pine Rd",
          city: "Chicago",
          state: "IL",
          postalCode: "60601",
        },
        status: "pending",
      },
      {
        user: createdUsers[1]._id, // John Doe
        items: [
          {
            productId: createdProducts[3]._id, // Screen Protector
            qty: 3,
            price: "9.99",
          },
        ],
        totalAmount: 29.97,
        address: {
          fullname: "John Doe",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
        },
        status: "pending",
      },
      {
        user: createdUsers[2]._id, // Jane Smith
        items: [
          {
            productId: createdProducts[7]._id, // Monitor Stand
            qty: 1,
            price: "59.99",
          },
        ],
        totalAmount: 59.99,
        address: {
          fullname: "Jane Smith",
          street: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          postalCode: "90001",
        },
        status: "cancelled",
      },
    ];

    const createdOrders = await Order.insertMany(dummyOrders);
    console.log(`Created ${createdOrders.length} orders`);

    console.log("\n✅ Database seeded successfully!");
    console.log(`
Test User Credentials:
- Email: john@example.com
- Password: user123

Admin User Credentials:                                      
- Email: admin@example.com
- Password: admin123
    `);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
