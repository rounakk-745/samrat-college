import { useState } from 'react';

export const usePageNavigation = (defaultPage = 'home') => {
    const [activePage, setActivePage] = useState(defaultPage);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigateTo = (page) => {
        setActivePage(page);
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    return {
        activePage,
        setActivePage,
        isMenuOpen,
        setIsMenuOpen,
        navigateTo
    };
};