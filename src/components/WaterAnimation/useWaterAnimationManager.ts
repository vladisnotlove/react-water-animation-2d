import {useMemo, useRef, useState} from "react";
import {TVector, WaterAnimation2d} from "water-animation-2d";
import {TControl} from "./WaterAnimation";

type TWaterAnimationManager = {
	applyForce: (x: number, force: TVector, milliseconds: number) => void,
	isUnderSurface: (x: number, y: number) => boolean | undefined
}

export const useWaterAnimationManager = () => {
	const [waterAnimation, setWaterAnimation] = useState<WaterAnimation2d | null>(null);
	const waterAnimationRef = useRef<WaterAnimation2d | null>(null);
	waterAnimationRef.current = waterAnimation;

	const control: TControl = {
		setWaterAnimation: setWaterAnimation
	}

	const waterAnimationManager = useMemo<TWaterAnimationManager | null>(() => {
		if (!waterAnimation) return null;
		return {
			applyForce: (x, force, milliseconds) => {
				const id = waterAnimationRef.current?.applyForce(x, force);
				if (id) {
					setTimeout(() => {
						if (waterAnimation === waterAnimationRef.current) {
							waterAnimationRef.current?.cancelForce(id);
						}
					}, milliseconds)
				}
			},
			isUnderSurface: (x, y) => {
				return waterAnimationRef.current?.isUnderSurface(x, y);
			}
		}
	}, [
		waterAnimation
	])

	return {
		control,
		waterAnimationManager,
	}
}