#!/usr/bin/env node

/**
 * Data Status Check Script
 * Helps diagnose data loading issues
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 SCHOOL WEBSITE - DATA STATUS CHECK\n');
console.log('═'.repeat(50));

// Check 1: Environment Files
console.log('\n1️⃣  ENVIRONMENT FILES CHECK');
console.log('─'.repeat(50));

const envFiles = ['.env', '.env.local', '.env.example', '.env.local.example'];
envFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  
  if (exists && file.includes('.local')) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const hasSupabaseUrl = content.includes('VITE_SUPABASE_URL');
    const hasSupabaseKey = content.includes('VITE_SUPABASE_ANON_KEY');
    console.log(`   ${hasSupabaseUrl ? '✅' : '❌'} VITE_SUPABASE_URL`);
    console.log(`   ${hasSupabaseKey ? '✅' : '❌'} VITE_SUPABASE_ANON_KEY`);
  }
});

// Check 2: Key Files
console.log('\n2️⃣  CRITICAL FILES CHECK');
console.log('─'.repeat(50));

const criticalFiles = [
  'context/DataContext.tsx',
  'services/supabaseService.ts',
  'utils/dataLoader.ts',
  'components/DataDebugStatus.tsx',
  'pages/DataTest.tsx'
];

criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? '✅' : '⚠️'} ${file}`);
});

// Check 3: Initial Data
console.log('\n3️⃣  INITIAL DATA CHECK');
console.log('─'.repeat(50));

const dataContextPath = path.join(__dirname, '..', 'context', 'DataContext.tsx');
if (fs.existsSync(dataContextPath)) {
  const content = fs.readFileSync(dataContextPath, 'utf-8');
  const hasInitialNews = content.includes('INITIAL_NEWS');
  const hasInitialTeachers = content.includes('INITIAL_TEACHERS');
  const hasInitialClubs = content.includes('INITIAL_CLUBS');
  const hasInitialGallery = content.includes('INITIAL_GALLERY');
  
  console.log(`${hasInitialNews ? '✅' : '❌'} INITIAL_NEWS`);
  console.log(`${hasInitialTeachers ? '✅' : '❌'} INITIAL_TEACHERS`);
  console.log(`${hasInitialClubs ? '✅' : '❌'} INITIAL_CLUBS`);
  console.log(`${hasInitialGallery ? '✅' : '❌'} INITIAL_GALLERY`);
}

// Check 4: Build Files
console.log('\n4️⃣  BUILD CONFIGURATION');
console.log('─'.repeat(50));

const viteConfigPath = path.join(__dirname, '..', 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  console.log('✅ vite.config.ts exists');
}

const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  console.log(`✅ package.json found with ${Object.keys(packageJson.dependencies || {}).length} dependencies`);
}

// Summary
console.log('\n' + '═'.repeat(50));
console.log('✅ SETUP COMPLETE\n');
console.log('Next steps:');
console.log('  1. npm install (if not already done)');
console.log('  2. npm run dev');
console.log('  3. Visit http://localhost:3000/data-test to verify data loading');
console.log('  4. Check browser console (F12) for detailed logs\n');
