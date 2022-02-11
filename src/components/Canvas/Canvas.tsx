import React, {useCallback, useRef} from "react";
import useResizeObserver from "use-resize-observer";


type CanvasProps = React.HTMLAttributes<HTMLCanvasElement> & {
    autoFit?: boolean,
	onResize?: () => void,
}


const Canvas = React.forwardRef<HTMLCanvasElement, CanvasProps>((
    {
		autoFit,
		onResize,
		...props
    },
	ref
) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const {ref: resizeObserverRef} = useResizeObserver({
		onResize: () => {
			if (autoFit && canvasRef.current) {
				canvasRef.current.width = canvasRef.current.clientWidth;
				canvasRef.current.height = canvasRef.current.clientHeight;
			}
			if (onResize) onResize();
		}
	})

	const onRefChanged = useCallback(node => {
		// set ref
		if (ref) {
			if (typeof ref === "function") {
				ref(node);
			}
			else {
				ref.current = node;
			}
		}

		// set canvasRef
		canvasRef.current = node;

		// set ref for resize observer
		resizeObserverRef(node);
	}, [])

    return <canvas
		ref={onRefChanged}
		{...props}
	/>
})

export default Canvas