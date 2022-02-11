import React, {useCallback, useEffect, useRef, useState} from "react";

import Canvas from "../Canvas";
import {WaterAnimation2d} from "water-animation-2d";
import { throttle } from "throttle-debounce";


export type TControl = {
    setWaterAnimation: React.Dispatch<React.SetStateAction<WaterAnimation2d | null>>
}

export type WaterAnimationProps = {
    className?: string,
    control?: TControl,
    upperColor?: string,
    bottomColor?: string,
    deltaTime?: number,
    surfaceTension?: number,
    surfaceDensity?: number,
    surfaceToughness?: number,
    surfaceActivity?: number,
    surfaceMinSpaceBetween?: number,
    surfaceSmoothness?: number,
    fullWidth?: boolean,
}

const WaterAnimation: React.FC<WaterAnimationProps> = (
    {
        className,
        control,
        upperColor,
        bottomColor,
        deltaTime,
        surfaceTension,
        surfaceDensity,
        surfaceToughness,
        surfaceActivity,
        surfaceMinSpaceBetween,
        surfaceSmoothness,
        fullWidth,
    }
) => {
    const [waterAnimation, setWaterAnimation] = useState<WaterAnimation2d | null>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const resetWaterAnimation = useCallback((node: HTMLCanvasElement | null) => {
        if (node) {
            const newWaterAnimation = new WaterAnimation2d(node);
            const callback = (prev: WaterAnimation2d | null) => {
                if (prev) {
                    prev.stop();
                }
                return newWaterAnimation;
            }
            setWaterAnimation(callback)
            if (control) control.setWaterAnimation(callback);
        }
    }, []);

    useEffect(() => {
        if (waterAnimation) {
            waterAnimation.run();
            console.log(waterAnimation);
        }
    }, [
        waterAnimation
    ])

    useEffect(() => {
        if (waterAnimation) {
            if (waterAnimation.upperColor !== upperColor && upperColor)
                waterAnimation.upperColor = upperColor;

            if (waterAnimation.bottomColor !== bottomColor && bottomColor)
                waterAnimation.bottomColor = bottomColor;

            if (waterAnimation.deltaTime !== deltaTime && deltaTime)
                waterAnimation.deltaTime = deltaTime;

            if (waterAnimation.surfaceTension !== surfaceTension && surfaceTension)
                waterAnimation.surfaceTension = surfaceTension;

            if (waterAnimation.surfaceDensity !== surfaceDensity && surfaceDensity)
                waterAnimation.surfaceDensity = surfaceDensity;

            if (waterAnimation.surfaceToughness !== surfaceToughness && surfaceToughness)
                waterAnimation.surfaceToughness = surfaceToughness;

            if (waterAnimation.surfaceActivity !== surfaceActivity && surfaceActivity)
                waterAnimation.surfaceActivity = surfaceActivity;

            if (waterAnimation.surfaceMinSpaceBetween !== surfaceMinSpaceBetween && surfaceMinSpaceBetween)
                waterAnimation.surfaceMinSpaceBetween = surfaceMinSpaceBetween;

            if (waterAnimation.surfaceSmoothness !== surfaceSmoothness && surfaceSmoothness)
                waterAnimation.surfaceSmoothness = surfaceSmoothness;
        }
    }, [
        waterAnimation,
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

    const onRefChange = useCallback((node) => {
        if (node !== canvasRef.current) { // check if canvas changed
            resetWaterAnimation(node);
        }
        canvasRef.current = node;
    }, []);

    const onResize = useCallback(throttle(200, () => {
        resetWaterAnimation(canvasRef.current);
    }), [])

    return <Canvas
        ref={onRefChange}
        className={className}
        autoFit
        onResize={onResize}
        style={{
            ...(fullWidth && {
                width: "100%",
            })
        }}
    />
}

export default WaterAnimation