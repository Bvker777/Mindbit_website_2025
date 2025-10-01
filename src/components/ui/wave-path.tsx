'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

type WWavePathProps = React.ComponentProps<'div'> & {
	animateOnScroll?: boolean;
	animationDuration?: number;
	animationDelay?: number;
};

export function WavePath({ 
	className, 
	animateOnScroll = false,
	animationDuration = 2000,
	animationDelay = 0,
	...props 
}: WWavePathProps) {
	const path = useRef<SVGPathElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(containerRef, { once: true, margin: "-50px" });
	const [pathLength, setPathLength] = useState(0);
	let progress = 0;
	let x = 0.2;
	let time = Math.PI / 2;
	let reqId: number | null = null;

	useEffect(() => {
		setPath(0);
		
		// Get the path length for stroke animation
		if (path.current && animateOnScroll) {
			const length = path.current.getTotalLength();
			setPathLength(length);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Trigger drawing animation when in view
	useEffect(() => {
		if (animateOnScroll && isInView && path.current && pathLength > 0) {
			// Set initial state - path is completely hidden
			path.current.style.strokeDasharray = `${pathLength}`;
			path.current.style.strokeDashoffset = `${pathLength}`;
			path.current.style.opacity = '1';
			
			// Start animation after delay
			setTimeout(() => {
				if (path.current) {
					path.current.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out`;
					path.current.style.strokeDashoffset = '0';
				}
			}, animationDelay);
		}
	}, [isInView, pathLength, animateOnScroll, animationDuration, animationDelay]);

	const setPath = (progress: number) => {
		const width = window.innerWidth * 0.7;
		if (path.current) {
			path.current.setAttributeNS(
				null,
				'd',
				`M0 100 Q${width * x} ${100 + progress * 0.6}, ${width} 100`,
			);
		}
	};

	const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

	const manageMouseEnter = () => {
		if (reqId) {
			cancelAnimationFrame(reqId);
			resetAnimation();
		}
	};

	const manageMouseMove = (e: React.MouseEvent) => {
		const { movementY, clientX } = e;
		if (path.current) {
			const pathBound = path.current.getBoundingClientRect();
			x = (clientX - pathBound.left) / pathBound.width;
			progress += movementY;
			setPath(progress);
		}
	};

	const manageMouseLeave = () => {
		animateOut();
	};

	const animateOut = () => {
		const newProgress = progress * Math.sin(time);
		progress = lerp(progress, 0, 0.025);
		time += 0.2;
		setPath(newProgress);
		if (Math.abs(progress) > 0.75) {
			reqId = requestAnimationFrame(animateOut);
		} else {
			resetAnimation();
		}
	};

	const resetAnimation = () => {
		time = Math.PI / 2;
		progress = 0;
	};

	return (
		<div ref={containerRef} className={cn('relative h-px w-[70vw]', className)} {...props}>
			<div
				onMouseEnter={manageMouseEnter}
				onMouseMove={manageMouseMove}
				onMouseLeave={manageMouseLeave}
				className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
			/>
			<svg className="absolute -top-[113px] h-[300px] w-full">
				<path 
					ref={path} 
					className="fill-none stroke-current" 
					strokeWidth={1}
					style={{
						opacity: animateOnScroll && !isInView ? 0 : 1,
						strokeDasharray: animateOnScroll && !isInView ? 'none' : undefined,
						strokeDashoffset: animateOnScroll && !isInView ? 'none' : undefined
					}}
				/>
			</svg>
		</div>
	);
}
