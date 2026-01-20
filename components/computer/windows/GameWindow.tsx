import React, { useCallback } from 'react';
import {useBalloonsContext} from "@/components/balloons/BalloonContext";
// @ts-ignore
import nextConfig from "@/next.config";

interface GameWindowProps {
    src: string;
    title: string;
}

export default function GameWindow({ src, title }: GameWindowProps) {
    const { spawnBalloon } = useBalloonsContext();

    const handleLoad = useCallback((iframe: HTMLIFrameElement | null) => {
        if (!iframe) return;

        const attachListeners = () => {
            const win = iframe.contentWindow;
            if (!win) return;

            try {
                win.addEventListener("mousedown", (e) => {
                    const rect = iframe.getBoundingClientRect();
                    const x = (e.clientX * 0.25 + rect.left) / window.innerWidth;
                    const y = (e.clientY * 0.25 + rect.top) / window.innerHeight;
                    spawnBalloon(x * 100, y * 100);
                });
            } catch (e) {
                console.warn("Could not attach listeners to iframe", e);
            }
        };

        if (iframe.contentDocument?.readyState === "complete") attachListeners();
        else iframe.addEventListener("load", attachListeners, { once: true });
    }, [spawnBalloon]);

    return (
        <iframe
            ref={handleLoad}
            className="w-[400%] h-[400%] border-black border-2" 
            style={{transform: 'scale(0.25)', transformOrigin: "0 0"}} 
            src={`${nextConfig.basePath}${src}`}
            title={title}
        ></iframe>
    );
}
