'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { BrandLogo } from '@/components/logo/BrandLogo';
import { Button } from '@/components/ui/core/Button';
import { ArrowRight, Film } from 'lucide-react';

export const Hero = () => {
	return (
		<div className="bg-transparent mt-20 pb-0 px-0">
			<div className="grid grid-cols-12 gap-16 mb-24">
				<div className="col-start-4 col-span-6 pt-16 space-y-8 text-center">
					{/* <Badge variant="secondary-light">Crafted for humans. Powered by AI.</Badge> */}
					<h1 className="text-7xl font-bold text-neutral-950 tracking-tight">
						An original Performance Management app
					</h1>
					<h2 className="text-xl max-w-md text-neutral-600 font-medium mx-auto">
						used by people managers that don&apos;t have time to waste on data
						entry applications.
					</h2>
					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
						<Button
							size="xl"
							variant="primary"
							className="btn-rounded w-full sm:w-auto"
						>
							I want to try it
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>

						<Button size="xl" className="btn-rounded w-full sm:w-auto">
							<Film className="mr-2 h-5 w-5" />
							Show me a short demo
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
