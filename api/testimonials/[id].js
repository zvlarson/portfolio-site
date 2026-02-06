import { del, head, put } from '@vercel/blob';

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

async function readByPath(pathname) {
  const meta = await head(pathname);
  const res = await fetch(meta.url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function writeByPath(pathname, data) {
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

export default async function handler(req, res) {
  if (!requireAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  const pendingPath = `${PENDING_PREFIX}${id}.json`;
  const approvedPath = `${APPROVED_PREFIX}${id}.json`;

  if (req.method === 'PATCH') {
    const patch = req.body;

    // Try pending first, then approved.
    let existing = null;
    let existingPath = null;
    try {
      existing = await readByPath(pendingPath);
      existingPath = pendingPath;
    } catch {
      // ignore
    }
    if (!existing) {
      try {
        existing = await readByPath(approvedPath);
        existingPath = approvedPath;
      } catch {
        // ignore
      }
    }

    if (!existing || !existingPath) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    const approved = typeof patch?.approved === 'boolean' ? patch.approved : existing.approved;
    const videoUrl = patch?.videoUrl !== undefined ? (patch.videoUrl ? String(patch.videoUrl) : null) : existing.videoUrl;

    const caseStudySlugs = Array.isArray(patch?.caseStudySlugs)
      ? patch.caseStudySlugs.filter((s) => typeof s === 'string')
      : existing.caseStudySlugs || [];

    const updated = {
      ...existing,
      approved,
      caseStudySlugs,
      videoUrl,
      type: videoUrl ? 'video' : 'written',
    };

    // If approval status changes, "move" between prefixes.
    const desiredPath = approved ? approvedPath : pendingPath;
    try {
      await writeByPath(desiredPath, updated);
      if (existingPath !== desiredPath) {
        await del(existingPath);
      }
      return res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      return res.status(500).json({ error: 'Failed to update testimonial' });
    }
  }

  if (req.method === 'DELETE') {
    // Delete from whichever prefix exists.
    try {
      await del(pendingPath);
      return res.status(204).end();
    } catch {
      // ignore
    }
    try {
      await del(approvedPath);
      return res.status(204).end();
    } catch {
      // ignore
    }
    return res.status(404).json({ error: 'Testimonial not found' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
