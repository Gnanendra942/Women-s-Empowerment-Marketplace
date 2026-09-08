const express = require('express');
const router = express.Router();

let notifications = [
  {
    id: 1,
    title: 'Order Status Advanced',
    message: 'Consignment #ORD-88210 was moved to "Quality Check" stage.',
    time: '5 mins ago',
    type: 'pipeline',
    read: false
  },
  {
    id: 2,
    title: 'Fair-Trade Payout Reserved',
    message: '$159.10 direct disbursement allocated to Varanasi Handloom Guild escrow.',
    time: '22 mins ago',
    type: 'payout',
    read: false
  },
  {
    id: 3,
    title: 'New Patron Appreciation',
    message: 'Lakshmi Rao posted a 5-star review on Imperial Hand-Embroidered Pashmina Shawl.',
    time: '1 hour ago',
    type: 'review',
    read: false
  }
];

router.get('/', (req, res) => {
  res.json(notifications);
});

router.post('/mark-read', (req, res) => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  res.json({ message: 'All notifications marked as read.' });
});

router.post('/add', (req, res) => {
  const { title, message, type = 'info' } = req.body;
  const newNotif = {
    id: Date.now(),
    title,
    message,
    time: 'Just now',
    type,
    read: false
  };
  notifications.unshift(newNotif);
  res.status(201).json(newNotif);
});

module.exports = router;
