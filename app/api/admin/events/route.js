import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readData, writeData, generateId, getCurrentTimestamp } from '@/lib/fileUtils';

const FILENAME = 'events.json';

// GET - Fetch all events
export async function GET(request) {
    try {
        const events = await readData(FILENAME);
        return NextResponse.json({ success: true, data: events });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

// POST - Create new event
export async function POST(request) {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
        return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { date, title, location, image } = body;

        if (!date || !title || !location) {
            return NextResponse.json(
                { error: 'Date, title, and location are required' },
                { status: 400 }
            );
        }

        const events = await readData(FILENAME);

        const newEvent = {
            id: generateId('evt'),
            date,
            title,
            location,
            image: image || '',
            createdAt: getCurrentTimestamp(),
            updatedAt: getCurrentTimestamp()
        };

        events.push(newEvent);
        await writeData(FILENAME, events);

        return NextResponse.json({
            success: true,
            message: 'Event created successfully',
            data: newEvent
        });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}

// PUT - Update event
export async function PUT(request) {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
        return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, date, title, location, image } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Event ID is required' },
                { status: 400 }
            );
        }

        const events = await readData(FILENAME);
        const index = events.findIndex(e => e.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        events[index] = {
            ...events[index],
            date: date || events[index].date,
            title: title || events[index].title,
            location: location || events[index].location,
            image: image !== undefined ? image : events[index].image,
            updatedAt: getCurrentTimestamp()
        };

        await writeData(FILENAME, events);

        return NextResponse.json({
            success: true,
            message: 'Event updated successfully',
            data: events[index]
        });
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json(
            { error: 'Failed to update event' },
            { status: 500 }
        );
    }
}

// DELETE - Delete event
export async function DELETE(request) {
    const auth = requireAuth(request);
    if (!auth.authenticated) {
        return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Event ID is required' },
                { status: 400 }
            );
        }

        const events = await readData(FILENAME);
        const filteredEvents = events.filter(e => e.id !== id);

        if (filteredEvents.length === events.length) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        await writeData(FILENAME, filteredEvents);

        return NextResponse.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}
