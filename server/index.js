import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

// Ensure directories exist
const uploadsDir = join(__dirname, '..', 'public', 'uploads');
const dataDir = join(__dirname, 'data');

if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Initialize data files if they don't exist
const testimonialsFile = join(dataDir, 'testimonials.json');
const projectsFile = join(dataDir, 'projects.json');

if (!existsSync(testimonialsFile)) {
  writeFileSync(testimonialsFile, '[]');
}
if (!existsSync(projectsFile)) {
  writeFileSync(projectsFile, '[]');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${randomUUID()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  },
});

// Helper functions
function readTestimonials() {
  const data = readFileSync(testimonialsFile, 'utf-8');
  return JSON.parse(data);
}

function writeTestimonials(data) {
  writeFileSync(testimonialsFile, JSON.stringify(data, null, 2));
}

// Routes

// GET /api/testimonials - Fetch testimonials with optional approved filter
app.get('/api/testimonials', (req, res) => {
  try {
    const testimonials = readTestimonials();
    const { approved } = req.query;

    if (approved === 'true') {
      return res.json(testimonials.filter((t) => t.approved === true));
    } else if (approved === 'false') {
      return res.json(testimonials.filter((t) => t.approved === false));
    }

    res.json(testimonials);
  } catch (error) {
    console.error('Error reading testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// POST /api/testimonials - Create new testimonial with video upload
app.post('/api/testimonials', upload.single('video'), (req, res) => {
  try {
    const { name, title, company, quote } = req.body;

    if (!name || !quote) {
      return res.status(400).json({ error: 'Name and quote are required' });
    }

    const testimonials = readTestimonials();

    const newTestimonial = {
      id: randomUUID(),
      name,
      title: title || '',
      company: company || '',
      quote,
      videoUrl: req.file ? `/uploads/${req.file.filename}` : null,
      approved: false,
      createdAt: new Date().toISOString(),
    };

    testimonials.push(newTestimonial);
    writeTestimonials(testimonials);

    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// PATCH /api/testimonials/:id - Update testimonial (for approval)
app.patch('/api/testimonials/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    const testimonials = readTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    if (typeof approved === 'boolean') {
      testimonials[index].approved = approved;
    }

    writeTestimonials(testimonials);
    res.json(testimonials[index]);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// DELETE /api/testimonials/:id - Delete testimonial
app.delete('/api/testimonials/:id', (req, res) => {
  try {
    const { id } = req.params;
    const testimonials = readTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    testimonials.splice(index, 1);
    writeTestimonials(testimonials);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// Error handling for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File is too large. Maximum size is 100MB.' });
    }
    return res.status(400).json({ error: error.message });
  }
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
