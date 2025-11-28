#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const routes = [
    'app/api/admin/notices/route.js',
    'app/api/admin/news/route.js',
    'app/api/admin/stats/route.js',
    'app/api/admin/recruiters/route.js',
    'app/api/admin/content/route.js',
    'app/api/admin/upload/route.js'
];

routes.forEach(route => {
    const filePath = path.join(process.cwd(), route);
    let content = fs.readFileSync(filePath, 'utf8');

    // For PUT methods
    content = content.replace(
        /export async function PUT\(request\) \{\n  try \{/g,
        `export async function PUT(request) {
  const auth = requireAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {`
    );

    // For DELETE methods  
    content = content.replace(
        /export async function DELETE\(request\) \{\n  try \{/g,
        `export async function DELETE(request) {
  const auth = requireAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {`
    );

    // For POST methods (except notices which is done)
    if (!route.includes('notices')) {
        content = content.replace(
            /export async function POST\(request\) \{\n  try \{/g,
            `export async function POST(request) {
  const auth = requireAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {`
        );
    }

    fs.writeFileSync(filePath, content);
    console.log(`✓ Updated ${route}`);
});

console.log('\n✅ All API routes protected!');
