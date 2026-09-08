const express = require('express');
const router = express.Router();
const { runQuery, allQuery, getQuery } = require('../db');

// Get messages for an artisan
router.get('/:artisanId', async (req, res) => {
  try {
    const { artisanId } = req.params;
    const messages = await allQuery(
      'SELECT * FROM messages WHERE artisan_id = ? ORDER BY id DESC',
      [artisanId]
    );
    res.json(messages);
  } catch (err) {
    console.error('Fetch messages error:', err);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Post an inquiry or gratitude note to an artisan
router.post('/', async (req, res) => {
  try {
    const {
      artisan_id = 1,
      artisan_name = 'Ananya Devi',
      sender_name,
      sender_email,
      inquiry_type = 'Custom Craft Inquiry',
      message
    } = req.body;

    if (!sender_name || !sender_email || !message) {
      return res.status(400).json({ error: 'Name, email, and message content are required.' });
    }

    // Realistic replies based on artisan
    const authenticReplies = {
      1: "Namaste! Thank you for reaching out to the Dhaga Kala Collective in Varanasi. Ananya Devi and our master weavers have received your inquiry. We honor every bespoke craft request with traditional handloom care and will follow up with exact timeline and loom warp details!",
      2: "Namaste and warm greetings from Bankura Pottery Hamlet! Meera Sen has noted your note. All our riverbed clay pieces are hand-turned and kiln-cured with wood fire. Thank you for supporting clean rural craftsmanship.",
      3: "Greetings from the Chandi Karigar silver filigree workshop! Fatima Begum acknowledges your message. We take great pride in our 400-year-old wirecraft tradition and will gladly assist with your special custom adornment."
    };

    const replyText = authenticReplies[artisan_id] || "Thank you for reaching out to our women artisan collective. Your inquiry has been delivered directly to the workshop.";

    const result = await runQuery(`
      INSERT INTO messages (artisan_id, artisan_name, sender_name, sender_email, inquiry_type, message, reply, replied_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [
      artisan_id,
      artisan_name,
      sender_name,
      sender_email,
      inquiry_type,
      message,
      replyText
    ]);

    const created = await getQuery('SELECT * FROM messages WHERE id = ?', [result.lastID]);

    res.status(201).json({
      message: 'Inquiry successfully transmitted to artisan collective!',
      data: created
    });
  } catch (err) {
    console.error('Post message error:', err);
    res.status(500).json({ error: 'Failed to transmit message.' });
  }
});

module.exports = router;
