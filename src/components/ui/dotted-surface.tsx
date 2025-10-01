'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		console.log('DottedSurface: Initializing Three.js scene');
		
		// Store container reference for cleanup
		const container = containerRef.current;

		// Get container dimensions
		const rect = container.getBoundingClientRect();
		const containerWidth = rect.width || window.innerWidth;
		const containerHeight = rect.height || window.innerHeight;

		const SEPARATION = 100; // Reduced for better visibility in smaller container
		const AMOUNTX = 25; // Reduced particle count for better performance
		const AMOUNTY = 35;

		// Scene setup
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x000000, 1000, 5000); // Adjusted fog for closer view

		const camera = new THREE.PerspectiveCamera(
			75,
			containerWidth / containerHeight,
			1,
			10000,
		);
		camera.position.set(0, 200, 800); // Moved camera closer

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(containerWidth, containerHeight);
		renderer.setClearColor(0x000000, 0); // Transparent background

		// Style the canvas to fit the container
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.top = '0';
		renderer.domElement.style.left = '0';
		renderer.domElement.style.width = '100%';
		renderer.domElement.style.height = '100%';

		container.appendChild(renderer.domElement);
		console.log('DottedSurface: Canvas added to container', { containerWidth, containerHeight });

		// Create particles
		const positions: number[] = [];
		const colors: number[] = [];

		// Create geometry for all particles
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0; // Will be animated
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions.push(x, y, z);
				// Fixed to white color for dark theme only
				colors.push(1, 1, 1); // Changed to normalized RGB values (0-1)
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		// Create material
		const material = new THREE.PointsMaterial({
			color: 0xffffff, // White color
			size: 6,
			transparent: true,
			opacity: .7, // Increased opacity for better visibility
			sizeAttenuation: true,
		});

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let animationId: number;

		// Animation function
		const animate = (): void => {
			const positionAttribute = geometry.attributes.position;
			const positions = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;

					// Animate Y position with sine waves
					positions[index + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;

					i++;
				}
			}

			positionAttribute.needsUpdate = true;

			// Update point sizes based on wave
			// For dynamic size changes, we'd need a custom shader
			// For now, keeping constant size for performance

			renderer.render(scene, camera);
			count += 0.1;

			// Continue animation
			animationId = requestAnimationFrame(animate);
		};

		// Handle window resize
		const handleResize = () => {
			const newRect = container.getBoundingClientRect();
			const newWidth = newRect.width || window.innerWidth;
			const newHeight = newRect.height || window.innerHeight;
			
			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(newWidth, newHeight);
		};

		window.addEventListener('resize', handleResize);

		// Start animation
		animationId = requestAnimationFrame(animate);

		// Store references
		sceneRef.current = {
			scene,
			camera,
			renderer,
			particles: [points],
			animationId,
			count,
		};

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);

			if (sceneRef.current && animationId) {
				cancelAnimationFrame(animationId);

				// Get DOM element before disposal
				const domElement = sceneRef.current.renderer.domElement;

				// Clean up Three.js objects
				sceneRef.current.scene.traverse((object) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
						if (Array.isArray(object.material)) {
							object.material.forEach((material) => material.dispose());
						} else {
							object.material.dispose();
						}
					}
				});

				sceneRef.current.renderer.dispose();

				// Remove DOM element using stored container reference
				if (container && domElement && container.contains(domElement)) {
					container.removeChild(domElement);
				}
			}
		};
	}, []); // Removed theme dependency since we're using only dark theme

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none absolute inset-0 z-0', className)}
			{...props}
		/>
	);
}
