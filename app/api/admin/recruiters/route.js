import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readData, writeData, generateId } from '@/lib/fileUtils';

const FILENAME = 'recruiters.json';

export async function GET(request) {
    try {
        const recruiters = await readData(FILENAME);
        return NextResponse.json({ success: true, data: recruiters });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch recruiters' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const recruiters = await readData(FILENAME);

        const newRecruiter = {
            id: generateId('rec'),
            name,
            order: recruiters.length + 1
        };

        recruiters.push(newRecruiter);
        await writeData(FILENAME, recruiters);

        return NextResponse.json({ success: true, message: 'Recruiter added successfully', data: newRecruiter });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add recruiter' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, name } = body;

        if (!id) {
            return NextResponse.json({ error: 'Recruiter ID is required' }, { status: 400 });
        }

        const recruiters = await readData(FILENAME);
        const index = recruiters.findIndex(r => r.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Recruiter not found' }, { status: 404 });
        }

        recruiters[index] = {
            ...recruiters[index],
            name: name || recruiters[index].name
        };

        await writeData(FILENAME, recruiters);

        return NextResponse.json({ success: true, message: 'Recruiter updated successfully', data: recruiters[index] });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update recruiter' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Recruiter ID is required' }, { status: 400 });
        }

        const recruiters = await readData(FILENAME);
        const filteredRecruiters = recruiters.filter(r => r.id !== id);

        if (filteredRecruiters.length === recruiters.length) {
            return NextResponse.json({ error: 'Recruiter not found' }, { status: 404 });
        }

        await writeData(FILENAME, filteredRecruiters);

        return NextResponse.json({ success: true, message: 'Recruiter deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete recruiter' }, { status: 500 });
    }
}
