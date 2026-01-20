"use client";

import {useEffect, useRef} from "react";
import {Scene} from "./Scene";
import Countdown from "@/components/Countdown";
import {START_DATE} from "@/app/constants";
import ExportedImage from 'next-image-export-optimizer'
import toimistoImg from '@/public/assets/wide/toimisto.png'
import cubiclesImg from '@/public/assets/wide/cubicles.png'
import useBreakpoint from "@/components/hooks/breakpoint";
// @ts-ignore
import nextConfig from "@/next.config";

export default function OfficeScene() {
    const hasMdBreakpoint = useBreakpoint("md");

    // bypass react here for performance reasons
    const officeRef = useRef<HTMLDivElement>(null);
    const cubicleRef = useRef<HTMLDivElement>(null);
    const createScrollListener = (mdBreakpointSnapshot: boolean) => () => {
        const position = window.pageYOffset;
        if (officeRef.current) officeRef.current.style.transform = `translateX(-50%) translateY(${position * 0.7}px)`;
        if (cubicleRef.current) {
            cubicleRef.current.style.transform = `translateX(-50%) translateY(${position * 0.5}px)`;
            cubicleRef.current.style.top = `${(mdBreakpointSnapshot ? 500 : 300)}px`;
        }
    };

    useEffect(() => {
        // called whenever we pass the md breakpoint threshold (for example, because of resize)
        const listener = createScrollListener(hasMdBreakpoint);
        window.addEventListener("scroll", listener, { passive: true });

        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, [hasMdBreakpoint]);

    return (
        <Scene className="relative">
            <div ref={officeRef} className="will-change-transform relative scene-body left-1/2 -translate-x-1/2 min-w-[1200px] md:min-w-[2500px]" style={{ transform: 'translateX(-50%)' }}>
                <div className="grid place-items-center">
                    <ExportedImage alt="Toimisto" src={toimistoImg} className="col-start-1 row-start-1" basePath={nextConfig.basePath} />
                    <div className="grid col-start-1 row-start-1 !min-h-[0.85em] md:!min-h-[1.7em] !min-w-[9%] -mb-[-29.8%] ml-[1.1%]">
                        <Countdown targetDate={START_DATE} />
                    </div>
                </div>
            </div>
            <div ref={cubicleRef} className="absolute scene-body top-[300px] md:top-[500px] left-1/2 -translate-x-1/2 min-w-[1200px] md:min-w-[2500px]" style={{ transform: 'translateX(-50%)' }}>
                <ExportedImage alt="Cubicles" src={cubiclesImg} basePath={nextConfig.basePath}/>
            </div>
        </Scene>
    )
}
