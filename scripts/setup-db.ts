import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { join } from 'path';

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('supabase.com')
      ? { rejectUnauthorized: false }
      : false,
  });

  try {
    // Run migration SQL as a single query
    const migrationPath = join(__dirname, 'migration-supabase.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    await pool.query(migrationSQL);
    console.log('✅ Tables created successfully');

    // Ensure default admin exists with correct password
    const adminCheck = await pool.query('SELECT * FROM users WHERE nama = $1', ['admin']);
    if (adminCheck.rows.length === 0) {
      const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
      await pool.query(
        'INSERT INTO users (nama, password, role) VALUES ($1, $2, $3)',
        ['admin', hashedPassword, 'admin']
      );
      console.log('✅ Default admin user created:');
      console.log('   Nama: admin');
      console.log('   Password: ' + (process.env.ADMIN_PASSWORD || 'admin123'));
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    console.log('🎉 Database setup complete!');
  } catch (err) {
    console.error('❌ Setup failed:', err);
    throw err;
  } finally {
    await pool.end();
  }
}

setupDatabase().catch(console.error);
