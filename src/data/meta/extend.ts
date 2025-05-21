import type { Metadata, Viewport } from 'next'; // Make sure to import Viewport
import merge from 'ts-deepmerge';

import { mapKeywords } from './builder';
// import { DEFAULT_METADATA } from './default'; // We will adjust this or the default content

// --- Adjust DEFAULT_METADATA or create a separate default for metadata and viewport ---
// Let's assume DEFAULT_METADATA currently includes viewport.
// You need to ensure DEFAULT_METADATA contains everything *except* viewport.
// And then define a separate default viewport object.

// Example: If your DEFAULT_METADATA is in a file like 'default.ts'
// Modify 'src/data/meta/default.ts' (or wherever DEFAULT_METADATA is defined)
// to *not* include the viewport property.

// Then, in src/data/meta.ts (this file), define your default viewport:
export const DEFAULT_VIEWPORT: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Or whatever your default viewport settings are
  // You might also have themeColor or other viewport properties here
};

// Now, your seo function should use a version of DEFAULT_METADATA that *doesn't* have viewport
// Assuming DEFAULT_METADATA is already updated to exclude viewport:
import { DEFAULT_METADATA } from './default'; // Ensure this DEFAULT_METADATA does NOT contain viewport

type SeoProps = Metadata & {
  url?: string | URL;
};

/**
 * Helper method to deep merge the SEO params from a given page
 * with the default SEO params.
 *
 * This method also will use title and description in the OpenGraph and
 * Twitter metadata, if not set
 */
export const seo = ({ url, ...metadata }: SeoProps = {}): Metadata => {
  const title = metadata.title ?? DEFAULT_METADATA.title;
  const description = metadata.description ?? DEFAULT_METADATA.description;

  // Ensure no viewport is accidentally passed into the merge from `metadata` here
  // as the top-level `metadata` prop can still contain it if a page passes it.
  // Best to explicitly remove it if present before merging with DEFAULT_METADATA.
  const { ...metadataWithoutViewport } = metadata; // Destructure to exclude viewport

  metadataWithoutViewport.keywords = mapKeywords(
    metadataWithoutViewport.keywords,
  );

  metadataWithoutViewport.openGraph = {
    title: title ?? undefined,
    description: description ?? undefined,
    ...metadataWithoutViewport.openGraph,
  };

  metadataWithoutViewport.twitter = {
    title: title ?? undefined,
    description: description ?? undefined,
    ...metadataWithoutViewport.twitter,
  };

  if (url) {
    metadataWithoutViewport.openGraph.url = url;
    metadataWithoutViewport.alternates = {
      canonical: url,
      ...metadataWithoutViewport.alternates,
    };
  }

  // Merge the default metadata with the page-specific metadata (without viewport)
  return merge(DEFAULT_METADATA, metadataWithoutViewport);
};

// IMPORTANT: Ensure your src/data/meta/default.ts (or wherever DEFAULT_METADATA is)
// is updated to NOT include the 'viewport' property in its export.
// For example:
// In src/data/meta/default.ts
/*
export const DEFAULT_METADATA: Metadata = {
  title: {
    default: 'Your App Name',
    template: '%s | Your App Name',
  },
  description: 'A description of your app.',
  // ... other default properties
  // NO viewport property here
};
*/
