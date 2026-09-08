const express = require('express');
const router = express.Router();
const { runQuery, allQuery, getQuery } = require('../db');

// Get all upcoming artisan masterclasses
router.get('/', async (req, res) => {
  try {
    const workshops = await allQuery('SELECT * FROM workshops ORDER BY id ASC');
    res.json(workshops);
  } catch (err) {
    console.error('Fetch workshops error:', err);
    res.status(500).json({ error: 'Failed to fetch workshops.' });
  }
});

// Book a workshop seat
router.post('/:id/book', async (req, res) => {
  try {
    const workshopId = req.params.id;
    const { patron_name, patron_email, kit_address } = req.body;

    if (!patron_name || !patron_email) {
      return res.status(400).json({ error: 'Name and email are required to reserve a seat.' });
    }

    const workshop = await getQuery('SELECT * FROM workshops WHERE id = ?', [workshopId]);
    if (!workshop) {
      return res.status(404).json({ error: 'Masterclass not found.' });
    }

    if (workshop.seats_available <= 0) {
      return res.status(400).json({ error: 'This masterclass is currently fully booked.' });
    }

    const bookingCode = 'PASS-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Insert booking
    await runQuery(`
      INSERT INTO workshop_bookings (booking_code, workshop_id, patron_name, patron_email, kit_address, amount_paid)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [bookingCode, workshopId, patron_name, patron_email, kit_address || 'Digital Access Only', workshop.price]);

    // Decrement available seats
    await runQuery(`
      UPDATE workshops
      SET seats_available = seats_available - 1
      WHERE id = ?
    `, [workshopId]);

    const updatedWorkshop = await getQuery('SELECT * FROM workshops WHERE id = ?', [workshopId]);

    res.status(201).json({
      message: 'Seat successfully reserved!',
      booking: {
        booking_code: bookingCode,
        workshop_title: workshop.title,
        artisan_name: workshop.artisan_name,
        date_time: workshop.date_time,
        patron_name,
        patron_email,
        kit_address: kit_address || 'Digital Only',
        amount_paid: workshop.price
      },
      workshop: updatedWorkshop
    });
  } catch (err) {
    console.error('Workshop booking error:', err);
    res.status(500).json({ error: 'Failed to complete workshop booking.' });
  }
});

module.exports = router;
