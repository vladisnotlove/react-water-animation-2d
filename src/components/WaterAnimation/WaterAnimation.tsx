import React, {useEffect, useRef, useState} from "react";

// Components

// Stores, utils, libs
import { WaterAnimation2d } from "water-animation-2d";

// CSS

type WaterAnimationProps = {
    className?: string,
    upperColor?: string,
    bottomColor?: string,
    deltaTime?: number,
    surfaceTension?: number,
    surfaceDensity?: number,
    surfaceToughness?: number,
    surfaceActivity?: number,
    surfaceMinSpaceBetween?: number,
    surfaceSmoothness?: number,
    autoFit?: boolean,
}

const WaterAnimation: React.FC<WaterAnimationProps> = (
    {
        className,
        upperColor,
        bottomColor,
        deltaTime,
        surfaceTension,
        surfaceDensity,
        surfaceToughness,
        surfaceActivity,
        surfaceMinSpaceBetween,
        surfaceSmoothness,
        autoFit,
    }
) => {
    const waterAnimRef = useRef<WaterAnimation2d | null>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        if (waterAnimRef.current) {
            waterAnimRef.current.stop();
        }
        waterAnimRef.current = new WaterAnimation2d(canvas);
    }, [canvas]);

    useEffect(() => {
        if (!waterAnimRef.current) return;
        if (autoFit) {
            waterAnimRef.current.beforeUpdate = () => {
                canvasRef.current.width = canvasRef.current.clientWidth;
                canvasRef.current.height = canvasRef.current.clientHeight;
            }
        }
        else {
            waterAnimRef.current.beforeUpdate = undefined;
        }
    }, [autoFit])

    useEffect(() => {
        if (waterAnimRef.current) {
            const waterAnim = waterAnimRef.current;

            if (waterAnim.upperColor !== upperColor)
                waterAnim.upperColor = upperColor;

            if (waterAnim.bottomColor !== bottomColor)
                waterAnim.bottomColor = bottomColor;

            if (waterAnim.deltaTime !== deltaTime)
                waterAnim.deltaTime = deltaTime;

            if (waterAnim.surfaceTension !== surfaceTension)
                waterAnim.surfaceTension = surfaceTension;

            if (waterAnim.surfaceDensity !== surfaceDensity)
                waterAnim.surfaceDensity = surfaceDensity;

            if (waterAnim.surfaceToughness !== surfaceToughness)
                waterAnim.surfaceToughness = surfaceToughness;

            if (waterAnim.surfaceActivity !== surfaceActivity)
                waterAnim.surfaceActivity = surfaceActivity;

            if (waterAnim.surfaceMinSpaceBetween !== surfaceMinSpaceBetween)
                waterAnim.surfaceMinSpaceBetween = surfaceMinSpaceBetween;

            if (waterAnim.surfaceSmoothness !== surfaceSmoothness)
                waterAnim.surfaceSmoothness = surfaceSmoothness;
        }
    }, [
        upperColor,
        bottomColor,
        deltaTime,
        surfaceTension,
        surfaceDensity,
        surfaceToughness,
        surfaceActivity,
        surfaceMinSpaceBetween,
        surfaceSmoothness,
    ]);

    return <canvas
        ref={(node) => {
            setCanvas(node);
            canvasRef.current = node;
        }}
        className={className}
    />
}

export default WaterAnimation