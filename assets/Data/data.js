const ShopData = [
  {
    id: {
      $oid: "a12df2329dfjl89ppo3",
    },
    ShopName: "Kebabs & Kurries",
    farAway: "21.2",
    businessAddress: "12 Iddo Street, Abuja",
    images: require("../images/restaurants/kebabs_kurries.jpeg"),
    rating: 3.9,
    numReviews: 105,
    coordinates: {
      lat: -26.1888612,
      lng: 28.246325,
    },
    discount: 199,
    deliveryTimes: 150,
    collectTimes: 50,
    foodType: "Grilled Beef, Pepper Soup, Chicken...",
    productData: [
      {
        id: {
          $oid: "a12df2329dfjl89ppo3",
        },
        name: "Jollof Rice",
        price: 199.99,
        image: require("../images/eatable-foods/jollof_rice.jpeg"),
        brand: "Butter Brand",
        isFeatured: true,
        description: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        countInStock: 120,
        category: {
          $oid: "16kdf23iojl89ddlj",
          name: "food",
        },
        __v: 0,
      },
      {
        id: {
          $oid: "2okdf4429dfjl89qlpx",
        },
        name: "Egusi and Banga",
        price: 99.95,
        image: require("../images/eatable-foods/egusi_1.jpeg"),
        brand: "Spice Haven",
        isFeatured: false,
        description: "Spicy grilled with meat on skewers",
        countInStock: 80,
        category: {
          $oid: "26kdf3399IQl89dd",
          name: "food",
        },
        __v: 1,
      },
      {
        id: {
          $oid: "6dkdf3329dGLOP$12",
        },
        name: "Grilled Rice",
        price: 99.95,
        image: require("../images/eatable-foods/rice_beans.jpeg"),
        brand: "Spice Haven",
        isFeatured: false,
        description: "Spicy grilled meat on skewers",
        countInStock: 25,
        category: {
          $oid: "21bdf33ioUZXvtq",
          name: "food",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "2okdf3329dfjl89qlpx",
    },
    ShopName: "Amala360",
    farAway: "15.5",
    businessAddress: "8 Zik Avenue, Lagos",
    images: require("../images/restaurants/amala360_2.jpeg"),
    rating: 4.2,
    numReviews: 90,
    coordinates: {
      lat: -12.3456789,
      lng: 45.6789012,
    },
    discount: 25,
    deliveryTimes: 27,
    collectTimes: 10,
    foodType: "Jollof Rice, Chicken, Salad...",
    productData: [
      {
        id: {
          $oid: "2okdf3329dfjl89qlpx",
        },
        name: "Soup & Stew",
        price: 99.95,
        image: require("../images/eatable-foods/egusi_1.jpeg"),
        brand: "Spice Haven",
        isFeatured: false,
        description: "Spicy grilled with meat on skewers",
        countInStock: 80,
        category: {
          $oid: "26kdf33iojl89ddlj",
          name: "food",
        },
        __v: 1,
      },
      {
        id: {
          $oid: "a343dfVB29dfjl89pp",
        },
        name: "Jollof Rice",
        price: 199.99,
        image: require("../images/eatable-foods/jollof_rice.jpeg"),
        brand: "Butter Brand",
        isFeatured: true,
        description: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        countInStock: 120,
        category: {
          $oid: "16kdf543ojl89ddHT",
          name: "food",
        },
        __v: 0,
      },
      {
        id: {
          $oid: "6dGHZX32dfzxddlj",
        },
        name: "Grilled Rice",
        price: 99.95,
        image: require("../images/eatable-foods/rice_beans.jpeg"),
        brand: "Spice Haven",
        isFeatured: false,
        description: "Spicy grilled meat on skewers",
        countInStock: 25,
        category: {
          $oid: "21bdf$221iojl89f$",
          name: "food",
        },
        __v: 1,
      },
    ],
  },

  {
    id: {
      $oid: "6dkdD329dfupzt9j4",
    },
    ShopName: "Babbi Restaurant",
    farAway: "65.5",
    businessAddress: "8 Zik Avenue, Lagos",
    images: require("../images/restaurants/babbi.jpeg"),
    rating: 4.2,
    numReviews: 190,
    coordinates: {
      lat: -16.3456789,
      lng: 25.6789012,
    },
    discount: 35,
    deliveryTimes: 11,
    collectTimes: 5,
    foodType: "Jollof Rice, White Rice, Beans...",
    productData: [
      {
        id: {
          $oid: "6dkdf3329dfzxddlj4",
        },
        name: "Grilled Rice",
        price: 99.95,
        image: require("../images/eatable-foods/rice_beans.jpeg"),
        brand: "Spice Haven",
        isFeatured: false,
        description: "Spicy grilled meat on skewers",
        countInStock: 25,
        category: {
          $oid: "21bdf33iojl89ffm",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "6df3329dfjl89dxzmn",
    },
    ShopName: "Chicken Cottage",
    farAway: "12.25",
    businessAddress: "8 Zik Avenue, Lagos",
    images: require("../images/restaurants/chicken_cottage.jpg"),
    rating: 4.2,
    numReviews: 220,
    coordinates: {
      lat: -12.3456789,
      lng: 45.6789012,
    },
    discount: 15,
    deliveryTimes: 5,
    collectTimes: 3,
    foodType: "Garri, Yam, custard...",
    productData: [
      {
        id: {
          $oid: "6df3329dfjl89dxzmn",
        },
        name: "Local Delicacies",
        price: 200.95,
        image: require("../images/eatable-foods/white_soup_eba.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Brands with values",
        countInStock: 80,
        category: {
          $oid: "26kdf33iojl89ddlj",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "dkdf3329dfjl89ymn",
    },
    ShopName: "Tutti Fruit",
    farAway: "15.5",
    businessAddress: "8 Zik Avenue, Lagos",
    images: require("../images/restaurants/tutti_fruit.jpeg"),
    rating: 4.2,
    numReviews: 145,
    coordinates: {
      lat: -15.3456789,
      lng: 65.6789012,
    },
    discount: 150,
    deliveryTimes: 20,
    collectTimes: 8,
    foodType: "Apples, Banana, Salads...",
    productData: [
      {
        id: {
          $oid: "dkdf3329dfjl89ymn",
        },
        name: "BreakFast Dishes",
        price: 450.95,
        image: require("../images/raw-foods/banana.jpeg"),
        brand: "Spice Haven",
        isFeatured: false,
        description: "Spicy grilled meat on skewers",
        countInStock: 80,
        category: {
          $oid: "26kdf33iojl89ddlj",
          name: "fruits",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "aaitdf3329dfjl89dj4",
    },
    ShopName: "Sisishola Amala & Co",
    farAway: "13.5",
    businessAddress: "8 Zik Avenue, Lagos",
    images: require("../images/restaurants/amala360.jpeg"),
    rating: 3.2,
    numReviews: 390,
    coordinates: {
      lat: -22.3456789,
      lng: 55.6789012,
    },
    discount: 150,
    deliveryTimes: 10,
    collectTimes: 4,
    foodType: "Jollof Rice, Chicken Soup, Salad...",
    productData: [
      {
        id: {
          $oid: "aaitdf3329dfjl89dj4",
        },
        name: "Seafoods Specials",
        price: 299.95,
        image: require("../images/eatable-foods/white_soup_fufu.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Spicy grilled meat on skewers",
        countInStock: 80,
        category: {
          $oid: "212pmf33iojl8zznm",
          name: "food",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "6dkdf3329dfjl89pplt",
    },
    ShopName: "Chef Signature & Catering Services",
    farAway: "12.5",
    businessAddress: "8 Zik Avenue, Lagos",
    images: require("../images/restaurants/kebabs_kurries_2.jpeg"),
    rating: 4.4,
    numReviews: 590,
    coordinates: {
      lat: -33.3456789,
      lng: 15.6789012,
    },
    discount: 15,
    deliveryTimes: 40,
    collectTimes: 18,
    foodType: "Jollof Rice, Chicken, Salad...",
    productData: [
      {
        id: {
          $oid: "6dkdf3329dfjl89pplt",
        },
        name: "Regional Specialties",
        price: 399.95,
        image: require("../images/eatable-foods/egusi_eba.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Spicy grilled meat on skewers",
        countInStock: 80,
        category: {
          $oid: "1qmmf33iojl89opq2",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "1xmzf3329dfjl8top1",
    },
    ShopName: "KetchUp Fast Food",
    farAway: "14.5",
    businessAddress: "8 Zik Avenue, Lagos",
    images: require("../images/restaurants/tutti_fruit.jpeg"),

    rating: 4.6,
    numReviews: 690,
    coordinates: {
      lat: -12.3456789,
      lng: 45.6789012,
    },
    discount: 150,
    deliveryTimes: 70,
    collectTimes: 38,
    foodType: "Jollof Rice, Chicken, Salad...",
    productData: [
      {
        id: {
          $oid: "1xmzf3329dfjl8top1",
        },
        name: "Local Combo",
        price: 99.95,
        image: require("../images/eatable-foods/banga_soup.jpeg"),
        brand: "Spice Haven",
        isFeatured: false,
        description: "Spicy grilled meat on skewers",
        countInStock: 80,
        category: {
          $oid: "10qdf33iojl89dzld",
          name: "food",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "6ptdf3329dfjl89ll1z",
    },
    ShopName: "Olivier Burger",
    farAway: "16.5",
    businessAddress: "8 Zik Avenue, Lagos",
    images: require("../images/restaurants/olivier_burger.jpeg"),
    rating: 4.23,
    numReviews: 290,
    coordinates: {
      lat: -2.3456789,
      lng: 25.6789012,
    },
    discount: 15,
    deliveryTimes: 220,
    collectTimes: 78,
    foodType: "Shawarma, Burger, Hotdog...",
    productData: [
      {
        id: {
          $oid: "6ptdf3329dfjl89ll1z",
        },
        name: "Desert",
        price: 99.95,
        image: require("../images/products/biscuits.jpeg"),
        brand: "Spice Haven",
        isFeatured: false,
        description: "Spicy grilled meat on skewers",
        countInStock: 80,
        category: {
          $oid: "10YBcf33iojl89Koa",
          name: "fast food",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "f3Ruq1K9dfjl89ddlj4",
    },
    ShopName: "Passion Trust Cosmetics & supermarket",
    farAway: "16.5",
    businessAddress: "8 Aminu Kano Crescent, Wuse Abuja",
    images: require("../images/stores/passion_trust.jpeg"),
    rating: 4.1,
    numReviews: 200,
    coordinates: {
      lat: -2.3456789,
      lng: 25.6789012,
    },
    discount: 150,
    deliveryTimes: 20,
    collectTimes: 10,
    foodType: "Jollof Rice, Chicken, Salad...",
    productType: "Facial Creams, Massage box, MakeUp Kit...",
    productData: [
      {
        id: {
          $oid: "f3Ruq1K9dfjl89ddlj4",
        },
        name: "Packaged goods",
        price: 99.95,
        image: require("../images/products/school_provision.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Haven on body!",
        countInStock: 80,
        category: {
          $oid: "19Vdf33iojl76OpTy",
          name: "products",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "6dkdf440tyjl89ddlj4",
    },
    ShopName: "Manner Stores",
    farAway: "36.5",
    businessAddress: "8 Aminu Kano Crescent, Wuse Abuja",
    images: require("../images/stores/passion_trust_2.jpeg"),
    rating: 4.4,
    numReviews: 390,
    coordinates: {
      lat: -22.3456789,
      lng: 45.6789012,
    },
    discount: 100,
    deliveryTimes: 40,
    collectTimes: 28,
    foodType: "Butter, Sugar, groundnut",
    productData: [
      {
        id: {
          $oid: "6dkdf440tyjl89ddlj4",
        },
        name: "Peak Milk",
        price: 69.99,
        image: require("../images/products/carton_milk_images.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Make it make sense with low Prices",
        countInStock: 180,
        category: {
          $oid: "26kdtete34jl89ddlj",
          name: "Product",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "44tpxz9dfjl89ioqwp",
    },
    ShopName: "Unique Global Store",
    farAway: "26.5",
    businessAddress: "8 Aminu Kano Crescent, Wuse Abuja",
    images: require("../images/stores/unique_global_stores.jpeg"),
    rating: 4.0,
    numReviews: 30,
    coordinates: {
      lat: -12.3456789,
      lng: 15.6789012,
    },
    discount: 190,
    deliveryTimes: 50,
    collectTimes: 18,
    foodType: "Buter, Sugar, groundnut",
    productData: [
      {
        id: {
          $oid: "44tpxz9dfjl89ioqwp",
        },
        name: "Butter",
        price: 69.99,
        image: require("../images/stores/unique_global_stores.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Make it make sense with low Prices",
        countInStock: 180,
        category: {
          $oid: "ewqp21Qiojl7p1p",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "6dkdf44igfjl89ywq",
    },
    ShopName: "Excellent Shop",
    farAway: "56.5",
    businessAddress: "8 Aminu Kano Crescent, Wuse Abuja",
    images: require("../images/stores/unique_global_stores.jpeg"),
    rating: 4.2,
    numReviews: 90,
    coordinates: {
      lat: -12.3456789,
      lng: 19.6789012,
    },
    discount: 100,
    deliveryTimes: 120,
    collectTimes: 70,
    foodType: "Buter, Sugar, groundnut",
    productData: [
      {
        id: {
          $oid: "6dkdf44igfjl89ywq",
        },
        name: "Packaged Provisions",
        price: 69.99,
        image: require("../images/products/school_provision.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Make it make sense with low Prices",
        countInStock: 180,
        category: {
          $oid: "26kdf71oiljl89dd",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "40Pif3329dfjl89ddljt",
    },
    ShopName: "Unique Metro Store",
    farAway: "56.15",
    businessAddress: "8 Aminu Kano Crescent, Wuse Abuja",
    images: require("../images/stores/delis_supermarket.jpeg"),
    rating: 3.4,
    numReviews: 290,
    coordinates: {
      lat: -42.3456789,
      lng: 25.6789012,
    },
    discount: 100,
    deliveryTimes: 40,
    collectTimes: 28,
    foodType: "Buter, Sugar, groundnut",
    productData: [
      {
        id: {
          $oid: "40Pif3329dfjl89ddljt",
        },
        name: "Bag of beans",
        price: 69.99,
        image: require("../images/products/bag_of_beans.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Make it make sense with low Prices",
        countInStock: 180,
        category: {
          $oid: "11dTf33iojl89ddlY",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "23i8fr9dfjlgmxz21",
    },
    ShopName: "Delis Supermarket",
    farAway: "26.5",
    businessAddress: "8 Aminu Kano Crescent, Wuse Abuja",
    images: require("../images/stores/delis_supermarket_2.jpeg"),
    rating: 4.4,
    numReviews: 390,
    coordinates: {
      lat: -22.3456789,
      lng: 25.6789012,
    },
    discount: 299,
    deliveryTimes: 400,
    collectTimes: 218,
    foodType: "Garri, Sugar, groundnut",
    productData: [
      {
        id: {
          $oid: "23i8fr9dfjlgmxz21",
        },
        name: "Garri Ijebu",
        price: 69.99,
        image: require("../images/products/ijebu_garri_bag.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Make it make sense with low Prices",
        countInStock: 180,
        category: {
          $oid: "l01f33iojl89ddlj",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "f3329dfjl89ffvms",
    },
    ShopName: "H-medix",
    farAway: "36.5",
    businessAddress: "8 Aminu Kano Crescent, Wuse Abuja",
    images: require("../images/stores/H-max_stores.jpeg"),
    rating: 4.4,
    numReviews: 390,
    coordinates: {
      lat: -22.3456789,
      lng: 45.6789012,
    },
    discount: 100,
    deliveryTimes: 40,
    collectTimes: 28,
    foodType: "Buter, Sugar, groundnut",
    productData: [
      {
        id: {
          $oid: "f3329dfjl89ffvms",
        },
        name: "Mayonniase",
        price: 69.99,
        image: require("../images/products/mayonniase_butter.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Make it make sense with low Prices",
        countInStock: 180,
        category: {
          $oid: "56fgdf33iojl89ddlj",
        },
        __v: 1,
      },
    ],
  },
  {
    id: {
      $oid: "6dkdf39dfaql9ddlj4",
    },
    ShopName: "Skylark Pharmacy",
    farAway: "36.5",
    businessAddress: "8 Aminu Kano Crescent, Wuse Abuja",
    images: require("../images/stores/passion_trust_2.jpeg"),
    rating: 4.4,
    numReviews: 390,
    coordinates: {
      lat: -22.3456789,
      lng: 45.6789012,
    },
    discount: 100,
    deliveryTimes: 40,
    collectTimes: 28,
    foodType: "Buter, Sugar, groundnut",
    productData: [
      {
        id: {
          $oid: "I0dkdf419x2zjl89dj",
        },
        name: "Peak Milk",
        price: 69.99,
        image: require("../images/products/milk_images.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Make it make sense with low Prices",
        countInStock: 180,
        category: {
          $oid: "26kdf33iojl89ddlj",
        },
        __v: 1,
      },
      {
        id: {
          $oid: "f3329dfOl25ffvTZ",
        },
        name: "Goat Meat",
        price: 69.99,
        image: require("../images/products/mayonniase_butter.jpeg"),
        brand: "Spice Haven",
        isFeatured: true,
        description: "Make it make sense with low Prices",
        countInStock: 180,
        category: {
          $oid: "56fgdf33iojl89ddlj",
        },
        __v: 1,
      },
    ],
  },
];

export const productFilter = [
  { id: 0, name: "Shoes" },
  { id: 1, name: "Cloths" },
  { id: 2, name: "Gadgets" },
  { id: 3, name: "Utensils" },
  { id: 4, name: "Clothings" },
  { id: 5, name: "More" },
];

export const filterShopData = [
  {
    id: 1,
    name: "Fast food",
    image: require("../images/eatable-foods/rice_beans.jpeg"),
  },
  {
    id: 2,
    name: "Barbeque",
    image: require("../images/eatable-foods/egusi_1.jpeg"),
  },
  {
    id: 3,
    name: "western delicacies",
    image: require("../images/eatable-foods/white_soup_eba.jpeg"),
  },
  {
    id: 4,
    name: "H-max Superstores",
    image: require("../images/eatable-foods/banga_soup.jpeg"),
  },
  {
    id: 5,
    name: "Deli Superstores",
    image: require("../images/eatable-foods/white_soup_fufu.jpeg"),
  },
  {
    id: 6,
    name: "chicken Cottage",
    image: require("../images/products/biscuits.jpeg"),
  },
  {
    id: 7,
    name: "Amala 360",
    image: require("../images/products/biscuits.jpeg"),
  },
];

export const MenuData = [
  { key: 0, title: "STUDENT'S PROVISON", special: false },
  { key: 1, title: "HAPPY MEALS", special: false },
  { key: 2, title: "GROCERIES FLAVOURS", special: false },
  { key: 3, title: "RICE VARIETY", special: false },
  { key: 4, title: "BEANS VARIETY", special: false },
  { key: 5, title: "SUPPLEMENTS", special: false },
  { key: 6, title: "YAM VARIETY", special: false },
  { key: 7, title: "BEVERAGES", special: false },
  { key: 8, title: "CHICKEN & FRIES", special: false },
  { key: 9, title: "FAST FOODS", special: false },
  { key: 10, title: "DRINKS", special: false },
];

export const specialData = [
  { key: 0, title: "LIMITED OFFER" },
  { key: 1, title: "GO GROCERIES" },
  { key: 2, title: "GO MEALS" },
  { key: 3, title: "DELUXE PROMO" },
];

export const menu = [
  { key: 1, title: "SOUP" },
  { key: 2, title: "GROCERIES" },
  { key: 3, title: "FRIES" },
  { key: 4, title: "MILK SHAKES" },
  { key: 5, title: "LIMITED OFFER" },
  { key: 6, title: "RICE" },
  { key: 7, title: "VEGGIE" },
  { key: 8, title: "BEVERAGE" },
];

export const menuDetailedData = [
  {
    id: 0,
    meal: "Rice",
    price: 100.99,
    image: require("../images/eatable-foods/jollof_rice.jpeg"),
    details: "Tasty, yummy with crunchy chickens, with mix 100% fresh beef",
    preferenceTitle: [
      "Choose your 2 d dips",
      "Choose your 1st drink flavour",
      "Would you like extra source?",
      "would you like add our tasty Beefs/chicken variety?",
    ],
    preferenceData: [
      [
        { id: 10, name: "Jollof Rice", price: 200, checked: false },
        { id: 11, name: "White Rice", price: 500, checked: false },
        { id: 12, name: "Fried Rice", price: 400, checked: false },
      ],
      [
        { id: 13, name: "Small Coke", price: 200, checked: false },
        { id: 14, name: "Zero Coke", price: 200, checked: false },
        { id: 15, name: "Fearless", price: 200, checked: false },
      ],
      [
        { id: 16, name: "Goat Meat", price: 200, checked: false },
        { id: 17, name: "Cow Meat", price: 500, checked: false },
        { id: 18, name: "Full chicken", price: 400, checked: false },
      ],
    ],
    minimum_quantity: [2, 1, 1, null, null],
    counter: [0, 0, 0, 0, 0],
    required: [true, true, true, false, false],
  },
  {
    id: 1,
    meal: "Soup",
    price: 200.99,
    image: require("../images/eatable-foods/egusi_eba.jpeg"),
    details: "Tasty, yummy with crunchy chickens, with mix 100% fresh beef",
    preferenceTitle: [
      "Choose your 2 d dips",
      "Choose your 1st drink flavour",
      "Would you like extra source?",
      "would you like add our tasty Beefs/chicken variety?",
    ],
    preferenceData: [
      [
        { id: 10, name: "White Soup", price: 200, checked: false },
        { id: 11, name: "Egusi Soup", price: 500, checked: false },
        { id: 12, name: "Egusi Soup", price: 400, checked: false },
      ],
      [
        { id: 13, name: "Small Coke", price: 200, checked: false },
        { id: 14, name: "Zero Coke", price: 200, checked: false },
        { id: 15, name: "Fearless", price: 200, checked: false },
      ],
      [
        { id: 16, name: "Goat Meat", price: 200, checked: false },
        { id: 17, name: "Cow Meat", price: 500, checked: false },
        { id: 18, name: "Full chicken", price: 400, checked: false },
      ],
    ],
    minimum_quantity: [2, 1, 1, null, null],
    counter: [0, 0, 0, 0, 0],
    required: [true, true, true, false, false],
  },

  {
    id: 2,
    meal: "Soup",
    price: 200.99,
    image: require("../images/eatable-foods/egusi_eba.jpeg"),
    details: "Tasty, yummy with crunchy chickens, with mix 100% fresh beef",
    preferenceTitle: [
      "Choose your 2 d dips",
      "Choose your 1st drink flavour",
      "Would you like extra source?",
      "would you like add our tasty Beefs/chicken variety?",
    ],
    preferenceData: [
      [
        { id: 10, name: "White Soup", price: 200, checked: false },
        { id: 11, name: "Egusi Soup", price: 500, checked: false },
        { id: 12, name: "Egusi Soup", price: 400, checked: false },
      ],
      [
        { id: 13, name: "Small Coke", price: 200, checked: false },
        { id: 14, name: "Zero Coke", price: 200, checked: false },
        { id: 15, name: "Fearless", price: 200, checked: false },
      ],
      [
        { id: 16, name: "Goat Meat", price: 200, checked: false },
        { id: 17, name: "Cow Meat", price: 500, checked: false },
        { id: 18, name: "Full chicken", price: 400, checked: false },
      ],
    ],
    minimum_quantity: [2, 1, 1, null, null],
    counter: [0, 0, 0, 0, 0],
    required: [true, true, true, false, false],
  },
];

export const customerOrders = [
  {
    id: 1,
    phone: "555-1234",
    shippingAddress1: "123 Main St",
    shippingAddress2: "Apt 4B",
    city: "Cityville",
    zipCode: "12345",
  },
  {
    id: 2,
    phone: "555-5678",
    shippingAddress1: "456 Oak St",
    shippingAddress2: "Suite 302",
    city: "Townsville",
    zipCode: "67890",
  },
  {
    id: 3,
    phone: "555-9876",
    shippingAddress1: "789 Pine St",
    shippingAddress2: "Unit 10",
    city: "Villagetown",
    zipCode: "34567",
  },
  {
    id: 4,
    phone: "555-4321",
    shippingAddress1: "876 Elm St",
    shippingAddress2: "Apt 5C",
    city: "Hamletsville",
    zipCode: "54321",
  },
  {
    id: 5,
    phone: "555-8765",
    shippingAddress1: "234 Cedar St",
    shippingAddress2: "Suite 101",
    city: "Burgville",
    zipCode: "98765",
  },
];

export function getShopData() {
  return ShopData;
}

export function getRestaurantData(id) {
  return PRODUCTS.find((product) => product.id === id);
}
