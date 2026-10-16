
const express = require('express');
const { randomBytes } = require('crypto');

const router = express.Router();

// Temporary storage for testing
const links = new Map();

// Test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'LinkPulse links router is working!',
  });
});

// Create a short URL
router.post('/shorten', (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a URL.',
    });
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(originalUrl);
  } catch {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid URL.',
    });
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return res.status(400).json({
      success: false,
      message: 'Only HTTP and HTTPS URLs are allowed.',
    });
  }

  const shortCode = randomBytes(4).toString('hex');

  
links.set(shortCode, {
  originalUrl: parsedUrl.href,
  clicks: 0,
});


  res.status(201).json({
    success: true,
    originalUrl: parsedUrl.href,
    shortCode,
    shortUrl: `http://localhost:5000/${shortCode}`,
  });
});


router.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  const link = links.get(shortCode);

  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Short URL not found.',
    });
  }

  link.clicks += 1;

  res.redirect(link.originalUrl);
});


router.get('/:shortCode/stats', (req, res) => {
  const { shortCode } = req.params;
  const link = links.get(shortCode);

  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Short URL not found.',
    });
  }

  res.json({
    success: true,
    shortCode,
    originalUrl: link.originalUrl,
    clicks: link.clicks,
  });
});


router.get('/', (req, res) => {
  const allLinks = Array.from(links.entries()).map(
    ([shortCode, link]) => ({
      shortCode,
      originalUrl: link.originalUrl,
      shortUrl: `http://localhost:5000/${shortCode}`,
      clicks: link.clicks,
    })
  );

  res.json({
    success: true,
    totalLinks: allLinks.length,
    links: allLinks,
  });
});


module.exports = router;
