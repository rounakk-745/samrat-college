import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readData, writeData, generateId, getCurrentTimestamp } from '@/lib/fileUtils';

const FILENAME = 'news.json';

export async function GET(request) {
    try {
        const news = await readData(FILENAME);
        return NextResponse.json({ success: true, data: news });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { text } = body;

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const news = await readData(FILENAME);

        const newNews = {
            id: generateId('news'),
            text,
            createdAt: getCurrentTimestamp(),
            updatedAt: getCurrentTimestamp()
        };

        news.push(newNews);
        await writeData(FILENAME, news);

        return NextResponse.json({ success: true, message: 'News created successfully', data: newNews });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, text } = body;

        if (!id) {
            return NextResponse.json({ error: 'News ID is required' }, { status: 400 });
        }

        const news = await readData(FILENAME);
        const index = news.findIndex(n => n.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 });
        }

        news[index] = {
            ...news[index],
            text: text || news[index].text,
            updatedAt: getCurrentTimestamp()
        };

        await writeData(FILENAME, news);

        return NextResponse.json({ success: true, message: 'News updated successfully', data: news[index] });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'News ID is required' }, { status: 400 });
        }

        const news = await readData(FILENAME);
        const filteredNews = news.filter(n => n.id !== id);

        if (filteredNews.length === news.length) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 });
        }

        await writeData(FILENAME, filteredNews);

        return NextResponse.json({ success: true, message: 'News deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
    }
}
