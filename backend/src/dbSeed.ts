import dotenv from 'dotenv';

dotenv.config();

import { addMinutes } from 'date-fns';
import prisma from './config/Prisma.config';
import bcrypt from 'bcrypt';

async function main() {
    // Dummy Users
    const dummyUsers = [];
    for (let i = 0; i < 10; i++) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(`Password@00${i}`, salt);

        const userData = {
            username: `user${i}`,
            email: `user${i}@example.com`,
            password: hash,
            salt: salt,
            phone_number: `070000000${i}`,
        };

        // Create user
        const user = await prisma.user.create({
            data: userData,
        });

        dummyUsers.push(user);

        // Create admin (only for the first user)
        if (i === 0) {
            await prisma.admin.create({
                data: {
                    user_id: user.id,
                },
            });
        }
    }

    // console.log('Dummy users seeded:', dummyUsers);
    console.log('Dummy users seeded successfully!');

    // Categories
    const categoriesData = [
        {
            name: "Electronics",
            image_url: "http://localhost:3000/images/electronics.jpg",
        },
        {
            name: "Clothing",
            image_url: "http://localhost:3000/images/clothing.jpeg",
        },
        {
            name: "Home and Garden",
            image_url: "http://localhost:3000/images/home_and_garden.jpeg",
        },
        {
            name: "Books",
            image_url: "http://localhost:3000/images/books.jpeg",
        },
        {
            name: "Sports and Outdoors",
            image_url: "http://localhost:3000/images/sports_and_outdoors.jpeg",
        },
        {
            name: "Furniture",
            image_url: "http://localhost:3000/images/furniture.jpeg",
        },
        {
            name: "Beauty and Personal Care",
            image_url: "http://localhost:3000/images/beauty_and_personal_care.jpeg",
        },
        {
            name: "Food and Grocery",
            image_url: "http://localhost:3000/images/food_and_grocery.jpeg",
        },
        {
            name: "Pet Supplies",
            image_url: "http://localhost:3000/images/pet_supplies.jpeg",
        },
        {
            name: "Toys and Games",
            image_url: "http://localhost:3000/images/toys_and_games.jpeg",
        },
    ];

    // Seed categories
    const createdCategories = await Promise.all(
        categoriesData.map(async (category) => {
            return prisma.category.create({
                data: category,
            });
        })
    );

    // console.log('Categories seeded:', createdCategories);
    console.log('Categories seeded successfully!');

    // Products
    const categories = await prisma.category.findMany(); // Fetch all categories

    if (categories.length === 0) {
        console.error('No categories found. Please seed categories first.');
        return;
    }

    const productsData = [];
    const totalProducts = 100;
    const productsPerCategory = 10;

    // Generate products for each category
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];

        for (let j = 1; j <= productsPerCategory; j++) {
            const productName = `${category.name}${j}`;
            const productImageURL = `http://localhost:3000/images/${productName.toLowerCase().split(' ').join('_')}.jpeg`;

            const productData = {
                name: productName,
                description: `Description for ${productName}`,
                price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
                stock_quantity: Math.floor(Math.random() * 100) + 1, // Random stock quantity between 1 and 100
                category_id: category.id,
                images: {
                    create: {
                        url: productImageURL,
                    },
                },
            };

            productsData.push(productData);
        }
    }

    // Seed products
    const createdProducts = await Promise.all(
        productsData.map(async (product) => {
            return prisma.product.create({
                data: product,
            });
        })
    );

    // console.log('Products seeded:', createdProducts);
    console.log('Products seeded successfully!');

    // Carts
    // const users = await prisma.user.findMany(); // Fetch all users
    // const products = await prisma.product.findMany();

    // if (users.length === 0) {
    //     console.error('No users found. Please seed users first.');
    //     return;
    // }

    // const cartsData = [];
    // const cartItemsData = [];
    // const minCartsPerUser = 1;
    // const maxCartsPerUser = 5;
    // const minCartItemsPerCart = 5;
    // const maxCartItemsPerCart = 10;

    // // Generate carts and cart items for each user
    // for (let i = 0; i < users.length; i++) {
    //     const user = users[i];
    //     const numCarts = Math.floor(Math.random() * (maxCartsPerUser - minCartsPerUser + 1)) + minCartsPerUser;

    //     for (let j = 0; j < numCarts; j++) {
    //         const cartData = {
    //             user_id: user.id,
    //         };

    //         // Create cart
    //         const createdCart = await prisma.cart.create({
    //             data: cartData,
    //         });

    //         cartsData.push(createdCart);

    //         const numCartItems = Math.floor(Math.random() * (maxCartItemsPerCart - minCartItemsPerCart + 1)) + minCartItemsPerCart;

    //         // Select random product IDs from available products
    //         const selectedProductIds = getRandomProductIds(products, numCartItems);

    //         // Generate cart items
    //         for (let k = 0; k < numCartItems; k++) {
    //             const productId = selectedProductIds[k];

    //             const cartItemData = {
    //                 quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
    //                 product_id: productId,
    //                 cart_id: createdCart.id,
    //             };

    //             cartItemsData.push(cartItemData);

    //             // const productId = selectedProductIds[k];

    //             // const cartItemData = {
    //             //     quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
    //             //     product: {
    //             //         connect: { id: productId },
    //             //     },
    //             //     cart: {
    //             //         connect: { id: createdCart.id },
    //             //     },
    //             // };

    //             // cartItemsData.push(cartItemData);
    //         }
    //     }
    // }

    // // Seed carts and cart items
    // const createdCarts = await prisma.cart.createMany({
    //     data: cartsData,
    // });

    // const createdCartItems = await prisma.cartItem.createMany({
    //     data: cartItemsData.map((item) => ({
    //         quantity: item.quantity,
    //         product_id: item.product_id,
    //         cart_id: item.cart_id,
    //       })),
    // });

    // // console.log('Carts seeded:', createdCarts);
    // console.log('Carts seeded successfflly');
    // // console.log('Cart items seeded:', createdCartItems);
    // console.log('Cart items seeded successfflly!');

    // // Helper function to select random product IDs from available products
    // function getRandomProductIds(products: any[], numItems: number) {
    //     const shuffledProducts = products.sort(() => 0.5 - Math.random());
    //     return shuffledProducts.slice(0, numItems).map((product) => product.id);
    // }

    // Reviews
    const users = await prisma.user.findMany(); // Fetch all users
    const products = await prisma.product.findMany(); // Fetch all products

    if (users.length === 0) {
        console.error('No users found. Please seed users first.');
        return;
    }

    if (products.length === 0) {
        console.error('No products found. Please seed products first.');
        return;
    }

    const reviewsData = [];

    // Generate reviews for each product
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const numReviews = Math.floor(Math.random() * (7 - 3 + 1)) + 3; // Random number of reviews between 3 and 7

        const selectedUsers = selectRandomUsers(users, numReviews); // Select random users for reviews

        for (let j = 0; j < numReviews; j++) {
            const reviewData = {
                rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
                comment: `Comment for ${product.name} by ${selectedUsers[j].username}`,
                user_id: selectedUsers[j].id,
                product_id: product.id,
            };

            reviewsData.push(reviewData);
        }
    }

    // Seed reviews
    const createdReviews = await prisma.review.createMany({
        data: reviewsData,
    });

    console.log('Reviews seeded successfully!');

    // Helper function to select random users without repetition
    function selectRandomUsers(users: any[], numUsers: number) { //! any
        const shuffledUsers = users.sort(() => 0.5 - Math.random());
        return shuffledUsers.slice(0, numUsers);
    }

    // PasswordResets
    if (users.length === 0) {
        console.error('No users found. Please seed users first.');
        return;
    }

    const passwordResetTokensData = [];

    for (const user of users) {
        const resetCode = generateResetCode();
        const expirationTime = addMinutes(new Date(), 15);

        const resetTokenData = {
            user_id: user.id,
            reset_code: resetCode,
            expires_at: expirationTime,
        };

        passwordResetTokensData.push(resetTokenData);
    }

    // Seed password reset tokens
    const createdTokens = await prisma.passwordResetToken.createMany({
        data: passwordResetTokensData,
    });

    console.log('Password reset tokens seeded successfully:', createdTokens);

    // Helper function to generate a random reset code
    function generateResetCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let resetCode = '';
        for (let i = 0; i < 6; i++) {
            resetCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return resetCode;
    }

    console.log("All records inserted successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
