'use client';

import { createContext, useContext } from 'react';

interface BalloonContextType {
    spawnBalloon: (x?: number, y?: number) => void;
}

export const BalloonContext = createContext<BalloonContextType | undefined>(undefined);

export const useBalloonsContext = () => {
    const context = useContext(BalloonContext);
    if (!context) {
        throw new Error('useBalloonsContext must be used within a BalloonProvider');
    }
    return context;
};
