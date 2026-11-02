import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { query, closePool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function runSeed() {
  console.log('[Risss.clobber] Menjalankan migration & seed database...');

  if (!process.env.DATABASE_URL) {
    console.error('[Error] DATABASE_URL belum diatur di file .env');
    console.error('Silakan salin .env.example menjadi .env dan sesuaikan kredensial PostgreSQL.');
    process.exit(1);
  }

  try {
    const schemaSql = fs.readFileSync(path.join(rootDir, 'sql', 'schema.sql'), 'utf-8');
    let seedSql = fs.readFileSync(path.join(rootDir, 'sql', 'seed.sql'), 'utf-8');

    console.log('[1/3] Menerapkan skema tabel (schema.sql)...');
    await query(schemaSql);

    console.log('[2/3] Menyiapkan hash password akun demo (bcrypt)...');
    const demoPasswordHash = await bcrypt.hash('password123', 10);
    seedSql = seedSql.replaceAll('REPLACE_WITH_BCRYPT_HASH', demoPasswordHash);

    console.log('[3/3] Memasukkan data awal (seed.sql)...');
    await query(seedSql);

    console.log('\n[Sukses] Database berhasil diinisialisasi!');
    console.log('Kredensial demo:');
    console.log('  Admin    : admin@risssclobber.demo / password123');
    console.log('  Customer : demo@risssclobber.demo / password123\n');
  } catch (error) {
    console.error('[Error]: Gagal menjalankan seed:', error.message);
    process.exitCode = 1;
  } finally {
    await closePool();
  }
}

runSeed();
