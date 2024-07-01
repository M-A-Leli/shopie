"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var date_fns_1 = require("date-fns");
var Prisma_config_1 = require("./config/Prisma.config");
var bcrypt_1 = require("bcrypt");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        // Helper function to select random users without repetition
        function selectRandomUsers(users, numUsers) {
            var shuffledUsers = users.sort(function () { return 0.5 - Math.random(); });
            return shuffledUsers.slice(0, numUsers);
        }
        // Helper function to generate a random reset code
        function generateResetCode() {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var resetCode = '';
            for (var i = 0; i < 6; i++) {
                resetCode += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return resetCode;
        }
        var dummyUsers, i, salt, hash, userData, user, categoriesData, createdCategories, categories, productsData, totalProducts, productsPerCategory, i, category, j, productName, productImageURL, productData, createdProducts, users, products, reviewsData, i, product, numReviews, selectedUsers, j, reviewData, createdReviews, passwordResetTokensData, _i, users_1, user, resetCode, expirationTime, resetTokenData, createdTokens;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dummyUsers = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 10)) return [3 /*break*/, 7];
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash("Password@00".concat(i), salt)];
                case 3:
                    hash = _a.sent();
                    userData = {
                        username: "user".concat(i),
                        email: "user".concat(i, "@example.com"),
                        password: hash,
                        salt: salt,
                        phone_number: "070000000".concat(i),
                    };
                    return [4 /*yield*/, Prisma_config_1.default.user.create({
                            data: userData,
                        })];
                case 4:
                    user = _a.sent();
                    dummyUsers.push(user);
                    if (!(i === 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Prisma_config_1.default.admin.create({
                            data: {
                                user_id: user.id,
                            },
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7:
                    // console.log('Dummy users seeded:', dummyUsers);
                    console.log('Dummy users seeded successfully!');
                    categoriesData = [
                        {
                            name: "Electronics",
                            image_url: "/images/electronics.jpg",
                        },
                        {
                            name: "Clothing",
                            image_url: "/images/clothing.jpg",
                        },
                        {
                            name: "Home and Garden",
                            image_url: "/images/home_and_garden.jpg",
                        },
                        {
                            name: "Books",
                            image_url: "/images/books.jpg",
                        },
                        {
                            name: "Sports and Outdoors",
                            image_url: "/images/sports_and_outdoors.jpg",
                        },
                        {
                            name: "Furniture",
                            image_url: "/images/furniture.jpg",
                        },
                        {
                            name: "Beauty and Personal Care",
                            image_url: "/images/beauty_and_personal_care.jpg",
                        },
                        {
                            name: "Food and Grocery",
                            image_url: "/images/food_and_grocery.jpg",
                        },
                        {
                            name: "Pet Supplies",
                            image_url: "/images/pet_supplies.jpg",
                        },
                        {
                            name: "Toys and Games",
                            image_url: "/images/toys_and_games.jpg",
                        },
                    ];
                    return [4 /*yield*/, Promise.all(categoriesData.map(function (category) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, Prisma_config_1.default.category.create({
                                        data: category,
                                    })];
                            });
                        }); }))];
                case 8:
                    createdCategories = _a.sent();
                    // console.log('Categories seeded:', createdCategories);
                    console.log('Categories seeded successfully!');
                    return [4 /*yield*/, Prisma_config_1.default.category.findMany()];
                case 9:
                    categories = _a.sent();
                    if (categories.length === 0) {
                        console.error('No categories found. Please seed categories first.');
                        return [2 /*return*/];
                    }
                    productsData = [];
                    totalProducts = 100;
                    productsPerCategory = 10;
                    // Generate products for each category
                    for (i = 0; i < categories.length; i++) {
                        category = categories[i];
                        for (j = 1; j <= productsPerCategory; j++) {
                            productName = "".concat(category.name).concat(j);
                            productImageURL = "".concat(productName.toLowerCase(), ".jpg");
                            productData = {
                                name: productName,
                                description: "Description for ".concat(productName),
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
                    return [4 /*yield*/, Promise.all(productsData.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, Prisma_config_1.default.product.create({
                                        data: product,
                                    })];
                            });
                        }); }))];
                case 10:
                    createdProducts = _a.sent();
                    // console.log('Products seeded:', createdProducts);
                    console.log('Products seeded successfully!');
                    return [4 /*yield*/, Prisma_config_1.default.user.findMany()];
                case 11:
                    users = _a.sent();
                    return [4 /*yield*/, Prisma_config_1.default.product.findMany()];
                case 12:
                    products = _a.sent();
                    if (users.length === 0) {
                        console.error('No users found. Please seed users first.');
                        return [2 /*return*/];
                    }
                    if (products.length === 0) {
                        console.error('No products found. Please seed products first.');
                        return [2 /*return*/];
                    }
                    reviewsData = [];
                    // Generate reviews for each product
                    for (i = 0; i < products.length; i++) {
                        product = products[i];
                        numReviews = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
                        selectedUsers = selectRandomUsers(users, numReviews);
                        for (j = 0; j < numReviews; j++) {
                            reviewData = {
                                rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
                                comment: "Comment for ".concat(product.name, " by ").concat(selectedUsers[j].username),
                                user_id: selectedUsers[j].id,
                                product_id: product.id,
                            };
                            reviewsData.push(reviewData);
                        }
                    }
                    return [4 /*yield*/, Prisma_config_1.default.review.createMany({
                            data: reviewsData,
                        })];
                case 13:
                    createdReviews = _a.sent();
                    console.log('Reviews seeded successfully!');
                    // PasswordResets
                    if (users.length === 0) {
                        console.error('No users found. Please seed users first.');
                        return [2 /*return*/];
                    }
                    passwordResetTokensData = [];
                    for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                        user = users_1[_i];
                        resetCode = generateResetCode();
                        expirationTime = (0, date_fns_1.addMinutes)(new Date(), 15);
                        resetTokenData = {
                            user_id: user.id,
                            reset_code: resetCode,
                            expires_at: expirationTime,
                        };
                        passwordResetTokensData.push(resetTokenData);
                    }
                    return [4 /*yield*/, Prisma_config_1.default.passwordResetToken.createMany({
                            data: passwordResetTokensData,
                        })];
                case 14:
                    createdTokens = _a.sent();
                    console.log('Password reset tokens seeded successfully:', createdTokens);
                    console.log("All records inserted successfully!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Prisma_config_1.default.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
