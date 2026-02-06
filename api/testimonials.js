import { list, put } from '@vercel/blob';
import { randomUUID } from 'crypto';

const ADMIN_SECRET = process.env.ADMIN_SECRET;
const PENDING_PREFIX = 'testimonials/pending/';
const APPROVED_PREFIX = 'testimonials/approved/';

function requireAdmin(req) {
  const secret = req.headers['x-admin-secret'];
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return false;
  }
  return true;
}

async function readTestimonialsFromPrefix(prefix) {
  const { blobs } = await list({ prefix, limit: 1000 });

  const items = await Promise.all(
    blobs.map(async (b) => {
      const res = await fetch(b.url, { cache: 'no-store' });
      if (!res.ok) return null;
      return res.json();
    }),
  );

  return items
    .filter(Boolean)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const approved = req.query.approved;

    // Public: approved testimonials only
    if (approved === 'true') {
      try {
        const testimonials = await readTestimonialsFromPrefix(APPROVED_PREFIX);
        return res.status(200).json(testimonials);
      } catch (error) {
        console.error('Error fetching approved testimonials:', error);
        return res.status(500).json({ error: 'Failed to fetch testimonials' });
      }
    }

    // Anything else is admin-only (pending or all)
    if (!requireAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      if (approved === 'false') {
        const testimonials = await readTestimonialsFromPrefix(PENDING_PREFIX);
        return res.status(200).json(testimonials);
      }

      const [pending, approvedList] = await Promise.all([
        readTestimonialsFromPrefix(PENDING_PREFIX),
        readTestimonialsFromPrefix(APPROVED_PREFIX),
      ]);
      return res.status(200).json([...pending, ...approvedList]);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  }

  if (req.method === 'POST') {
    const payload = req.body;

    const name = (payload?.name || '').trim();
    const title = (payload?.title || '').trim();
    const company = (payload?.company || '').trim();
    const quote = (payload?.quote || '').trim();
    const videoUrl = payload?.videoUrl ? String(payload.videoUrl) : null;

    // This endpoint is intentionally public: it backs the "Leave a Testimonial" form.
    if (!name || !quote) {
      return res.status(400).json({ error: 'Name and quote are required' });
    }

    const id = randomUUID();
    const now = new Date().toISOString();

    const caseStudySlugs = Array.isArray(payload?.caseStudySlugs)
      ? payload.caseStudySlugs.filter((s) => typeof s === 'string')
      : [];

    const newTestimonial = {
      id,
      name,
      title,
      company,
      quote,
      type: videoUrl ? 'video' : 'written',
      videoUrl,
      caseStudySlugs,
      approved: false,
      createdAt: now,
    };

    try {
      await put(`${PENDING_PREFIX}${id}.json`, JSON.stringify(newTestimonial), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      return res.status(201).json(newTestimonial);
    } catch (error) {
      console.error('Error creating testimonial:', error);
      return res.status(500).json({ error: 'Failed to create testimonial' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
