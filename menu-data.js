// Initial Menu Data for Seeding
window.MUZOM_MENU_DATA = {
  categories: [
    { id: 'cat_1', name: 'Espresso', nameEn: 'Espresso', order: 1 },
    { id: 'cat_2', name: 'Filtre Kahve', nameEn: 'Filter Coffee', order: 2 },
    { id: 'cat_3', name: 'Soğuk İçecek', nameEn: 'Cold Drinks', order: 3 },
    { id: 'cat_4', name: 'Tatlı', nameEn: 'Desserts', order: 4 }
  ],
  products: [
    {
      id: 'prod_1',
      categoryId: 'cat_1',
      name: 'Signature Blend',
      nameEn: 'Signature Blend',
      description: 'Karamel ve çikolata notaları ile yoğun ve gövdeli bir espresso deneyimi.',
      descriptionEn: 'Intense and full-bodied espresso with notes of caramel and chocolate.',
      price: 240,
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800',
      calories: 5,
      active: true,
      order: 1
    },
    {
      id: 'prod_2',
      categoryId: 'cat_2',
      name: 'Colombia Supremo',
      nameEn: 'Colombia Supremo',
      description: 'Hafif asidite, narenciye ve fındık notaları. Dengeli bir içim sunar.',
      descriptionEn: 'Light acidity, citrus and hazelnut notes. Offers a balanced drink.',
      price: 280,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
      calories: 5,
      active: true,
      order: 1
    },
    {
      id: 'prod_3',
      categoryId: 'cat_3',
      name: 'Iced Matcha Latte',
      nameEn: 'Iced Matcha Latte',
      description: 'Orijinal Japon matcha tozu ve taze süt ile hazırlanan ferahlatıcı lezzet.',
      descriptionEn: 'Refreshing taste prepared with original Japanese matcha powder and fresh milk.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
      calories: 180,
      active: true,
      order: 1
    },
    {
      id: 'prod_4',
      categoryId: 'cat_4',
      name: 'San Sebastian',
      nameEn: 'San Sebastian',
      description: 'İçi akışkan, üzeri karamelize edilmiş nefis peynir tatlısı.',
      descriptionEn: 'Delicious cheese dessert with a fluid center and caramelized top.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
      calories: 420,
      active: true,
      order: 1
    }
  ]
};
