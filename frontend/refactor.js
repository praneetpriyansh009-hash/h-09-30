import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace 'use client'
  content = content.replace(/'use client';\n?/g, '');
  content = content.replace(/"use client";\n?/g, '');

  // next/link -> react-router-dom
  if (content.includes("from 'next/link'") || content.includes('from "next/link"')) {
    content = content.replace(/import Link from ['"]next\/link['"];?/g, "import { Link } from 'react-router-dom';");
    // Replace href= with to= for Links
    // This regex looks for <Link ... href="..." ...> and changes href to to
    content = content.replace(/<Link([^>]*)href=/g, '<Link$1to=');
  }

  // next/image -> img
  if (content.includes("from 'next/image'") || content.includes('from "next/image"')) {
    content = content.replace(/import Image from ['"]next\/image['"];?/g, '');
    content = content.replace(/<Image/g, '<img');
    // Remove fill, sizes
    content = content.replace(/\s+fill(\s|>|\/)/g, '$1');
    content = content.replace(/\s+sizes="[^"]*"(\s|>|\/)/g, '$1');
  }

  // next/navigation -> react-router-dom
  let hasNavigation = false;
  if (content.includes('usePathname')) {
    content = content.replace(/usePathname/g, 'useLocation');
    hasNavigation = true;
  }
  if (content.includes('useRouter')) {
    content = content.replace(/useRouter/g, 'useNavigate');
    hasNavigation = true;
  }
  
  if (hasNavigation) {
    content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]next\/navigation['"];?/g, (match, imports) => {
      let reactRouterImports = imports.replace(/usePathname/g, 'useLocation').replace(/useRouter/g, 'useNavigate');
      return `import { ${reactRouterImports.trim()} } from 'react-router-dom';`;
    });
  }

  // Next.js router.push -> navigate
  if (content.includes('router.push(') || content.includes('router.replace(')) {
    content = content.replace(/router\.push\(/g, 'navigate(');
    content = content.replace(/router\.replace\(/g, 'navigate(');
  }
  
  // router -> navigate variable rename
  if (content.includes('const router = useNavigate()')) {
    content = content.replace(/const router = useNavigate\(\)/g, 'const navigate = useNavigate()');
  }

  // usePathname() returns string, useLocation() returns { pathname }
  if (content.includes('const pathname = useLocation()')) {
    content = content.replace(/const pathname = useLocation\(\)/g, 'const location = useLocation();\n  const pathname = location.pathname');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

console.log('Starting refactor...');
walkDir('./src/components', processFile);
walkDir('./src/pages', processFile);
console.log('Refactor complete.');
