import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readData, writeData } from '@/lib/fileUtils';

const FILENAME = 'stats.json';

export async function GET(request) {
    try {
        const stats = await readData(FILENAME);
        return NextResponse.json({ success: true, data: stats });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, label, value } = body;

        if (!id) {
            return NextResponse.json({ error: 'Stat ID is required' }, { status: 400 });
        }

        const stats = await readData(FILENAME);
        const index = stats.findIndex(s => s.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Stat not found' }, { status: 404 });
        }

        stats[index] = {
            ...stats[index],
            label: label || stats[index].label,
            value: value || stats[index].value
        };

        await writeData(FILENAME, stats);

        return NextResponse.json({ success: true, message: 'Stat updated successfully', data: stats[index] });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update stat' }, { status: 500 });
    }
}
