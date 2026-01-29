# 🛠️ TROUBLESHOOTING COMMANDS

## 🚀 Start Fresh

```bash
# Stop current server (Ctrl+C)
# Clear cache and restart
npm run dev

# Or with verbose output
npm run dev -- --debug

# Check if port 3000 is in use:
netstat -ano | findstr :3000

# If port 3000 is in use, kill it (Windows):
taskkill /PID <PID_NUMBER> /F
```

## 🔍 Debugging Commands

### Browser Console Commands
```javascript
// 1. Check environment variables
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// 2. Enable debug widget
localStorage.setItem('debug_data_status', 'true');
location.reload();

// 3. Check localStorage data
console.log('News:', JSON.parse(localStorage.getItem('school_news')));
console.log('Teachers:', JSON.parse(localStorage.getItem('school_teachers')));
console.log('Clubs:', JSON.parse(localStorage.getItem('school_clubs')));

// 4. Clear all cache
localStorage.clear();
sessionStorage.clear();
location.reload();

// 5. Test Supabase API directly
fetch('https://vicqpnikodxcncyappes.supabase.co/rest/v1/news?select=*', {
  headers: {
    apikey: 'YOUR_ANON_KEY_HERE',
  }
})
.then(r => r.json())
.then(data => console.log('Supabase Data:', data))
.catch(e => console.error('Error:', e));

// 6. Check DataContext state (if exposed)
console.log('App mounted, check Data Context in React DevTools');
```

### Check File Existence
```bash
# Windows PowerShell
Test-Path "d:\AI\.env"
Test-Path "d:\AI\.env.local"
Test-Path "d:\AI\context\DataContext.tsx"
Test-Path "d:\AI\pages\DataTest.tsx"

# View file contents
Get-Content "d:\AI\.env"
Get-Content "d:\AI\.env.local"
```

## 🧪 Testing URLs

```
# Test data loading page
http://localhost:3000/data-test

# All main pages (should show data)
http://localhost:3000/           (Home)
http://localhost:3000/tin-tuc    (News)
http://localhost:3000/giao-vien  (Teachers)
http://localhost:3000/cau-lac-bo (Clubs)
http://localhost:3000/thu-vien-anh (Gallery)
http://localhost:3000/su-kien    (Events)
```

## 📊 Data Verification

```bash
# Check if data files exist in workspace
dir d:\AI\pages\News.tsx
dir d:\AI\pages\Teachers.tsx
dir d:\AI\pages\Gallery.tsx

# View DataContext file size (should be large)
Get-ChildItem "d:\AI\context\DataContext.tsx" | Select-Object Length
```

## 🔧 Network Debugging

```bash
# Check if Supabase is reachable
Test-NetConnection "vicqpnikodxcncyappes.supabase.co" -Port 443

# DNS resolution
Resolve-DnsName "supabase.com"

# Ping Supabase
ping vicqpnikodxcncyappes.supabase.co
```

## 📝 Log Collection

```bash
# Save browser console logs to file (in browser console)
# Copy from console and paste into file

# Or use JavaScript to get logs:
# In browser console:
console.save = function(data, filename) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
};

// Then use:
console.save({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅' : '❌',
  timestamp: new Date().toISOString()
}, 'debug-logs.json');
```

## 🆘 Emergency Fixes

```bash
# If everything is broken, reset:
cd d:\AI

# 1. Clear node_modules and reinstall
rmdir /s /q node_modules
npm install

# 2. Clear npm cache
npm cache clean --force

# 3. Remove lock files and reinstall
del package-lock.json
npm install

# 4. Remove build output
rmdir /s /q dist
rmdir /s /q .vite

# 5. Start fresh
npm run dev
```

## 📦 Dependency Check

```bash
# Check if all dependencies are installed
npm list

# Check specific packages
npm list react
npm list @supabase/supabase-js
npm list vite

# Update dependencies
npm update

# Check for vulnerabilities
npm audit
```

## 🌐 Port Issues

```bash
# If port 3000 is in use, use different port
npm run dev -- --port 3001

# Find what's using port 3000 (Windows)
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Get-Process -Id <PID>

# Kill process by name
Get-Process node | Stop-Process -Force
```

## 🔐 Security Check

```javascript
// In browser console, verify no sensitive data in URL/localStorage
localStorage.forEach((value, key) => {
  if (value.includes('private') || value.includes('secret')) {
    console.warn('⚠️ Sensitive data in localStorage:', key);
  }
});

// Check session storage
sessionStorage.forEach((value, key) => {
  console.log('Session:', key, '=', value.substring(0, 50) + '...');
});
```

## 📈 Performance Check

```javascript
// In browser console, measure load time
console.time('Data Load');
// (wait for data to load)
console.timeEnd('Data Load');

// Check bundle size
console.log('Performance:', performance.getEntriesByType('navigation'));

// Check resource timing
performance.getEntriesByType('resource').forEach(r => {
  if (r.duration > 1000) {
    console.warn(`⚠️ Slow resource: ${r.name} (${r.duration}ms)`);
  }
});
```

---

## 🎯 Quick Diagnosis Flow

```
1. Did you restart dev server? NO → Restart it
2. Visit /data-test page → Check status
3. Open console (F12) → Look for ✅/❌ logs
4. Is Supabase configured? → Check .env.local
5. Can you reach Supabase? → Run fetch test
6. Is data in localStorage? → Check console
7. Are defaults showing? → Check initial data in DataContext

If all OK → Issue likely resolved ✅
If still issues → Collect logs and provide to support
```

---

## 💾 Save Diagnostic Info

```javascript
// Run in browser console to save full diagnostic:
const diagnostic = {
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseConfigured: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  localStorage_news: localStorage.getItem('school_news') ? '✅' : '❌',
  localStorage_teachers: localStorage.getItem('school_teachers') ? '✅' : '❌',
  localStorage_clubs: localStorage.getItem('school_clubs') ? '✅' : '❌',
};

console.log('📊 DIAGNOSTIC DATA:', diagnostic);
console.table(diagnostic);
```

---

**Ready to diagnose and fix issues!** 🚀
