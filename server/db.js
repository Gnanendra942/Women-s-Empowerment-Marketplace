const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'marketplace.db');
const db = new sqlite3.Database(dbPath);

// Helper to run queries with Promises
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

async function initDB() {
  // Create tables
  await runQuery(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'customer',
      location TEXT,
      bio TEXT,
      avatar TEXT,
      artisan_collective TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      story TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      craft_type TEXT NOT NULL,
      artisan_id INTEGER,
      artisan_name TEXT NOT NULL,
      artisan_village TEXT NOT NULL,
      stock INTEGER DEFAULT 10,
      rating REAL DEFAULT 5.0,
      reviews_count INTEGER DEFAULT 1,
      image_url TEXT NOT NULL,
      impact_tag TEXT NOT NULL,
      lead_time_days INTEGER DEFAULT 3,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (artisan_id) REFERENCES users(id)
    )
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      user_id INTEGER,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      city TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'Pending',
      payment_method TEXT DEFAULT 'Card (Simulated)',
      tracking_code TEXT NOT NULL,
      artisan_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_title TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      image_url TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      author TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      verified_buyer BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS workshops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artisan_name TEXT NOT NULL,
      village TEXT NOT NULL,
      craft_type TEXT NOT NULL,
      duration TEXT NOT NULL,
      date_time TEXT NOT NULL,
      price REAL NOT NULL,
      seats_total INTEGER DEFAULT 25,
      seats_available INTEGER DEFAULT 25,
      image_url TEXT NOT NULL,
      description TEXT NOT NULL,
      kit_included TEXT NOT NULL,
      difficulty TEXT DEFAULT 'All Skill Levels',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS workshop_bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_code TEXT UNIQUE NOT NULL,
      workshop_id INTEGER NOT NULL,
      patron_name TEXT NOT NULL,
      patron_email TEXT NOT NULL,
      kit_address TEXT,
      amount_paid REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (workshop_id) REFERENCES workshops(id)
    )
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artisan_id INTEGER NOT NULL,
      artisan_name TEXT NOT NULL,
      sender_name TEXT NOT NULL,
      sender_email TEXT NOT NULL,
      inquiry_type TEXT DEFAULT 'Custom Craft Inquiry',
      message TEXT NOT NULL,
      reply TEXT,
      replied_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed workshops if empty
  const workshopCount = await getQuery('SELECT COUNT(*) as count FROM workshops');
  if (workshopCount.count === 0) {
    const sampleWorkshops = [
      {
        title: 'Masterclass: Heirloom Banarasi Jacquard Weaving & Zari Motifs',
        artisan_name: 'Ananya Devi',
        village: 'Varanasi Weavers Cluster, UP',
        craft_type: 'Handloom Textiles',
        duration: '2.5 Hours (Live Interactive)',
        date_time: 'Next Saturday, 4:00 PM IST',
        price: 35.00,
        seats_total: 25,
        seats_available: 7,
        image_url: '/images/pashmina.jpg',
        description: 'Step inside Ananya Devi’s heritage loom shed in Varanasi. Learn warp tensioning, metallic zari thread integration, and the sacred geometry behind centuries-old floral booti motifs.',
        kit_included: 'Handloom Sample Shuttle, Organic Mulberry Silk Skeins, Hand-Drawn Weaving Grid Chart.',
        difficulty: 'Beginner to Intermediate'
      },
      {
        title: 'Terracotta Wheel Throwing, Pinch Pots & Mineral Washing',
        artisan_name: 'Meera Sen',
        village: 'Bankura Pottery Hamlet, West Bengal',
        craft_type: 'Terracotta Ceramics',
        duration: '2 Hours (Live Studio Session)',
        date_time: 'Next Sunday, 11:00 AM IST',
        price: 28.00,
        seats_total: 20,
        seats_available: 4,
        image_url: '/images/pottery.jpg',
        description: 'Experience riverbed alluvial clay sculpting without electric power. Meera demonstrates traditional centering, rib shaping, and carving tribal ochre motifs before sun curing.',
        kit_included: '1kg Purified Alluvial Clay Slab, Bamboo Sculpting Ribs, Red Ochre Mineral Wash Powder.',
        difficulty: 'All Skill Levels'
      },
      {
        title: 'Ancient Tarakasi: Silver Filigree Wire Twisting & Micro-Soldering',
        artisan_name: 'Fatima Begum',
        village: 'Cuttack Old Town, Odisha',
        craft_type: 'Silver Jewelry',
        duration: '3 Hours (Live Workshop)',
        date_time: 'Oct 14, 5:00 PM IST',
        price: 45.00,
        seats_total: 15,
        seats_available: 3,
        image_url: '/images/jewelry.jpg',
        description: 'Explore the 400-year-old art of drawing 925 sterling silver into hair-thin gossamer wires. Fatima guides you through twisting, framing, and annealing delicate petal motifs.',
        kit_included: 'Fine Sterling Silver Wire Spool (925), Precision Tweezers, Jewelry Mandrel, Polishing Cloth.',
        difficulty: 'Intermediate'
      },
      {
        title: 'Ayurvedic Botanical Herbal Distillation & Elixir Blending',
        artisan_name: 'Ananya Devi & Forest Collective',
        village: 'Kashmir Valley & Varanasi Guild',
        craft_type: 'Organic Wellness',
        duration: '1.5 Hours (Live Workshop)',
        date_time: 'Oct 21, 6:30 PM IST',
        price: 30.00,
        seats_total: 30,
        seats_available: 12,
        image_url: '/images/wellness.jpg',
        description: 'Master cold-pressed Kashmiri saffron extraction and nocturnal jasmine maceration according to Charaka Samhita guidelines for restorative night oils.',
        kit_included: 'Grade-A Saffron Strands Vial, Cold-Pressed Almond Carrier Base, Amber Dropper Bottle.',
        difficulty: 'All Skill Levels'
      }
    ];

    for (const w of sampleWorkshops) {
      await runQuery(`
        INSERT INTO workshops (title, artisan_name, village, craft_type, duration, date_time, price, seats_total, seats_available, image_url, description, kit_included, difficulty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [w.title, w.artisan_name, w.village, w.craft_type, w.duration, w.date_time, w.price, w.seats_total, w.seats_available, w.image_url, w.description, w.kit_included, w.difficulty]);
    }
  }

  // Seed initial messages if empty
  const msgCount = await getQuery('SELECT COUNT(*) as count FROM messages');
  if (msgCount.count === 0) {
    await runQuery(`
      INSERT INTO messages (artisan_id, artisan_name, sender_name, sender_email, inquiry_type, message, reply, replied_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [
      1,
      'Ananya Devi',
      'Priya Sharma',
      'buyer@market.org',
      'Custom Pashmina Dimensions',
      'Namaste Ananya ji, could you craft a custom 2.5-meter stole in royal crimson with the same lotus embroidery pattern?',
      'Namaste Priya ji! Yes, we can customize the length on our 4-pedal wooden loom. We will dye the cashmere yarn with natural madder root. The lead time will be 7 days.'
    ]);
  }


  // Seed users if empty
  const userCount = await getQuery('SELECT COUNT(*) as count FROM users');
  if (userCount.count === 0) {
    const salt = await bcrypt.genSalt(10);
    const artisanHash = await bcrypt.hash('artisan123', salt);
    const buyerHash = await bcrypt.hash('buyer123', salt);

    // Artisan 1
    const res1 = await runQuery(`
      INSERT INTO users (name, email, password_hash, role, location, bio, avatar, artisan_collective)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Ananya Devi',
      'ananya@artisan.org',
      artisanHash,
      'artisan',
      'Varanasi, Uttar Pradesh',
      'Master textile artisan leading a collective of 24 women weavers dedicated to preserving heirloom handloom traditions.',
      '/images/ananya_artisan.jpg',
      'Dhaga Kala Women Collective'
    ]);
    const artisanId1 = res1.lastID;

    // Artisan 2
    const res2 = await runQuery(`
      INSERT INTO users (name, email, password_hash, role, location, bio, avatar, artisan_collective)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Meera Sen',
      'meera@artisan.org',
      artisanHash,
      'artisan',
      'Bankura, West Bengal',
      'Second-generation terracotta sculptor crafting studio ceramics with river clay and natural mineral washes.',
      '/images/ananya_artisan.jpg',
      'Mitti Roots Rural Guild'
    ]);
    const artisanId2 = res2.lastID;

    // Artisan 3
    const res3 = await runQuery(`
      INSERT INTO users (name, email, password_hash, role, location, bio, avatar, artisan_collective)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Fatima Begum',
      'fatima@artisan.org',
      artisanHash,
      'artisan',
      'Cuttack, Odisha',
      'Expert silver filigree craftsman creating wearable poetry with silver wire techniques passed down over 400 years.',
      '/images/ananya_artisan.jpg',
      'Chandi Karigar Fellowship'
    ]);
    const artisanId3 = res3.lastID;

    // Customer
    await runQuery(`
      INSERT INTO users (name, email, password_hash, role, location, bio, avatar, artisan_collective)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Priya Sharma',
      'buyer@market.org',
      buyerHash,
      'customer',
      'Bengaluru, Karnataka',
      'Art collector and patron of sustainable artisan cooperatives.',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      null
    ]);

    // Seed Products
    await runQuery(`
      INSERT INTO products (title, description, story, price, category, craft_type, artisan_id, artisan_name, artisan_village, stock, rating, reviews_count, image_url, impact_tag, lead_time_days)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Imperial Hand-Embroidered Pashmina Shawl',
      'Pure Grade-A Himalayan cashmere handwoven on traditional wooden looms and detailed with delicate needle embroidery.',
      'Crafted over 140 hours in our village workshop. Every stitch honors century-old Kashmiri needlecraft, providing sustainable income to 4 female heads of households.',
      185.00,
      'Textiles & Apparel',
      'Handloom Weaving',
      artisanId1,
      'Ananya Devi',
      'Varanasi Crafts Cluster',
      14,
      4.9,
      38,
      '/images/pashmina.jpg',
      '140 Hours Artisan Labor · 100% Cashmere',
      4
    ]);

    await runQuery(`
      INSERT INTO products (title, description, story, price, category, craft_type, artisan_id, artisan_name, artisan_village, stock, rating, reviews_count, image_url, impact_tag, lead_time_days)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Hand-Thrown Terracotta Geometric Amphora',
      'Sculpted from alluvial riverbed clay, sun-cured and kilned with natural wood fire. Finished with subtle hand-etched tribal patterns.',
      'Meera creates each vessel by hand without electric machinery. Sale proceeds fund clean drinking water filters for the local pottery settlement.',
      68.00,
      'Home & Decor',
      'Terracotta Ceramics',
      artisanId2,
      'Meera Sen',
      'Bankura Pottery Hamlet',
      19,
      4.8,
      24,
      '/images/pottery.jpg',
      'Clean Water Initiative Funded · Non-Toxic Glaze',
      3
    ]);

    await runQuery(`
      INSERT INTO products (title, description, story, price, category, craft_type, artisan_id, artisan_name, artisan_village, stock, rating, reviews_count, image_url, impact_tag, lead_time_days)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Sterling Silver Filigree & Amber Drop Earrings',
      'Gossamer thin 925 silver wires hand-twisted and framed with natural baltic amber and turquoise gemstones.',
      'Fatima leads an all-women jewelry workshop in Cuttack. Each pair takes 16 hours of microscopic wire shaping, keeping an ancient craft alive.',
      94.00,
      'Jewelry & Adornment',
      'Silver Filigree (Tarakasi)',
      artisanId3,
      'Fatima Begum',
      'Cuttack Old Town',
      8,
      5.0,
      42,
      '/images/jewelry.jpg',
      'Preserving 400-Yr Heritage · Certified 925 Silver',
      2
    ]);

    await runQuery(`
      INSERT INTO products (title, description, story, price, category, craft_type, artisan_id, artisan_name, artisan_village, stock, rating, reviews_count, image_url, impact_tag, lead_time_days)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Wild Saffron & Jasmine Ayurvedic Night Elixir',
      'Small-batch cold-pressed botanical facial nectar infused with wild Kashmiri saffron stigmas, sweet jasmine, and revitalizing herbs.',
      'Crafted by a women self-help agricultural group that ethically forages flowers in the Himalayan foothills at dawn to ensure maximum potency.',
      48.00,
      'Organic Wellness',
      'Ayurvedic Alchemy',
      artisanId1,
      'Ananya Devi',
      'Pahalgam Foraging Cooperative',
      35,
      4.9,
      56,
      '/images/wellness.jpg',
      'Cruelty-Free · Farm-to-Bottle Ethical Source',
      1
    ]);

    await runQuery(`
      INSERT INTO products (title, description, story, price, category, craft_type, artisan_id, artisan_name, artisan_village, stock, rating, reviews_count, image_url, impact_tag, lead_time_days)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Artisan Kantha Embroidered Quilted Silk Shawl',
      'Layered natural wild silk stitched with thousands of micro running stitches creating rippling texture and vivid folk motifs.',
      'Handcrafted through a collective empowerment program training young rural mothers in traditional Kantha stitchwork.',
      112.00,
      'Textiles & Apparel',
      'Kantha Needlework',
      artisanId1,
      'Ananya Devi',
      'Varanasi Crafts Cluster',
      11,
      4.7,
      19,
      '/images/pashmina.jpg',
      'Women Skill Development · Upcycled Vintage Silk',
      5
    ]);

    await runQuery(`
      INSERT INTO products (title, description, story, price, category, craft_type, artisan_id, artisan_name, artisan_village, stock, rating, reviews_count, image_url, impact_tag, lead_time_days)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Glazed Stoneware Clay Planter & Saucer',
      'High-fired earthen stoneware featuring minimalist tactile ridges and an organic matte terracotta finish.',
      'Designed by Meera Sen to celebrate mindful living and grounding green sanctuaries in urban homes.',
      42.00,
      'Home & Decor',
      'Terracotta Ceramics',
      artisanId2,
      'Meera Sen',
      'Bankura Pottery Hamlet',
      22,
      4.8,
      15,
      '/images/pottery.jpg',
      'Eco-Friendly Clay · Zero Waste Workshop',
      2
    ]);

    // Seed Sample Orders for the Distributed Order Pipeline
    const sampleOrders = [
      {
        num: 'ORD-88210',
        name: 'Aarav Mehta',
        email: 'aarav.m@example.com',
        address: '42 Lotus Boulevard, Apt 5B',
        city: 'Mumbai',
        pin: '400050',
        amount: 185.00,
        status: 'Artisan Crafting',
        track: 'WEM-TRK-77182',
        notes: 'Artisan Ananya is hand-weaving the fringe details today.',
        item: { pId: 1, title: 'Imperial Hand-Embroidered Pashmina Shawl', qty: 1, price: 185.00, img: '/images/pashmina.jpg' }
      },
      {
        num: 'ORD-88211',
        name: 'Sophia Reynolds',
        email: 'sophia@globalarts.org',
        address: '744 Market Street, Suite 900',
        city: 'San Francisco',
        pin: '94103',
        amount: 142.00,
        status: 'Quality Check',
        track: 'WEM-TRK-77183',
        notes: 'Passed fair-trade authenticity & durability verification test.',
        item: { pId: 3, title: 'Sterling Silver Filigree & Amber Drop Earrings', qty: 1, price: 94.00, img: '/images/jewelry.jpg' }
      },
      {
        num: 'ORD-88212',
        name: 'Dr. Kabir Roy',
        email: 'k.roy@healthclinic.in',
        address: '12 Park Street, Flat 3A',
        city: 'Kolkata',
        pin: '700016',
        amount: 96.00,
        status: 'Dispatched',
        track: 'WEM-TRK-77184',
        notes: 'Handed over to eco-logistics partner; tracking live.',
        item: { pId: 4, title: 'Wild Saffron & Jasmine Ayurvedic Night Elixir', qty: 2, price: 48.00, img: '/images/wellness.jpg' }
      },
      {
        num: 'ORD-88213',
        name: 'Elena Rostova',
        email: 'elena@vienna.at',
        address: 'Kärntner Ring 12',
        city: 'Vienna',
        pin: '1010',
        amount: 68.00,
        status: 'Delivered',
        track: 'WEM-TRK-77185',
        notes: 'Customer confirmed safe delivery of handcrafted terracotta piece.',
        item: { pId: 2, title: 'Hand-Thrown Terracotta Geometric Amphora', qty: 1, price: 68.00, img: '/images/pottery.jpg' }
      }
    ];

    for (const o of sampleOrders) {
      const oRes = await runQuery(`
        INSERT INTO orders (order_number, user_id, customer_name, customer_email, shipping_address, city, postal_code, total_amount, status, tracking_code, artisan_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [o.num, 4, o.name, o.email, o.address, o.city, o.pin, o.amount, o.status, o.track, o.notes]);

      await runQuery(`
        INSERT INTO order_items (order_id, product_id, product_title, quantity, unit_price, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [oRes.lastID, o.item.pId, o.item.title, o.item.qty, o.item.price, o.item.img]);
    }

    // Seed Reviews
    const sampleReviews = [
      { pId: 1, author: 'Sonalika K.', rating: 5, comment: 'The embroidery is breathtaking! You can feel the love and dedication poured into every fiber. Knowing this directly empowers rural women makes it priceless.' },
      { pId: 1, author: 'David L.', rating: 5, comment: 'Incredible texture and softness. Heirloom quality.' },
      { pId: 2, author: 'Tanya P.', rating: 5, comment: 'The rustic texture and tribal carvings add such warmth to my living room. Packaged very safely too.' },
      { pId: 3, author: 'Rohan G.', rating: 5, comment: 'Bought this as an anniversary gift. The filigree wire work is mind-blowing in real life.' },
      { pId: 4, author: 'Maya N.', rating: 5, comment: 'Divine aroma of pure saffron and night jasmine. My skin has never looked more radiant.' }
    ];

    for (const r of sampleReviews) {
      await runQuery(`
        INSERT INTO reviews (product_id, author, rating, comment)
        VALUES (?, ?, ?, ?)
      `, [r.pId, r.author, r.rating, r.comment]);
    }

    console.log('✅ SQLite Database successfully initialized and seeded with authentic artisan data.');
  }
}

module.exports = {
  db,
  runQuery,
  allQuery,
  getQuery,
  initDB
};
