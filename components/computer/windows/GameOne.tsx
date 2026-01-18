// @ts-ignore
import nextConfig from "@/next.config";

export default function GameOne() {
    return (
        <iframe className="w-[400%] h-[400%] border-black border-2" style={{transform: 'scale(0.25)', transformOrigin: "0 0"}} src={`${nextConfig.basePath}/assets/games/Blade%20of%20Työsoppari.html`} title="Blade of Työsoppari"></iframe>
    )
}