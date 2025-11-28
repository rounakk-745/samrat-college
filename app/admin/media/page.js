'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function MediaManager() {
    const [uploading, setUploading] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState('general');
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [error, setError] = useState('');

    const folders = [
        { value: 'hero', label: 'Hero Section' },
        { value: 'principal', label: 'Principal' },
        { value: 'events', label: 'Events' },
        { value: 'gallery', label: 'Gallery' }
    ];

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError('Invalid file type. Only JPG, PNG, and WebP are allowed.');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size exceeds 5MB limit.');
            return;
        }

        setError('');
        setUploading(true);
        setUploadedUrl('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', selectedFolder);

            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setUploadedUrl(data.url);
                alert('File uploaded successfully!');
            } else {
                setError(data.error || 'Upload failed');
            }
        } catch (err) {
            setError('An error occurred during upload');
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uploadedUrl);
        alert('URL copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/admin" className="flex items-center gap-2 text-blue-200 hover:text-white mb-2">
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">Media Upload</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Images</h2>
                    <p className="text-gray-600">Upload images for use across the website</p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border">
                    <div className="space-y-6">
                        {/* Folder Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Select Folder</label>
                            <select
                                value={selectedFolder}
                                onChange={(e) => setSelectedFolder(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                {folders.map(folder => (
                                    <option key={folder.value} value={folder.value}>{folder.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Choose Image</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                    disabled={uploading}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="bg-blue-100 p-4 rounded-full">
                                            {uploading ? (
                                                <div className="animate-spin">
                                                    <Upload className="text-blue-600" size={32} />
                                                </div>
                                            ) : (
                                                <ImageIcon className="text-blue-600" size={32} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium text-gray-700">
                                                {uploading ? 'Uploading...' : 'Click to upload image'}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                JPG, PNG, or WebP (max 5MB)
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Success Message with URL */}
                        {uploadedUrl && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-600 mt-0.5" size={20} />
                                    <div className="flex-1">
                                        <p className="font-medium text-green-800 mb-2">Upload Successful!</p>
                                        <div className="bg-white border border-green-200 rounded p-3">
                                            <p className="text-sm text-gray-600 mb-1">Image URL:</p>
                                            <code className="text-sm text-gray-800 break-all">{uploadedUrl}</code>
                                        </div>
                                        <button
                                            onClick={copyToClipboard}
                                            className="mt-3 text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Copy URL to Clipboard
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-medium text-blue-900 mb-2">How to use uploaded images:</h3>
                            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                                <li>Upload your image using the form above</li>
                                <li>Copy the generated URL</li>
                                <li>Paste the URL in the "Image URL" field when creating/editing content</li>
                                <li>The image will appear on the website immediately</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
