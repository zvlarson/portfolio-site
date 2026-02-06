import { handleUpload } from '@vercel/blob/client';
import { randomUUID } from 'crypto';

const MAX_BYTES = 100 * 1024 * 1024; // 100MB

/**
 * Vercel Blob client-upload handler for testimonial videos.
 *
 * This is called by the browser (token exchange) and then by Vercel (upload completion callback).
 * Docs: https://vercel.com/docs/storage/vercel-blob/client-upload
 */
export default async function handler(req, res) {
  // Runtime validation - BLOB_READ_WRITE_TOKEN is required for Vercel Blob
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN is not configured');
    return res.status(500).json({ error: 'Server configuration error: Blob storage not configured' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Restrict uploads to our expected folder to avoid general-purpose anonymous uploads.
        if (!pathname.startsWith('testimonials/videos/')) {
          throw new Error('Invalid upload path');
        }

        // Optional: the client can tell us file size so we can reject early.
        if (clientPayload?.size && Number(clientPayload.size) > MAX_BYTES) {
          throw new Error('Video file must be under 100MB');
        }

        return {
          allowedContentTypes: [
            'video/mp4',
            'video/webm',
            'video/quicktime', // .mov
          ],
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({
            uploadId: randomUUID(),
          }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Testimonial video upload completed', {
          url: blob.url,
          pathname: blob.pathname,
        });
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Video upload error:', error);
    return res.status(400).json({ error: error.message || 'Upload failed' });
  }
}
