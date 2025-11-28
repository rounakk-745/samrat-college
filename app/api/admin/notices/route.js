import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readData, writeData, generateId, getCurrentTimestamp } from '@/lib/fileUtils';

const FILENAME = 'notices.json';

export async function GET(request) {
    try {
        const notices = await readData(FILENAME);
        return NextResponse.json({ success: true, data: notices });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
    }
}

export async function POST(request) {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
        return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { date, text, isNew } = body;

        if (!date || !text) {
            return NextResponse.json({ error: 'Date and text are required' }, { status: 400 });
        }

        const notices = await readData(FILENAME);

        const newNotice = {
            id: generateId('ntc'),
            date,
            text,
            new: isNew || false,
            createdAt: getCurrentTimestamp(),
            updatedAt: getCurrentTimestamp()
        };

        notices.unshift(newNotice); // Add to beginning
        await writeData(FILENAME, notices);

        return NextResponse.json({ success: true, message: 'Notice created successfully', data: newNotice });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, date, text, isNew } = body;

        if (!id) {
            return NextResponse.json({ error: 'Notice ID is required' }, { status: 400 });
        }

        const notices = await readData(FILENAME);
        const index = notices.findIndex(n => n.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }

        notices[index] = {
            ...notices[index],
            date: date || notices[index].date,
            text: text || notices[index].text,
            new: isNew !== undefined ? isNew : notices[index].new,
            updatedAt: getCurrentTimestamp()
        };

        await writeData(FILENAME, notices);

        return NextResponse.json({ success: true, message: 'Notice updated successfully', data: notices[index] });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Notice ID is required' }, { status: 400 });
        }

        const notices = await readData(FILENAME);
        const filteredNotices = notices.filter(n => n.id !== id);

        if (filteredNotices.length === notices.length) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }

        await writeData(FILENAME, filteredNotices);

        return NextResponse.json({ success: true, message: 'Notice deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
    }
}
