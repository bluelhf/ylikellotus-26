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
import useBreakpoint from "@/components/hooks/breakpoint";
import useLanguage from "@/components/hooks/language";
// @ts-ignore
import nextConfig from "@/next.config";

export type WindowKey = "AdPlayer" | "GameOne" | "GameTwo";

const windowIndex: Record<WindowKey, React.FC> = {
    "AdPlayer": AdPlayer,
    "GameOne": GameOne,
    "GameTwo": GameTwo
}

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
                    <div className="absolute left-[37.3%] top-[6.5%] w-[25.7%] h-[40.9%]" data-balloon-spawnable="false">
                        {React.createElement(windowIndex[computerWindow])}
                    </div>
                </div>
                <div
                    title="Katso mainosvideo" data-balloon-spawnable="false"
                    className="absolute left-[37.25%] top-[2.5%] w-[5.5%] h-[2.5%] translate-y-[-15%] cursor-pointer flex flex-col justify-center"
                    onClick={() => setComputerWindow("AdPlayer")}>
                </div>
                <div
                    title="Pelaa peliä" data-balloon-spawnable="false"
                    className="absolute left-[42.75%] top-[2.5%] w-[5.5%] h-[2.5%] translate-y-[-15%] cursor-pointer flex flex-col justify-center"
                    onClick={() => setComputerWindow("GameOne")}>
                </div>
                <div
                    title="Pelaa toista peliä" data-balloon-spawnable="false"
                    className="absolute left-[48.25%] top-[2.5%] w-[5.5%] h-[2.5%] translate-y-[-15%] cursor-pointer flex flex-col justify-center"
                    onClick={() => setComputerWindow("GameTwo")}>
                </div>
                <a
                    title="Osta VIP-lippu" data-balloon-spawnable="false"
                    className="absolute left-[53.75%] top-[2.5%] w-[6%] h-[2.5%] translate-y-[-15%] cursor-pointer flex flex-col justify-center"
                    href={`/exe-instructions${lang === "english" ? "#english" : ""}`}>
                </a>
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
