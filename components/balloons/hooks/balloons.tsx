import {useEffect, useRef} from "react";
import {Balloon} from "@/components/balloons/Balloon";

export default function useBalloons() {
    const balloonsRef = useRef<Balloon[]>([]);

    useEffect(() => {
        let last = performance.now();
        let lastRequestId: number;

        function tick(now: number) {
            const dt = (now - last) / 1000;
            last = now;

            const balloons = balloonsRef.current;

            const wind = (balloon: Balloon) => ({
                dx: Math.sin(now / 2000) * 0.005,
                dy: Math.abs(balloon.vy) * -0.0001 * Math.random() - 0.8
            });

            for (let i = balloons.length - 1; i >= 0; i--) {
                const balloon = balloons[i];
                const { dx, dy } = wind(balloon);
                balloon.applyImpulse(dx, dy)
                balloon.tick(dt);
            }

            balloonsRef.current = balloons;
            lastRequestId = requestAnimationFrame(tick);
        }

        lastRequestId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(lastRequestId);
    }, []);

    return balloonsRef;
}