import React from 'react';
import Button from './ui/Button';

export default function CTASection({ setActivePage }) {
    return (
        <div className="bg-blue-900 text-white py-16 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                <p className="mb-8 text-blue-200">
                    Admissions for the Academic Year 2025-2026 are now open. Don't miss the opportunity to study at the region's top college.
                </p>
                <Button onClick={() => setActivePage('admissions')}>Apply Now for 2025</Button>
            </div>
        </div>
    );
}
