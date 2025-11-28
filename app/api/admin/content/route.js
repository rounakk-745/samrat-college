import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readData, writeData } from '@/lib/fileUtils';

const FILENAME = 'content.json';

export async function GET(request) {
    try {
        const content = await readData(FILENAME);
        return NextResponse.json({ success: true, data: content });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { section, data } = body;

        if (!section || !data) {
            return NextResponse.json({ error: 'Section and data are required' }, { status: 400 });
        }

        if (section !== 'hero' && section !== 'principal') {
            return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
        }

        const content = await readData(FILENAME);
        content[section] = { ...content[section], ...data };

        await writeData(FILENAME, content);

        return NextResponse.json({ success: true, message: 'Content updated successfully', data: content[section] });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}
