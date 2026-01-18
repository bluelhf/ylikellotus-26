"use client";

import { Scene } from "./Scene";
import {KIDE_URL} from "@/app/constants";
import ExportedImage from 'next-image-export-optimizer'
import poytaImg from '@/public/assets/wide/pöytä.png'
import useLanguage from "@/components/hooks/language";
// @ts-ignore
import nextConfig from "@/next.config";

export default function TableScene() {
    const { lang, toggleLanguage } = useLanguage();

    const FinnishText = () => (
        <>
            Hei,<br /><br />
            Pahoittelut edellisestä viestistä. Työntekijä on nyt saanut ohjeistuksen käyttäytyä asiallisesti. Viestin tarkoituksena oli kutsua teidät Tietokillan neljäkymmentävuotisjuhliin Servin mökkiin Otaniemeen tänä helmikuun yhdentenätoista päivänä vuotta 2026. Saavuttehan paikalle viimeistään klo 20.00.
            <br /><br />
            {typeof KIDE_URL !== 'undefined'
                ? <>Lippu: Saatavilla <a className="text-blue-600 inline-block -m-2 p-2" href={KIDE_URL}>Kide.app</a>-sivulta.<br /></>
                : <>Lippu saatavilla pian!<br /><br /></>}
            Teema: Byrokratia<br />
            Pukukoodi: Haalarit ja Business Casual<br />
            Paikka: Servin mökki, Otaniemi, Espoo.<br />
            Aika: 11.2.2026 klo 19.00–02.00<br />
            <br />
            Ystävällisin terveisin,<br />
            Tietokillan HR-tiimi
        </>
    );

    const EnglishText = () => (
        <>
            Hello,<br /><br />
            Apologies for the previous unprofessional message. The employee has now been instructed to conduct themselves properly. The purpose of the message was to invite you to Tietokilta's 40th anniversary celebrations at Servin Mökki in Otaniemi on February 11th, 2026. Please arrive by 20:00 at the latest.
            <br /><br />
            {typeof KIDE_URL !== 'undefined'
                ? <>Tickets: Available at <a className="text-blue-600 inline-block -m-2 p-2" href={KIDE_URL}>Kide.app</a>.<br /></>
                : <>Tickets available soon!<br /><br /></>}
            Theme: Bureaucracy<br />
            Dress code: Overalls and Business Casual<br />
            Location: Smökki, Otaniemi, Espoo.<br />
            Time: 11.2.2026 from 19:00 to 02:00<br />
            <br />
            Best regards,<br />
            Tietokilta HR Team
        </>
    );

    return (
        <Scene className="translate-y-[-5dvw] h-full">
            { /* TODO: ensure this translateY is correct; it should prevent a blank space between the office and table scenes, even on ultrawide aspect ratios */}
            <div className="relative scene-body translate-x-[-50%] left-[50%]">
                <div data-balloon-spawnable="false" className="absolute left-[59%] top-[15%] w-[16.5%] h-[30%] origin-top-left rotate-[20deg]" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 42.5%, 14.1% 37.2%, 0% 23%)", containerType: "inline-size" }}>
                    <p className={`text-[4.6cqw] md:text-[4.8cqw] text-justify font-serif`}>
                        {lang === "english" ? <EnglishText /> : <FinnishText />}<br/>
                        <span data-balloon-spawnable="true" className="absolute bottom-0 cursor-pointer text-blue-500 underline select-none pointer-events-auto" onClick={toggleLanguage}>
                        {lang === "english" ? "Käännä suomeksi" : "Switch to English"}
                    </span>
                    </p>
                </div>
                <ExportedImage alt="Table" src={poytaImg} className="w-full h-auto" basePath={nextConfig.basePath} />
            </div>
        </Scene>
    )
}
