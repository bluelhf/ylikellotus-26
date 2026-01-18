'use client';

import { Scene } from "./Scene";
import {KIDE_URL} from "@/app/constants";
import ExportedImage from 'next-image-export-optimizer'
import ratImg from '@/public/assets/rat.png'
import ostaImg from '@/public/assets/osta.png'
import ostaImgEnglish from '@/public/assets/ostaF1_enkku.png'
import useLanguage from "@/components/hooks/language";
// @ts-ignore
import nextConfig from "@/next.config";

export default function RatScene() {
    const { lang } = useLanguage();
    return (
        <Scene className="h-fit overflow-visible col-start-1 row-start-1 flex justify-end flex-col ">
            <div className="relative overflow-visible">
                <div className="flex justify-center w-full">
                    <ExportedImage
                        src={ratImg} basePath={nextConfig.basePath}
                        alt="Rat"
                        className="max-h-[40vh] w-[40vw] object-contain" />
                    <a href={KIDE_URL} target="_blank" className="mt-[5vw]" data-balloon-spawnable="false">
                        <ExportedImage
                            src={lang === "english" ? ostaImgEnglish : ostaImg} basePath={nextConfig.basePath}
                            alt="Buy now"
                            className="select-none cursor-pointer max-h-[20vh] w-[30vw] object-contain transition-all duration-500 ease-[linear(0,0.013_0.6%,0.05_1.2%,0.2_2.5%,0.949_6.7%,1.2_8.4%,1.286_9.2%,1.35_10%,1.392_10.8%,1.411_11.6%,1.411_12.2%,1.401_12.8%,1.343_14.2%,1.258_15.5%,1.016_18.7%,0.914_20.4%,0.856_21.9%,0.831_23.5%,0.834_24.7%,0.858_26.1%,0.996_30.7%,1.037_32.4%,1.06_33.9%,1.07_35.4%,1.061_37.7%,0.989_43.8%,0.971_47.2%,1.012_59.1%,0.995_70.8%,1)] hover:scale-x-105 hover:scale-y-105 active:scale-x-110 active:scale-y-95" />
                    </a>
                </div>
            </div>
        </Scene>
    )
}
