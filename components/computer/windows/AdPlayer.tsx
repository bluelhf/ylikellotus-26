import {VIDEO_DATA} from "@/app/constants";
import ExportedImage from 'next-image-export-optimizer'
import ratTubeImg from '@/public/assets/rat tubeF2.png'
// @ts-ignore
import nextConfig from "@/next.config";

export default function AdPlayer() {
    return (
        <>
            <ExportedImage alt="Rat Tube" src={ratTubeImg} className="w-[100%] h-[99.5%] border-2 border-black" basePath={nextConfig.basePath}/>
            {(() => {
                const classes = "absolute xl:w-[69%] xl:max-w-[69%] xl:scale-100 left-[1.4%] top-[15%] origin-top-left w-[138%] !max-w-[138%] bg-black aspect-video scale-50";
                const data = VIDEO_DATA;
                switch (data.type) {
                    case "embed": return <iframe src={data.url} className={classes} allow="autoplay; fullscreen" allowFullScreen={true} title="Rat Tube"></iframe>
                    case "file": return <video src={data.url} className={classes} controls={true} autoPlay={false} playsInline={true} preload="none"></video>
                }
            })()}
        </>
    )
}
