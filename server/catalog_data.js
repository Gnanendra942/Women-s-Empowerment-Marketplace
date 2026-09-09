// ============================================================================
// WOMEN'S EMPOWERMENT MARKETPLACE - ENTERPRISE CRAFT CATALOG DATA ENGINE
// 1,120 Handcrafted Masterpieces across 8 Departments & 36 Subcategories
// ============================================================================

const crypto = require('crypto');

function generateHash(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

const DEPARTMENTS = [
  {
    name: 'Handlooms & Sarees',
    targetCount: 250,
    subcategories: [
      { name: 'Banarasi Brocade', craft: 'Handloom Brocade', state: 'Uttar Pradesh', village: 'Varanasi', collective: 'Dhaga Kala Weavers Guild', artisan: 'Ananya Devi', basePrice: 1499, imgKey: 'silk' },
      { name: 'Kanjeevaram Silk', craft: 'Pure Zari Silk Weaving', state: 'Tamil Nadu', village: 'Kanchipuram', collective: 'Kanchi Thari Sisterhood', artisan: 'Revathi Ammal', basePrice: 2499, imgKey: 'silk' },
      { name: 'Chanderi & Maheshwari', craft: 'Chanderi Tissue Weave', state: 'Madhya Pradesh', village: 'Chanderi', collective: 'Pranpur Handloom Society', artisan: 'Sunita Chouhan', basePrice: 899, imgKey: 'textile' },
      { name: 'Tussar & Muga Silk', craft: 'Wild Tussar Reeling', state: 'Jharkhand', village: 'Bhagalpur', collective: 'Resham Silk Sahayog', artisan: 'Kamala Soren', basePrice: 1299, imgKey: 'silk' },
      { name: 'Bandhani & Patola', craft: 'Tie & Dye Hand Knotting', state: 'Gujarat', village: 'Bhuj, Kutch', collective: 'Kutch Bandhani Sangam', artisan: 'Zarina Khatun', basePrice: 799, imgKey: 'textile' },
      { name: 'Desi Khadi & Kurtas', craft: 'Charkha Solar Khadi', state: 'Maharashtra', village: 'Wardha', collective: 'Gram Seva Women’s Trust', artisan: 'Meera Joshi', basePrice: 499, imgKey: 'khadi' },
      { name: 'Kalamkari & Block Prints', craft: 'Natural Vegetable Pen Art', state: 'Andhra Pradesh', village: 'Srikalahasti', collective: 'Kalamkari Kalakshetra', artisan: 'Lakshmi Varma', basePrice: 599, imgKey: 'print' },
      { name: 'Pashmina & Wool Shawls', craft: 'Sozni Needle Embroidery', state: 'Jammu & Kashmir', village: 'Srinagar', collective: 'Chinar Valley Pashmina Guild', artisan: 'Parveena Akhtar', basePrice: 1999, imgKey: 'pashmina' }
    ]
  },
  {
    name: 'Jewelry & Adornment',
    targetCount: 200,
    subcategories: [
      { name: 'Cuttack Tarakasi Silver (925)', craft: 'Tarakasi Micro-Filigree', state: 'Odisha', village: 'Cuttack Old Town', collective: 'Tarakasi Silver Guild', artisan: 'Sunita Das', basePrice: 799, imgKey: 'jewelry' },
      { name: 'Temple Jewelry & Chokers', craft: 'Vadasery Temple Metalcraft', state: 'Tamil Nadu', village: 'Nagercoil', collective: 'Vadasery Goldsmith Sisters', artisan: 'Meenakshi Iyer', basePrice: 999, imgKey: 'gold_jewelry' },
      { name: 'Kundan & Meenakari', craft: 'Enamel Glass Cloisonné', state: 'Rajasthan', village: 'Jaipur Walled City', collective: 'Rani Meena Artisan Trust', artisan: 'Kalyani Sharma', basePrice: 849, imgKey: 'jewelry' },
      { name: 'Dokra Tribal Brass', craft: 'Lost-Wax Bell Metal Casting', state: 'Chhattisgarh', village: 'Bastar Hamlet', collective: 'Bastar Tribal Matriarchs', artisan: 'Raimati Ghadwa', basePrice: 449, imgKey: 'brass' },
      { name: 'Terracotta & Ceramic Beads', craft: 'Fired Earthen Clay Jewelry', state: 'West Bengal', village: 'Bankura', collective: 'Mitti Rupa Craft Ring', artisan: 'Bimla Mondal', basePrice: 249, imgKey: 'terracotta' },
      { name: 'Lac & Glass Bangles', craft: 'Natural Tree Resin Shaping', state: 'Bihar', village: 'Muzaffarpur', collective: 'Laakh Karigar Union', artisan: 'Shobha Devi', basePrice: 199, imgKey: 'jewelry' },
      { name: 'Anklets & Silver Payals', craft: 'Chandi Chain Linking', state: 'Rajasthan', village: 'Jodhpur', collective: 'Marwar Silver Craft', artisan: 'Geeta Rathore', basePrice: 699, imgKey: 'jewelry' }
    ]
  },
  {
    name: 'Home & Living Decor',
    targetCount: 200,
    subcategories: [
      { name: 'Bankura Terracotta Urns', craft: 'Alluvial River Clay Wheel', state: 'West Bengal', village: 'Panchmura, Bankura', collective: 'Mitti Shilp Terracotta Guild', artisan: 'Radhika Pal', basePrice: 349, imgKey: 'pottery' },
      { name: 'Jaipur Blue Pottery', craft: 'Quartz Stone Paste Ceramics', state: 'Rajasthan', village: 'Sanganer, Jaipur', collective: 'Neelam Clay Society', artisan: 'Chanda Devi', basePrice: 429, imgKey: 'blue_pottery' },
      { name: 'Khurja Stoneware Planters', craft: 'High-Fire Mineral Glaze', state: 'Uttar Pradesh', village: 'Khurja Pottery Town', collective: 'Khurja Ceramic Guild', artisan: 'Fatima Begum', basePrice: 279, imgKey: 'pottery' },
      { name: 'Bidriware Silver Inlay', craft: 'Zinc-Copper Silver Etching', state: 'Karnataka', village: 'Bidar', collective: 'Bidri Shilpa Matruchhaya', artisan: 'Salma Sultana', basePrice: 649, imgKey: 'metal' },
      { name: 'Kashmiri Walnut Carvings', craft: 'Root Walnut Wood Chiseling', state: 'Jammu & Kashmir', village: 'Baramulla', collective: 'Chinar Woodcraft Circle', artisan: 'Nazia Jan', basePrice: 849, imgKey: 'wood' },
      { name: 'Channapatna Wooden Toys', craft: 'Non-Toxic Vegetable Lac Wood', state: 'Karnataka', village: 'Channapatna', collective: 'Gombe Wooden Toy Collective', artisan: 'Pushpa Gowda', basePrice: 229, imgKey: 'wood' },
      { name: 'Sabai & Bamboo Weaves', craft: 'Wild Sabai Grass Coiling', state: 'Odisha', village: 'Mayurbhanj Forest', collective: 'Sabai Shakti Mahila Samiti', artisan: 'Subhadra Majhi', basePrice: 319, imgKey: 'basket' }
    ]
  },
  {
    name: 'Ayurvedic & Forest Organics',
    targetCount: 150,
    subcategories: [
      { name: 'Wild Cliff Raw Honey', craft: 'Ethical Cliff Hive Foraging', state: 'Tamil Nadu', village: 'Nilgiris Highlands', collective: 'Nilgiri Indigenous Forest Foragers', artisan: 'Valli Murugan', basePrice: 179, imgKey: 'honey' },
      { name: 'Lakadong High-Curcumin Turmeric', craft: '7.8% Curcumin Sun Shading', state: 'Meghalaya', village: 'Jaintia Hills', collective: 'Hynniewtrep Farmers Union', artisan: 'Trinity Saioo', basePrice: 149, imgKey: 'spices' },
      { name: 'Pure Kashmiri Mogra Saffron', craft: 'Dawn Flower Stigma Plucking', state: 'Jammu & Kashmir', village: 'Pampore', collective: 'Zafran Valley Women Farmers', artisan: 'Farida Bano', basePrice: 499, imgKey: 'saffron' },
      { name: 'Kumkumadi & Herbal Serums', craft: 'Traditional Charaka Decoction', state: 'Kerala', village: 'Wayanad Herbs Hamlet', collective: 'Aranya Veda Shala', artisan: 'Devaki Amma', basePrice: 389, imgKey: 'serum' },
      { name: 'Cold-Pressed Wellness Oils', craft: 'Wooden Wood-Chekku Ghani', state: 'Tamil Nadu', village: 'Erode', collective: 'Marachekku Mahila Kootam', artisan: 'Maragatham Selvi', basePrice: 259, imgKey: 'oil' },
      { name: 'Himalayan Botanical Teas', craft: 'Hand-Rolled Wild Chamomile', state: 'Himachal Pradesh', village: 'Kangra Valley', collective: 'Kangra Valley Tea Harvesters', artisan: 'Kanta Devi', basePrice: 169, imgKey: 'tea' }
    ]
  },
  {
    name: 'Traditional Fine Art',
    targetCount: 80,
    subcategories: [
      { name: 'Madhubani Canvas Folk Art', craft: 'Bamboo Nib & Natural Pigment', state: 'Bihar', village: 'Ranti, Madhubani', collective: 'Mithila Chitrakala Trust', artisan: 'Dulari Devi', basePrice: 699, imgKey: 'art' },
      { name: 'Odisha Pattachitra Scrolls', craft: 'Palm Leaf & Stone Pigment Etching', state: 'Odisha', village: 'Raghurajpur Heritage Village', collective: 'Chitrakar Kulam', artisan: 'Pratima Maharana', basePrice: 849, imgKey: 'art' },
      { name: 'Warli Tribal Murals', craft: 'Rice Paste Cow-Dung Mud Ground', state: 'Maharashtra', village: 'Dahanu tribal belt', collective: 'Sahyadri Warli Women', artisan: 'Jivya Bhill', basePrice: 499, imgKey: 'art' },
      { name: 'Gond Heritage Canvases', craft: 'Dotted Sacred Forest Imagery', state: 'Madhya Pradesh', village: 'Patangarh', collective: 'Pardhan Gond Kala Samiti', artisan: 'Nankusia Shyam', basePrice: 749, imgKey: 'art' },
      { name: 'Pichwai Temple Paintings', craft: '24K Gold Leaf Stone Dust Tempera', state: 'Rajasthan', village: 'Nathdwara', collective: 'Shrinathji Kala Mandali', artisan: 'Manju Sharma', basePrice: 1199, imgKey: 'art' }
    ]
  },
  {
    name: 'Pottery & Kitchenware',
    targetCount: 100,
    subcategories: [
      { name: 'Longpi Black Stone Cookware', craft: 'Serpentine Stone & Clay Polish', state: 'Manipur', village: 'Longpi, Ukhrul', collective: 'Tangkhul Matriarch Guild', artisan: 'Wonnganing Shimray', basePrice: 499, imgKey: 'black_pottery' },
      { name: 'Unglazed Curd & Handi Pots', craft: 'Porous Alluvial Heat Retention', state: 'West Bengal', village: 'Kolkata outskirts', collective: 'Gramin Mitti Vikas', artisan: 'Shanti Pal', basePrice: 199, imgKey: 'pottery' },
      { name: 'Clay Water Dispensers', craft: 'Terracotta Natural Cooling', state: 'Gujarat', village: 'Morbi Hamlets', collective: 'Saurashtra Potters Union', artisan: 'Hansaben Prajapati', basePrice: 389, imgKey: 'pottery' },
      { name: 'Bell-Metal & Brass Thalis', craft: 'Traditional Hammered Kansa 78:22', state: 'Assam', village: 'Sarthebari', collective: 'Kanh Shilpa Mahila Sangha', artisan: 'Dipali Das', basePrice: 899, imgKey: 'brass' },
      { name: 'Carved Neem & Teak Woodware', craft: 'Anti-Bacterial Neem Wood Turning', state: 'Uttar Pradesh', village: 'Saharanpur', collective: 'Shilpkar Rasoi Mandal', artisan: 'Zubaida Begum', basePrice: 249, imgKey: 'wood' }
    ]
  },
  {
    name: 'Bags, Footwear & Accessories',
    targetCount: 80,
    subcategories: [
      { name: 'Shantiniketan Embossed Bags', craft: 'Vegetable Tanned Leather Batik', state: 'West Bengal', village: 'Bolpur, Shantiniketan', collective: 'Amar Kutir Craft Cooperative', artisan: 'Suparna Roy', basePrice: 599, imgKey: 'bag' },
      { name: 'Banjara Mirrorwork Clutches', craft: 'Nomadic Cowrie & Mirror Needlework', state: 'Telangana', village: 'Lambada Thanda', collective: 'Banjara Virasat Trust', artisan: 'Lachmi Bai', basePrice: 349, imgKey: 'embroidery' },
      { name: 'Eco Jute & Sabai Totes', craft: 'Golden Fiber Braided Weaving', state: 'West Bengal', village: 'Murshidabad', collective: 'Pat Shilp Mahila Samiti', artisan: 'Kalyani Ghosh', basePrice: 229, imgKey: 'jute' },
      { name: 'Handmade Mojaris & Kolhapuris', craft: 'Zero-Chemical Bagaru Leather', state: 'Maharashtra', village: 'Kolhapur', collective: 'Chhatrapati Leather Karigar', artisan: 'Mangal Kamble', basePrice: 499, imgKey: 'footwear' }
    ]
  },
  {
    name: 'Festive & Spiritual Crafts',
    targetCount: 60,
    subcategories: [
      { name: 'Akhand Brass Temple Diyas', craft: 'Heavy Sand-Casting Brass', state: 'Tamil Nadu', village: 'Nachiyar Koil', collective: 'Nachiyar Brass Artisans', artisan: 'Ponnammal R.', basePrice: 399, imgKey: 'brass' },
      { name: 'Organic Cow Dung Sambrani Cups', craft: 'Desi Cow Panchagavya Cup Molding', state: 'Rajasthan', village: 'Vrindavan Fringe', collective: 'Gau Seva Mahila Kendra', artisan: 'Mohini Dasi', basePrice: 129, imgKey: 'spiritual' },
      { name: 'Temple Bells & Pooja Chowkis', craft: 'Carved Teakwood Sacred Geometry', state: 'Kerala', village: 'Aranmula', collective: 'Vastu Shilpa Fellowship', artisan: 'Gomathi Amma', basePrice: 549, imgKey: 'wood' },
      { name: 'Handcrafted Agarbatti & Dhoop', craft: 'Charcoal-Free Temple Flower Waste', state: 'Uttar Pradesh', village: 'Kanpur Ghats', collective: 'Pushp Arpan Self-Help Group', artisan: 'Aarti Shukla', basePrice: 99, imgKey: 'incense' }
    ]
  }
];

// Curated Craft Images (Reliable Unsplash CDN Craft Photos)
const IMAGE_POOLS = {
  silk: [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80'
  ],
  textile: [
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80'
  ],
  khadi: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80'
  ],
  print: [
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'
  ],
  pashmina: [
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'
  ],
  jewelry: [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'
  ],
  gold_jewelry: [
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'
  ],
  brass: [
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80'
  ],
  terracotta: [
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80'
  ],
  pottery: [
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80',
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80'
  ],
  blue_pottery: [
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80'
  ],
  metal: [
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80'
  ],
  wood: [
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80'
  ],
  basket: [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80'
  ],
  honey: [
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  spices: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'
  ],
  saffron: [
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  serum: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'
  ],
  oil: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  tea: [
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'
  ],
  art: [
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&q=80',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&q=80'
  ],
  black_pottery: [
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80',
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80'
  ],
  bag: [
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80'
  ],
  embroidery: [
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&q=80'
  ],
  jute: [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80'
  ],
  footwear: [
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80'
  ],
  spiritual: [
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80'
  ],
  incense: [
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'
  ]
};

// Title modifiers for natural variety
const ADJECTIVES = ['Authentic', 'Handcrafted', 'Heirloom', 'Heritage', 'Artisanal', 'Traditional', 'Pure', 'Organic', 'Hand-Spun', 'Intricate', 'Natural', 'Sacred', 'Vintage', 'Custom', 'Masterpiece'];
const MOTIFS = ['Peacock', 'Lotus Flora', 'Temple Arch', 'River Wave', 'Sun & Moon', 'Tree of Life', 'Paisley Butta', 'Forest Floral', 'Geometric Ochre', 'Sacred Mandala', 'Royal Durbar', 'Chinar Leaf'];
const BADGES = ['💮 GI Tag Certified', '💎 925 Hallmarked', '🌿 100% Desi Khadi', '🏺 Alluvial River Clay', '🍯 Wild Harvest', '🪵 Aged Root Carved', '✨ Bestseller', '⚡ Deal of the Day', '👑 Masterpiece Edition'];

function generateCatalog() {
  const products = [];
  let currentId = 1;

  for (const dept of DEPARTMENTS) {
    const subsCount = dept.subcategories.length;
    const perSub = Math.ceil(dept.targetCount / subsCount);

    for (let sIdx = 0; sIdx < subsCount; sIdx++) {
      const sub = dept.subcategories[sIdx];
      const countForThisSub = (sIdx === subsCount - 1) 
        ? (dept.targetCount - (perSub * (subsCount - 1))) 
        : perSub;

      for (let i = 0; i < countForThisSub; i++) {
        const adj = ADJECTIVES[(currentId + i * 3) % ADJECTIVES.length];
        const motif = MOTIFS[(currentId + i * 2) % MOTIFS.length];
        const badge = BADGES[(currentId + i) % BADGES.length];

        // Realistic Pricing (in INR)
        const priceVariation = Math.round(((i * 37) % 400) - 150);
        const price = Math.max(99, Math.round((sub.basePrice + priceVariation) / 10) * 10 - 1);
        const discountRate = 35 + ((currentId * 7) % 25); // 35% to 59% off
        const mrp = Math.round((price / (1 - (discountRate / 100))) / 10) * 10 - 1;
        
        // Rating & Reviews
        const rating = Number((4.6 + ((currentId % 5) * 0.08)).toFixed(1));
        const reviewsCount = 45 + ((currentId * 73) % 2900);
        const stock = 4 + ((currentId * 11) % 35);
        const leadTime = (currentId % 3 === 0) ? 'Dispatched in 48 hrs' : 'Dispatched in 24 hrs';

        const pool = IMAGE_POOLS[sub.imgKey] || IMAGE_POOLS.silk;
        const mainImage = pool[i % pool.length];
        const thumbnails = [
          mainImage,
          pool[(i + 1) % pool.length],
          pool[(i + 2) % pool.length]
        ];

        // Craft Story & Materials
        const story = `Handcrafted with meticulous dedication by ${sub.artisan} in ${sub.village}, ${sub.state}. Hand-shaped over ${12 + (currentId % 90)} continuous artisan hours through ancient ${sub.craft} techniques preserved across unbroken generations. 86% of your purchase directly funds female livelihood security and apprentice craft training.`;
        const materials = `100% Authentic ${sub.name.split(' ')[0]} Materials, Naturally Foraged Pigments, Cruelty-Free Zero-Electricity Traditional Processing`;
        const provenanceHash = generateHash(`wem-artisan-${currentId}-${sub.artisan}-${sub.village}-${price}`);

        // Title crafting
        let title = '';
        if (dept.name === 'Handlooms & Sarees') {
          title = `${adj} ${sub.name} with Hand-Woven ${motif} Work`;
        } else if (dept.name === 'Jewelry & Adornment') {
          title = `${adj} ${sub.name} ${motif} Design`;
        } else if (dept.name === 'Home & Living Decor') {
          title = `${adj} ${sub.name} featuring ${motif} Sculpting`;
        } else if (dept.name === 'Ayurvedic & Forest Organics') {
          title = `${adj} ${sub.name} (${motif} Infusion)`;
        } else if (dept.name === 'Traditional Fine Art') {
          title = `${adj} ${sub.name} - The Sacred ${motif}`;
        } else if (dept.name === 'Pottery & Kitchenware') {
          title = `${adj} ${sub.name} with ${motif} Finish`;
        } else if (dept.name === 'Bags, Footwear & Accessories') {
          title = `${adj} ${sub.name} (${motif} Embroidery)`;
        } else {
          title = `${adj} ${sub.name} with ${motif} Etchings`;
        }

        // Add index if collision
        if (i > 0) {
          title += ` - Edition #${100 + i}`;
        }

        products.push({
          id: currentId,
          title,
          price,
          mrp,
          deal_discount: `${discountRate}% off`,
          deal: true,
          category: dept.name,
          subcategory: sub.name,
          craft_type: sub.craft,
          artisan_name: sub.artisan,
          village: `${sub.village}, ${sub.state}`,
          state: sub.state,
          collective: sub.collective,
          stock,
          rating,
          reviews_count: reviewsCount,
          badge,
          lead_time: leadTime,
          image: mainImage,
          thumbnails,
          story,
          materials,
          provenance_hash: provenanceHash
        });

        currentId++;
      }
    }
  }

  return products;
}

const CATALOG = generateCatalog();

module.exports = {
  DEPARTMENTS,
  CATALOG,
  generateCatalog
};
