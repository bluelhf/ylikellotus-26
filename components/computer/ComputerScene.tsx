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
import tabMarkerImg from '@/public/assets/tabmarkerF1.png'
import useBreakpoint from "@/components/hooks/breakpoint";
import useLanguage from "@/components/hooks/language";
import {useBalloonsContext} from "@/components/balloons/BalloonContext";
// @ts-ignore
import nextConfig from "@/next.config";

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
        setScrollProgress(window.pageYOffset);
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const [yTop, setYTop] = useState(0);
    const hasMdBreakpoint = useBreakpoint("md");
    const { lang } = useLanguage();
    return (
        <Scene className="col-start-1 row-start-1">
            <div className="relative scene-body-xl translate-x-[-50%] left-[50%] ">
                <div className="@container relative grid place-items-center">
                    <ExportedImage ref={(el) => {if (el) setYTop(el.offsetTop + el.clientTop)}}
                        alt="Computer" src={lang === "english" ? koneImgEnglish : koneImg} className="w-full h-auto relative -z-10" basePath={nextConfig.basePath}/>
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
                <div style={{
                    /* TODO: Use top instead of marginTop */
                    marginTop: `calc(${(scrollProgress - yTop) * -0.2}px + ${hasMdBreakpoint ? 12 : 7}%)`
                }} className="scene-body w-auto h-auto relative -z-20">
                    <ExportedImage alt="Under Table" src={poydanalusImg} basePath={nextConfig.basePath}/>
                </div>
            </div>
        </Scene>
    )
}
