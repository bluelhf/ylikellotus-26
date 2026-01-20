'use client';

import React, {useCallback, useEffect, useState} from "react";
import useBalloons from "@/components/balloons/hooks/balloons";
import useMousePosition from "@/components/balloons/hooks/mousePosition";
import {Balloon} from "@/components/balloons/Balloon";
import { BalloonContext } from "./BalloonContext";
// @ts-ignore
import nextConfig from "@/next.config";

type BalloonWrapperProps = {
    children: React.ReactNode
}

/**
 * Determines whether the given element should spawn a balloon when clicked.
 * This traverses the DOM tree upwards until it finds an element with the attribute 'data-balloon-spawnable' set. The
 * boolean value of the attribute determines whether the balloon should be spawned. If no attribute is found, the balloon
 * will be spawned.
 * @param root The innermost element in the tree to check
 * @returns true if the balloon should be spawned, false otherwise
 * */
function isSpawnable(root: HTMLElement) {
    let target: HTMLElement | null = root;
    while (target) {
        const attr = target.getAttribute("data-balloon-spawnable");
        if (attr === "false") return false;
        if (attr === "true") break;
        target = target.parentElement;
    }
    return true;
}

export default function BalloonWrapper({ children }: BalloonWrapperProps) {
    const balloonsRef = useBalloons();
    const mousePosition = useMousePosition();

    const spawnBalloon = useCallback((x?: number, y?: number) => {
        const finalX = x !== undefined ? x : mousePosition.current.x * 100;
        const finalY = y !== undefined ? y : mousePosition.current.y * 100;
        balloonsRef.current.push(new Balloon(finalX, finalY));
    }, [mousePosition]);

    const clearIfOffscreen = (balloon: Balloon) => {
        return (element: HTMLElement | null) => {
            if (!element) return;
            if (balloon.y < -(element.offsetHeight / window.innerHeight * 100))
                balloonsRef.current = balloonsRef.current.filter(b => b !== balloon);
        }
    }

    const pushAwayOnScroll = (delta: number) => {
        balloonsRef.current.forEach(balloon => balloon.applyImpulse(0, -delta / 40));
    }

    const [, setFrame] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setFrame(f => f + 1);
        }, 33); // ~30 FPS

        return () => clearInterval(id);
    }, []);


    useEffect(() => {
        let lastScroll = window.scrollY;
        const listener = () => {
            const delta = window.scrollY - lastScroll;
            lastScroll = window.scrollY;
            pushAwayOnScroll(delta);
        };
        window.addEventListener("scroll", listener, { passive: true });

        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);


    return (
        <BalloonContext.Provider value={{ spawnBalloon }}>
            <div onClick={(event) => {if (event.target instanceof HTMLElement && isSpawnable(event.target)) spawnBalloon()}}>
                {balloonsRef.current.map((balloon, index) => {
                    // Since we animate 'transform' we need to have a separate container, positioner and image
                    return (
                        <div className="fixed will-change-transform z-10 w-16 pointer-events-none" key={index} style={{left: `${balloon.x}vw`, top: `${balloon.y}vh`}}>
                            <div className="relative will-change-transform flex justify-center" style={{transform: "translate(-50%, -20%)"}}>
                                <img ref={clearIfOffscreen(balloon)}
                                     src={`${nextConfig.basePath}/assets/ilmapallo1.gif?${index}` /*break cache so the gifs can desync and it looks better*/} className="relative will-change-transform animate-appear"
                                     alt="Balloon"
                                ></img>
                            </div>
                        </div>
                        )
                })}
                {children}
            </div>
        </BalloonContext.Provider>
    )
}