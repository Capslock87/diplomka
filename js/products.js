// Mock database for clothing store
const products = [
    {
        id: "p1",
        name: "Базовая белая футболка",
        price: 1500,
        category: "men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Классическая белая футболка из 100% органического хлопка. Идеально подходит для повседневной носки.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: "p2",
        name: "Джинсовая куртка оверсайз",
        price: 4500,
        category: "woomen",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Стильная джинсовая куртка свободного кроя. Отличное дополнение к весеннему и осеннему гардеробу.",
        sizes: ["XS", "S", "M", "L"]
    },
    {
        id: "p3",
        name: "Классические синие джинсы",
        price: 3500,
        category: "men",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Прямые джинсы классического синего цвета с пятью карманами.",
        sizes: ["30", "32", "34", "36"]
    },
    {
        id: "p4",
        name: "Летнее платье миди",
        price: 3200,
        category: "woomen",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYQxoDEs4iCicoM8UoXqjaTDwxmAIYJBjkA&s",
        description: "Легкое платье длины миди с цветочным принтом. Идеально для жарких летних дней.",
        sizes: ["S", "M", "L"]
    },
    {
        id: "p5",
        name: "Худи с принтом",
        price: 2800,
        category: "men",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Комфортное худи с ярким принтом на груди. Выполнено из мягкого футера с начесом.",
        sizes: ["M", "L", "XL", "XXL"]
    },
    {
        id: "p6",
        name: "Строгий женский костюм",
        price: 8500,
        category: "woomen",
        image: "https://stockmann.ru/istk/aR5FJAReBenIpDy3T_qdQGYX7D1XRl6_OjnpA_xKmxw/rs:fill:747::1/g:no/bG9jYWw6Ly8vdXBsb2FkLy9jbXMvc3RhdGljL2Zhc2hpb24tYmxvZy9hcnRpY2xlLzY1MDA1OTc1YTI1OTgwNTI0YjBjZTBlMC9ibG9jay82NTAwNWViYzdlZDAzOWRkYzEwYmY3NmMvQXVxcTIwenBBT1BYTEpuZ1c1TmJmY1JUMW4yWnpXZUxwa1FrYVlwWC5qcGc.jpg",
        description: "Элегантный брючный костюм-двойка. Подходит для офиса и официальных мероприятий.",
        sizes: ["XS", "S", "M"]
    },
    {
        id: "p7",
        name: "Спортивные шорты",
        price: 1200,
        category: "men",
        image: "https://cdn.demix.ru/upload/mdm/media_content/resize/3c3/1000_1000_7623/106448880299.jpg",
        description: "Легкие шорты для тренировок и активного отдыха.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: "p8",
        name: "Вязаный свитер",
        price: 3800,
        category: "woomen",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Теплый и уютный вязаный свитер с высоким воротом.",
        sizes: ["S", "M", "L"]
    }
];

// Provide helper to get product by id globally
window.getProductById = (id) => {
    return products.find(p => p.id === id);
};
