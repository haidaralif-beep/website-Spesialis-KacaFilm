import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  console.log('Setting up Supabase Storage...');

  // Create bucket
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error('Error listing buckets:', listError.message);
    return;
  }

  const bucketExists = buckets?.some(b => b.name === 'kaca-film');
  if (!bucketExists) {
    const { error: createError } = await supabase.storage.createBucket('kaca-film', {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    });
    if (createError) {
      console.error('Error creating bucket:', createError.message);
      return;
    }
    console.log('Bucket "kaca-film" created successfully!');
  } else {
    console.log('Bucket "kaca-film" already exists.');
  }

  // Make bucket public
  const { error: updateError } = await supabase.storage.updateBucket('kaca-film', {
    public: true,
  });
  if (updateError) {
    console.error('Error making bucket public:', updateError.message);
  } else {
    console.log('Bucket is public.');
  }

  console.log('Storage setup complete!');
}

setupStorage().catch(console.error);
