// Mock database for kids clothing store
const products = [
    {
        id: "p1",
        name: "Детская футболка с принтом",
        name_kg: "Принти бар балдар футболкасы",
        price: 850,
        category: "kids",
        badge: "Хит",
        image: "https://basket-14.wbbasket.ru/vol2162/part216274/216274102/images/c246x328/1.webp",
        description: "Яркая и комфортная футболка из 100% хлопка с веселым принтом.",
        description_kg: "100% пахтадан жасалган, шайыр принти бар ачык жана ыңгайлуу футболка.",
        sizes: ["104", "110", "116", "122"]
    },
    {
        id: "p2",
        name: "Детский комбинезон",
        name_kg: "Балдар комбинезону",
        price: 2500,
        category: "kids",
        badge: "Новинка",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Удобный джинсовый комбинезон для активных игр на свежем воздухе.",
        description_kg: "Таза абада активдүү оюндар үчүн ыңгайлуу жынсы комбинезон.",
        sizes: ["98", "104", "110", "116"]
    },
    {
        id: "p3",
        name: "Детские джинсы",
        name_kg: "Балдар жынсысы",
        price: 1800,
        category: "kids",
        image: "https://basket-15.wbbasket.ru/vol2342/part234209/234209028/images/big/1.webp",
        description: "Классические детские джинсы на резинке для максимального комфорта.",
        description_kg: "Максималдуу ыңгайлуулук үчүн резиналуу классикалык балдар жынсысы.",
        sizes: ["110", "116", "122", "128"]
    },
    {
        id: "p4",
        name: "Платье для девочки",
        name_kg: "Кыздар үчүн көйнөк",
        price: 1950,
        category: "kids",
        badge: "Хит",
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Нарядное платье из легкой ткани с цветочным узором.",
        description_kg: "Гүл үлгүсү бар жеңил кездемеден тигилген кооз көйнөк.",
        sizes: ["104", "110", "116", "122"]
    },
    {
        id: "p5",
        name: "Детская куртка",
        name_kg: "Балдар күрмөсү",
        price: 3200,
        category: "kids",
        badge: "Новинка",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Теплая и легкая демисезонная куртка с капюшоном.",
        description_kg: "Капюшону бар жылуу жана жеңил демисезондук күрмө.",
        sizes: ["116", "122", "128", "134"]
    },
    {
        id: "p6",
        name: "Пижама детская",
        name_kg: "Балдар пижамасы",
        price: 1300,
        category: "kids",
        image: "https://www.tekstil-vsem.ru/images/product/l/154483dc92d4.jpg",
        description: "Мягкая хлопковая пижама для крепкого сна с забавными рисунками.",
        description_kg: "Кызыктуу сүрөттөрү бар, тынч уйку үчүн жумшак пахта пижамасы.",
        sizes: ["104", "110", "116"]
    },
    {
        id: "p7",
        name: "Кроссовки для детей",
        name_kg: "Балдар кроссовкасы",
        price: 2800,
        category: "kids",
        badge: "Хит",
        image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Легкие кроссовки на липучках, идеально подходят для бега и игр.",
        description_kg: "Жүгүрүүгө жана ойноого идеалдуу, жабышкактуу жеңил кроссовка.",
        sizes: ["26", "28", "30", "32"]
    },
    {
        id: "p8",
        name: "Детская шапка",
        name_kg: "Балдар баш кийими",
        price: 650,
        category: "kids",
        image: "https://basket-14.wbbasket.ru/vol2084/part208422/208422621/images/c246x328/1.webp",
        description: "Теплая вязаная шапочка из гипоаллергенной пряжи ярких расцветок.",
        description_kg: "Ачык түстөгү гипоаллергендик жиптен токулган жылуу баш кийим.",
        sizes: ["48", "50", "52", "54"]
    }
];

// Provide helper to get product by id globally
window.getProductById = (id) => {
    return products.find(p => p.id === id);
};

window.getLocalizedName = (item) => {
    const product = window.getProductById(item.id) || item;
    const nameKg = product.name_kg;
    return (window.currentLang === 'kg' && nameKg) ? nameKg : product.name;
};

window.getLocalizedDesc = (item) => {
    const product = window.getProductById(item.id) || item;
    const descKg = product.description_kg;
    return (window.currentLang === 'kg' && descKg) ? descKg : product.description;
};
