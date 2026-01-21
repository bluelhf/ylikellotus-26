"use client";

import React, {useEffect, useState} from 'react'
import {Scene} from "@/components/Scene";
import AdPlayer from "@/components/computer/windows/AdPlayer";
import GameOne from "@/components/computer/windows/GameOne";
import GameTwo from "@/components/computer/windows/GameTwo";
import ExportedImage from 'next-image-export-optimizer'
import koneImg from '@/public/assets/wide/koneF2.png'
import koneImgEnglish from '@/public/assets/wide/koneF2_enkku.png'
import poydanalusImg from '@/public/assets/wide/pöydänalus.png'
import ratImg from '@/public/assets/rat.png'
import ostaImg from '@/public/assets/osta.png'
import ostaImgEnglish from '@/public/assets/ostaF1_enkku.png'
import tabMarkerImg from '@/public/assets/tabmarkerF1.png'
import useLanguage from "@/components/hooks/language";
import {KIDE_URL} from "@/app/constants";
// @ts-ignore
import nextConfig from "@/next.config";
import useBreakpoint from "@/components/hooks/breakpoint";

export type WindowKey = "AdPlayer" | "GameOne" | "GameTwo";

const windowIndex: Record<WindowKey, React.FC> = {
    "AdPlayer": AdPlayer,
    "GameOne": GameOne,
    "GameTwo": GameTwo
}

interface TabProps {
    title: string;
    onClick?: () => void;
    href?: string;
    isActive?: boolean;
    className?: string;
}

const Tab: React.FC<TabProps> = ({ title, onClick, href, isActive, className }) => {
    const content = (
        <div
            title={title}
            data-balloon-spawnable="true"
            className={`relative w-full h-full cursor-pointer flex flex-col justify-center ${className || ""}`}
            onClick={onClick}
        >
            <ExportedImage
                src={tabMarkerImg}
                alt="Active Tab Marker"
                className={`absolute bottom-[2px] left-0 w-full h-[10%] object-fill pointer-events-none ${isActive ? "" : "hidden"}`}
                basePath={nextConfig.basePath}
            />
        </div>
    );

    if (href) {
        return (
            <a href={href} className="contents">
                {content}
            </a>
        );
    }

    return content;
};

export default function ComputerScene() {
    const [computerWindow, setComputerWindow] = useState("AdPlayer" as WindowKey);

    const [scrollProgress, setScrollProgress] = useState(0);
    const onScroll = () => {
        setScrollProgress(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const [sceneTop, setSceneTop] = useState(0);
    const [yHeight, setYHeight] = useState(0);
    const computerRef = React.useRef<HTMLDivElement>(null);
    const { lang } = useLanguage();

    const updateDimensions = () => {
        if (computerRef.current) {
            const rect = computerRef.current.getBoundingClientRect();
            const absoluteBottom = rect.bottom + window.pageYOffset;
            setSceneTop(absoluteBottom);
            setYHeight(rect.height);
        }
    };

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);


    const hasLgBreakpoint = useBreakpoint("lg");
    const hasMdBreakpoint = useBreakpoint("md");
    const sceneBottom = sceneTop + yHeight * (hasLgBreakpoint ? 0.5 : hasMdBreakpoint ? 0.4 : 0.3);
    const sceneHeight = sceneBottom - sceneTop;

    const viewportBottom = scrollProgress + (typeof window !== 'undefined' ? window.innerHeight : 0);
    
    const progress = typeof window !== 'undefined' 
        ? Math.min(1, Math.max(0, (viewportBottom - sceneTop) / sceneHeight))
        : 0;

    const underTableScroll= -(1 - progress) * 50;
    const ratBuyNowScroll =  (1 - progress) * 25;

    return (
        <Scene className="col-start-1 row-start-1">
            <div className="relative scene-body-xl translate-x-[-50%] left-[50%] isolate">
                <div ref={computerRef} className="relative z-20">
                    <div className="relative @container grid place-items-center">
                        <ExportedImage
                            onLoad={(el) => {
                                if (el) updateDimensions();
                            }}
                            alt="Computer"
                            src={lang === "english" ? koneImgEnglish : koneImg}
                            className="w-full h-auto relative"
                            basePath={nextConfig.basePath}
                        />
                        <div className="absolute left-[37.3%] top-[6.5%] w-[25.7%] h-[40.9%]" data-balloon-spawnable="true">
                            {(Object.keys(windowIndex) as WindowKey[]).map((key) => {
                                const WindowComponent = windowIndex[key];
                                return (
                                    <div key={key} className={computerWindow === key ? "w-full h-full" : "hidden"}>
                                        <WindowComponent />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="absolute left-[37.25%] top-[4.4%] w-[22.2%] h-[2.7%] translate-y-[-15%] grid grid-cols-[5.4fr_5.75fr_5.5fr_5.75fr]">
                            <Tab
                                title={lang === "english" ? "Watch advertisement video" : "Katso mainosvideo"}
                                isActive={computerWindow === "AdPlayer"}
                                onClick={() => setComputerWindow("AdPlayer")}
                            />
                            <Tab
                                title={lang === "english" ? "Play game" : "Pelaa peliä"}
                                isActive={computerWindow === "GameOne"}
                                onClick={() => setComputerWindow("GameOne")}
                            />
                            <Tab
                                title={lang === "english" ? "Play another game" : "Pelaa toista peliä"}
                                isActive={computerWindow === "GameTwo"}
                                onClick={() => setComputerWindow("GameTwo")}
                            />
                            <Tab
                                title={lang === "english" ? "Buy VIP ticket" : "Osta VIP-lippu"}
                                href={`${nextConfig.basePath}/exe-instructions${lang === "english" ? "#english" : ""}`}
                                isActive={false}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ height: `${sceneHeight}px` }}
                     className="grid grid-cols-1 grid-rows-1 items-end relative">
                    <div style={{ transform: `translateY(${underTableScroll}px)` }}
                         className="col-start-1 row-start-1 w-full z-0">
                        <ExportedImage alt="Under Table" src={poydanalusImg} basePath={nextConfig.basePath} className="w-full h-auto"/>
                    </div>

                    <div style={{ transform: `translateY(${ratBuyNowScroll}px)` }}
                        className="col-start-1 row-start-1 w-1/2 flex justify-end pointer-events-none z-10 self-end">
                        <ExportedImage src={ratImg} basePath={nextConfig.basePath} alt="Rat" className="max-h-[40vh] w-[40vw] object-contain"/>
                    </div>

                    <div style={{ transform: `translateY(${ratBuyNowScroll}px)` }}
                        className="col-start-1 row-start-1 w-1/2 ml-auto flex justify-start pointer-events-none z-30 self-start">
                        <div className="flex justify-start max-h-[40vh] w-1/2 relative">
                            <a href={KIDE_URL} target="_blank" className="mt-[5vw] pointer-events-auto" data-balloon-spawnable="true">
                                <ExportedImage
                                    src={lang === "english" ? ostaImgEnglish : ostaImg}
                                    basePath={nextConfig.basePath}
                                    alt="Buy now"
                                    className="select-none cursor-pointer max-h-[20vh] w-[30vw] object-contain transition-all duration-500 ease-[linear(0,0.013_0.6%,0.05_1.2%,0.2_2.5%,0.949_6.7%,1.2_8.4%,1.286_9.2%,1.35_10%,1.392_10.8%,1.411_11.6%,1.411_12.2%,1.401_12.8%,1.343_14.2%,1.258_15.5%,1.016_18.7%,0.914_20.4%,0.856_21.9%,0.831_23.5%,0.834_24.7%,0.858_26.1%,0.996_30.7%,1.037_32.4%,1.06_33.9%,1.07_35.4%,1.061_37.7%,0.989_43.8%,0.971_47.2%,1.012_59.1%,0.995_70.8%,1)] hover:scale-x-105 hover:scale-y-105 active:scale-x-110 active:scale-y-95"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Scene>
    )
}
