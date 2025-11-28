import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Read data from a JSON file
 */
export async function readData(filename) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        throw new Error(`Failed to read ${filename}`);
    }
}

/**
 * Write data to a JSON file
 */
export async function writeData(filename, data) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        throw new Error(`Failed to write ${filename}`);
    }
}

/**
 * Generate a unique ID
 */
export function generateId(prefix) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `${prefix}-${timestamp}-${random}`;
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp() {
    return new Date().toISOString();
}
