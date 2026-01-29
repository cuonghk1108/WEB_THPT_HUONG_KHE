import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return res.status(500).json({ 
        error: 'Missing Supabase credentials',
        details: 'VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in environment variables'
      });
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const bucketName = 'images';

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      throw new Error(`Failed to list buckets: ${listError.message}`);
    }

    const bucketExists = buckets?.some(b => b.name === bucketName);

    if (!bucketExists) {
      // Create bucket
      const { data: bucket, error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
      });

      if (createError) {
        throw new Error(`Failed to create bucket: ${createError.message}`);
      }

      console.log('✅ Bucket created:', bucket);
    } else {
      console.log('✅ Bucket already exists');
    }

    // Set up storage policies using SQL via REST API
    const policies = [
      {
        name: 'Public Access (SELECT)',
        sql: `CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'images' );`
      },
      {
        name: 'Anyone can upload (INSERT)',
        sql: `CREATE POLICY "Anyone can upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'images' );`
      },
      {
        name: 'Authenticated users can update (UPDATE)',
        sql: `CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'images' );`
      },
      {
        name: 'Authenticated users can delete (DELETE)',
        sql: `CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'images' );`
      }
    ];

    const policyResults = [];
    
    // Note: We cannot execute CREATE POLICY directly via REST API
    // User must run these SQL commands manually in Supabase SQL Editor
    // This is because policy creation requires superuser role
    
    for (const policy of policies) {
      policyResults.push({
        policy: policy.name,
        status: 'pending (run SQL manually)',
        sql: policy.sql
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Storage setup completed',
      bucket: {
        name: bucketName,
        exists: true,
        public: true
      },
      policies: policyResults,
      sqlCommands: policies.map(p => p.sql),
      manualSetupUrl: `https://supabase.com/dashboard/project/vicqpnikodxcncyappes/storage/policies`,
      instructions: policyResults.some(p => p.status.includes('pending'))
        ? 'Bucket created successfully. Please run the SQL commands in Supabase Dashboard > SQL Editor to create policies.'
        : 'Bucket and policies created successfully!'
    });

  } catch (error: any) {
    console.error('Setup storage error:', error);
    return res.status(500).json({
      error: 'Failed to setup storage',
      details: error.message,
      stack: error.stack
    });
  }
}
