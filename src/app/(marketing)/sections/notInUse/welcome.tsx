'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { BrandLogo } from '@/components/logo/BrandLogo';
import { Button } from '@/components/ui/core/Button';
import { ArrowRight, Film } from 'lucide-react';
import { useEarlyAdoptersStore } from '@/store/early-adopters-store';

export const Welcome = () => {
	const openModal = useEarlyAdoptersStore(state => state.openModal);
	const isModalOpen = useEarlyAdoptersStore(state => state.isModalOpen);

	// Debug logs
	console.log('Welcome - openModal function:', openModal);
	console.log('Welcome - isModalOpen:', isModalOpen);

	const handleGetEarlyAccess = useCallback(() => {
		console.log('Get early access button clicked!');
		console.log('About to call openModal...');
		openModal();
		console.log('openModal called');
	}, [openModal]);

	return (
		<div className="bg-transparent mt-28 pb-0 px-0">
			<div className="grid grid-cols-12 gap-16 mb-24">
				<div className="col-span-3">
					<div className="relative">
						{/* <Image
            src="/images/Welcome/hr.svg"
            alt="App screenshot"
            fill
            className="object-contain opacity-75"
          /> */}
						{/* <BrandLogo
            variant="icon"
            size="xl"
            className="absolute left-[32%] top-[20%] z-20 -translate-x-[35px] w-[70px] h-[62px]"
          /> */}
					</div>
				</div>
				<div className="col-span-7 pt-16 space-y-8">
					{/* <Badge variant="secondary-light">Crafted for humans. Powered by AI.</Badge> */}
					{/* <h1 className="text-7xl font-bold text-neutral-950 tracking-tight">
            An original Performance Management app
          </h1> */}
					<h2 className="text-xl text-neutral-600 font-normal">
						{/* JustScore: Act Differently
(A tribute to you — the one who leads, not just manages) */}
						<p className="text-4xl font-bold text-foreground-strong tracking-tight mb-4">
							Here’s to you —
						</p>
						the one buried in boxes to tick,
						<br />
						forms to fill,
						<br />
						templates crafted by someone who’s never met your team.
						<br />
						<br />
						You juggle calendars and dance through meetings,
						<br />
						only to drown in reviews
						<br />
						written not with truth,
						<br />
						but with fading memory.
						<br />
						<br />
						You’re asked to track what’s done,
						<br />
						not what’s possible.
						<br />
						To complete the ritual,
						<br />
						not coach the person.
						<br />
						<br />
						You mean well.
						<br />
						You care.
						<br />
						But the system keeps you stuck.
						<br />
						<br />
						And then —<br />
						you begin to see it.
						<br />
						<br />
						You realise that leadership isn’t chores.
						<br />
						It’s clarity.
						<br />
						It’s not once a year —<br />
						it’s right now.
						<br />
						Again and again.
						<br />
						<br />
						You stop waiting for HR’s timing.
						<br />
						You stop pretending forms equal fairness.
						<br />
						<br />
						You lead in real time.
						<br />
						You see clearly.
						<br />
						You guide intentionally.
						<br />
						<br />
						No templates.
						<br />
						No admin maze.
						<br />
						No facade.
						<br />
						JustScore.
						<br />
						<br />
						Others might doubt you.
						<br />
						They’ll say, “That’s not how we’ve always done it.”
						<br />
						They’ll cling to comfort.
						<br />
						But you’re not here for comfort.
						<br />
						You’re here for growth.
						<br />
						<br />
						Because now,
						<br />
						you’re not just managing tasks.
						<br />
						You’re shaping futures.
						<br />
						Growing people.
						<br />
						Unlocking potential — one check-in, one insight, one act of care at
						a time.
						<br />
						<br />
						While others sit still,
						<br />
						you move.
						<br />
						While others measure work,
						<br />
						you build trust.
						<br />
						While others review,
						<br />
						you lead.
						<br />
						<br />
						Here’s to you —<br />
						the one who acts differently.
						<br />
						Who turns performance into progress.
						<br />
						Who dares to believe
						<br />
						that greatness isn’t annual —<br />
						it’s everyday.
						<br />
						<br />
						Because when you stop managing
						<br />
						and start scoring,
						<br />
						you become more than a manager.
						<br />
						<br />
						<span className="text-6xl font-bold text-foreground-strong tracking-tight">
							You become a leader.
						</span>
						<br />
						<br />
						And leaders?
						<br />
						You already know —<br />
						they change everything.
						<br />
					</h2>
					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 pt-4">
						<Button
							size="xl"
							variant="primary"
							className="btn-rounded w-full sm:w-auto cursor-pointer"
							onClick={handleGetEarlyAccess}
						>
							Get early access
							<ArrowRight />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
