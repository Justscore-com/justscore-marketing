import React from 'react';
import Image from 'next/image';
import { Star, Sun, Moon, Smartphone } from 'lucide-react';

export function Meet() {
	return (
		<section
			className="w-full py-8 md:py-12 px-4 lg:px-8 bg-white"
			aria-labelledby="meet-justscore-heading"
		>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<header className="text-center lg:mb-16 max-w-3xl mx-auto">
					<h2 id="meet-justscore-heading" className="marketing-h1 mb-6">
						Meet JustScore
					</h2>
					<div className="max-w-lg mx-auto space-y-6 pb-10 lg:pb-6">
						<p className="marketing-body-lg">
							JustScore gives you a smarter way to capture and track performance
							in real time — without slowing down your day.
						</p>
						<p className="marketing-body-sm max-w-xs md:max-w-sm mx-auto">
							In seconds, you can score wins, flag concerns, view patterns and
							support your people with confidence.
						</p>
					</div>
				</header>

				{/* Mobile and Tablet Layout (SM to MD) */}
				<div className="block lg:hidden">
					{/* Mobile Layout (SM) */}
					<div className="block md:hidden space-y-4">
						{/* First: handlinPhone block */}
						<div className="bg-gradient-to-r from-secondary-200 via-secondary-400 to-secondary-200 rounded-3xl p-6 relative h-36 mt-8">
							<div className="sr-only">
								<h3>JustScore Mobile Experience</h3>
								<p>
									Illustration showing JustScore&apos;s mobile interface design
								</p>
							</div>
							<Image
								src="/images/illustrations/handlinPhone.svg"
								alt="Illustration of hands holding a smartphone displaying JustScore's mobile interface"
								width={400}
								height={400}
								className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
							/>
						</div>

						{/* Second: Mobile and Desktop block */}
						<div className="bg-gradient-to-br from-secondary-200 via-secondary-400 to-secondary-200 rounded-3xl p-6 relative h-64">
							<div className="flex flex-col h-full">
								<h3 className="block marketing-h3 text-secondary-950">
									Mobile and Desktop
								</h3>
								<p className="block marketing-body-lg text-secondary-900 mt-2">
									Two optimised experiences.
								</p>
							</div>
							<Image
								src="/images/various/desktop.png"
								alt="JustScore desktop application interface showing performance management dashboard"
								width={490}
								height={490}
								className="absolute bottom-0 right-0"
							/>
						</div>

						{/* Third: 90% Statistics block */}
						<div className="bg-gradient-to-br from-tertiary-200 to-secondary-400 rounded-3xl p-6 pt-4 flex flex-col justify-between">
							<div>
								<div className="flex items-baseline gap-1 mb-1">
									<span
										className="marketing-display text-tertiary-950"
										aria-label="90 percent"
									>
										90
									</span>
									<span className="marketing-h4 ml-px text-tertiary-950">
										%
									</span>
								</div>
								<p className="marketing-body-lg text-tertiary-900 mt-1">
									of Managers feel unprepared to give effective feedback.
								</p>
								<cite className="marketing-body-xs text-tertiary-800 mt-2 block not-italic">
									Harvard Business Review
								</cite>
							</div>
						</div>

						{/* Fourth: 75% Statistics block */}
						<div className="bg-gradient-to-tl from-tertiary-200 via-secondary-300 to-secondary-200 rounded-3xl p-6 pt-4 flex flex-col justify-between">
							<div>
								<div className="flex items-baseline gap-1 mb-1">
									<span
										className="marketing-display text-secondary-950"
										aria-label="75 percent"
									>
										75
									</span>
									<span className="marketing-h4 ml-px text-secondary-950">
										%
									</span>
								</div>
								<p className="marketing-body-lg text-secondary-900 mt-1">
									of organisations say managers fail to measure value beyond
									basic metrics—costing millions in lost potential.
								</p>
								<cite className="marketing-body-xs text-secondary-800 mt-2 block not-italic">
									Deloitte, 2025
								</cite>
							</div>
						</div>

						{/* Fifth: Two columns - Designed by Managers and Powered by AI */}
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-gradient-to-tr from-secondary-400 to-secondary-200 rounded-3xl p-6">
								<div className="flex flex-col h-full">
									<h3 className="marketing-h6 text-secondary-950">
										Designed by Managers
									</h3>
									<p className="marketing-body-sm text-secondary-900 mt-1.5 max-w-sm">
										We handedly crafted the experience to be simple, enjoyable,
										and accessible.
									</p>
								</div>
							</div>
							<div className="bg-gradient-to-tr from-secondary-300 via-secondary-200 via-20% to-tertiary-200 to-95% rounded-3xl p-6">
								<div className="flex flex-col h-full">
									<h3 className="marketing-h6 text-secondary-950">
										Powered by AI
									</h3>
									<p className="marketing-body-sm text-tertiary-900 mt-1.5 max-w-sm">
										A super brain at your disposal to deliver all the needed
										insights and outcomes.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Tablet Layout (MD) */}
					<div className="hidden md:block space-y-4">
						{/* First row: 3-column grid with first three blocks */}
						<div className="grid grid-cols-3 gap-4">
							{/* First: handlinPhone block - spans 2 columns */}
							<div className="col-span-2 bg-gradient-to-br from-secondary-400 to-secondary-200 rounded-3xl p-6 relative h-56">
								<div className="sr-only">
									<h3>JustScore Mobile Experience</h3>
									<p>
										Illustration showing JustScore&apos;s mobile interface
										design
									</p>
								</div>
								<Image
									src="/images/illustrations/handlinPhone.svg"
									alt="Illustration of hands holding a smartphone displaying JustScore's mobile interface"
									width={400}
									height={400}
									className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
								/>
							</div>

							{/* Third: Powered by AI block - spans 1 column */}
							<div className="col-span-1 bg-gradient-to-tr from-secondary-200 via-secondary-300 to-tertiary-200 to-95% rounded-3xl p-8 h-56">
								<div className="text-center flex flex-col justify-center items-center h-full">
									<h3 className="marketing-h5 text-secondary-950">
										Powered by AI
									</h3>
									<p className="marketing-body text-tertiary-900 leading-snug mt-1.5 max-w-sm">
										A super brain at your disposal to deliver all the needed
										insights and outcomes.
									</p>
								</div>
							</div>
						</div>

						{/* Second row: Mobile and Desktop block - spans full width */}
						<div className="bg-gradient-to-br from-secondary-200 via-secondary-400 to-secondary-200 rounded-3xl p-6 relative h-72">
							<div className="flex flex-col h-full">
								<h3 className="block marketing-h3 text-secondary-950">
									Mobile and Desktop
								</h3>
								<p className="block marketing-body-lg text-secondary-900 mt-2">
									Two optimised experiences.
								</p>
							</div>
							<Image
								src="/images/various/desktop.png"
								alt="JustScore desktop application interface showing performance management dashboard with charts and team data"
								width={490}
								height={490}
								className="absolute bottom-0 right-0"
							/>
						</div>

						{/* Third row: Two columns - Statistics */}
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-gradient-to-tr from-tertiary-300 from-20% to-secondary-200 to-80% rounded-3xl p-6 flex flex-col justify-between h-56">
								<div>
									<div className="flex items-baseline gap-1 mb-2">
										<span
											className="marketing-h1 text-tertiary-950"
											aria-label="90 percent"
										>
											90
										</span>
										<span className="marketing-h4 ml-px text-tertiary-950">
											%
										</span>
									</div>
									<p className="marketing-body text-tertiary-900 leading-snug mt-1">
										of Managers feel unprepared to give effective feedback.
									</p>
									<cite className="marketing-body-xs text-tertiary-800 mt-4 block not-italic">
										Harvard Business Review
									</cite>
								</div>
							</div>
							<div className="bg-gradient-to-br from-secondary-200 via-secondary-200 to-tertiary-200 to-95% rounded-3xl p-6 h-full">
								<div className="flex flex-col space-y-0">
									<div className="flex items-baseline gap-1 mb-2">
										<span
											className="marketing-h1 text-secondary-950"
											aria-label="75 percent"
										>
											75
										</span>
										<span className="marketing-h5 ml-px text-secondary-950">
											%
										</span>
									</div>
									<div>
										<p className="marketing-body text-tertiary-950 mt-1 leading-snug">
											of organisations say managers fail to measure value beyond
											basic metrics—costing millions in lost potential.
										</p>
										<cite className="marketing-body-xs text-tertiary-800 mt-4 block not-italic">
											Deloitte, 2025
										</cite>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* LG-Specific Layout - Updated with 3 rows */}
				<div className="hidden lg:block xl:hidden pt-8">
					{/* Accessible grid description for screen readers */}
					<div className="sr-only">
						<h3>JustScore Features and Statistics</h3>
						<p>
							A visual grid showcasing JustScore&apos;s capabilities, mobile
							experience, AI features, and industry statistics about performance
							management challenges.
						</p>
					</div>

					<div
						className="grid grid-cols-10 grid-rows-3 gap-4"
						role="presentation"
					>
						{/* First row - Statistics card spans 2 rows */}
						<div className="col-span-2 row-span-2 bg-gradient-to-br from-tertiary-200 from-25% to-secondary-400 rounded-3xl p-6 flex flex-col justify-between">
							<div>
								<div className="flex items-baseline gap-1 mb-1">
									<span
										className="marketing-h1 text-tertiary-950"
										aria-label="90 percent"
									>
										90
									</span>
									<span className="marketing-h4 ml-px text-tertiary-950">
										%
									</span>
								</div>
								<p className="marketing-body text-tertiary-900 leading-snug mt-1">
									of Managers feel unprepared to give effective feedback.
								</p>
								<cite className="marketing-body-xs text-tertiary-800 mt-4 block not-italic">
									Harvard Business Review
								</cite>
							</div>
						</div>

						<div className="col-span-6 bg-gradient-to-r from-secondary-200 via-secondary-400 to-secondary-200 rounded-3xl p-6 relative">
							<div className="sr-only">
								<h3>JustScore Mobile Experience</h3>
								<p>
									Illustration showing JustScore&apos;s mobile interface design
								</p>
							</div>
							<Image
								src="/images/illustrations/handlinPhone.svg"
								alt="Illustration of hands holding a smartphone displaying JustScore's mobile interface"
								width={400}
								height={400}
								className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
							/>
						</div>

						<div className="col-span-2 bg-gradient-to-tr from-secondary-200 via-secondary-300 to-tertiary-200 rounded-3xl p-6">
							<div className="flex flex-col space-y-2">
								<h3 className="marketing-h5 text-secondary-950">
									Designed by Managers
								</h3>
								<p className="marketing-body-sm leading-snug text-secondary-950">
									We handedly crafted the experience to be simple, enjoyable,
									and accessible.
								</p>
							</div>
						</div>

						{/* Second row - Mobile/Desktop card spans 2 rows */}
						<div className="row-start-2 col-start-3 col-span-5 row-span-2 bg-gradient-to-br from-secondary-200 via-secondary-400 to-secondary-200 rounded-3xl p-6 relative">
							<div className="flex flex-col h-full">
								<h3 className="marketing-h3 text-secondary-950">
									Mobile and Desktop
								</h3>
								<p className="marketing-body-lg text-secondary-900 mt-1">
									Two optimised experiences.
								</p>
							</div>
							<Image
								src="/images/various/desktop.png"
								alt="JustScore desktop application interface showing performance management dashboard with charts, analytics, and team performance data"
								width={490}
								height={490}
								className="absolute bottom-0 right-0"
							/>
						</div>

						<div className="row-start-2 col-start-8 col-span-3 bg-gradient-to-b from-secondary-400 to-secondary-200 rounded-3xl p-6">
							<div className="text-center flex flex-col justify-center items-center h-full space-y-0">
								<h3 className="marketing-h5 text-secondary-950">
									Powered by AI
								</h3>
								<p className="marketing-body-sm text-secondary-900 mt-1">
									A super brain at your disposal to deliver all the needed
									insights and outcomes.
								</p>
							</div>
						</div>

						<div className="row-start-3 col-start-1 col-span-2 bg-gradient-to-br from-secondary-400 to-secondary-200 rounded-3xl relative">
							<Image
								src="/images/various/phoneCorner.png"
								alt="Partial view of JustScore mobile app interface positioned in corner design element"
								width={400}
								height={400}
								className=""
							/>
						</div>

						<div className="row-start-3 col-start-8 col-span-3 space-y-4">
							<div className="bg-gradient-to-br from-secondary-300 via-secondary-200 via-20% to-tertiary-200 to-95% rounded-3xl p-6 pt-4 h-full">
								<div className="flex flex-col">
									<div className="flex items-baseline gap-1 mb-1">
										<span
											className="marketing-h3 text-secondary-950 leading-none"
											aria-label="75 percent"
										>
											75
										</span>
										<span className="marketing-h5 ml-px text-secondary-950">
											%
										</span>
									</div>
									<div>
										<p className="marketing-body-sm text-tertiary-950 leading-snug">
											of organisations say managers fail to measure value beyond
											basic metrics—costing millions in lost potential.
										</p>
										<cite className="marketing-body-xs text-tertiary-800 mt-2 block not-italic">
											Deloitte, 2025
										</cite>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* XL Layout */}
				<div className="hidden xl:block">
					{/* Accessible grid description for screen readers */}
					<div className="sr-only">
						<h3>JustScore Features and Statistics Grid</h3>
						<p>
							A comprehensive visual layout showcasing JustScore&apos;s mobile
							and desktop experiences, AI capabilities, design philosophy, and
							supporting industry statistics about performance management
							challenges.
						</p>
					</div>

					<div className="relative w-7xl mx-auto">
						<div
							className="grid grid-cols-1 md:grid-cols-5 grid-rows-7 md:grid-rows-3 gap-2 md:gap-4 m-4 h-[600px]"
							role="presentation"
						>
							<div className="col-start-1 row-start-1 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 bg-gradient-to-br from-tertiary-300 via-secondary-300 to-primary-300 rounded-3xl p-6 relative">
								<div className="text-center flex flex-col justify-start items-center h-full pt-4">
									<h3 className="marketing-h2 text-secondary-950">
										Mobile and <br />
										Desktop
									</h3>
									<p className="marketing-body-lg text-secondary-900 mt-2">
										Two optmised experiences.
									</p>
								</div>
								<Image
									src="/images/various/desktop.png"
									alt="JustScore desktop application showing comprehensive performance management dashboard with team analytics, scoring interface, and reporting tools"
									width={490}
									height={490}
									className="absolute bottom-0 left-0"
								/>
							</div>

							<div className="col-start-1 row-start-2 md:col-start-1 md:row-start-3 md:col-span-2 md:row-span-1 bg-gradient-to-br from-secondary-400 to-secondary-200 rounded-3xl relative">
								<Image
									src="/images/various/phoneCorner.png"
									alt="Stylized mobile app interface element showing JustScore's responsive design capabilities"
									width={580}
									height={580}
									className=""
								/>
							</div>

							<div className="col-start-1 row-start-3 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2 bg-gradient-to-b from-tertiary-200 from-50% to-secondary-400 rounded-3xl p-6 flex flex-col justify-between h-full">
								<div>
									<div className="flex items-baseline gap-1 mb-2">
										<span
											className="marketing-display text-tertiary-950"
											aria-label="90 percent"
										>
											90
										</span>
										<span className="marketing-h4 ml-px text-tertiary-950">
											%
										</span>
									</div>
									<p className="marketing-body-lg text-tertiary-900 mt-1">
										of Managers feel unprepared to give effective feedback.
									</p>
									<cite className="marketing-body-sm text-tertiary-800 mt-4 block not-italic">
										Harvard Business Review
									</cite>
								</div>
							</div>

							<div className="col-start-3 row-start-1 col-span-2 row-span-1 bg-gradient-to-br from-secondary-300 via-secondary-500 to-secondary-300 rounded-3xl p-6 relative">
								<div className="sr-only">
									<h3>JustScore Mobile Experience</h3>
									<p>
										Illustration showing JustScore&apos;s intuitive mobile
										interface design for performance tracking
									</p>
								</div>
								<Image
									src="/images/illustrations/handlinPhone.svg"
									alt="Illustration of hands holding a smartphone displaying JustScore's intuitive mobile interface for performance tracking and team management"
									width={640}
									height={640}
									className="absolute bottom-0"
								/>
							</div>

							<div className="col-start-1 row-start-5 md:col-start-5 md:row-start-1 md:col-span-1 md:row-span-1 bg-gradient-to-br from-secondary-300 via-secondary-200 to-tertiary-300 rounded-3xl p-6">
								<div className="flex flex-col space-y-3">
									<h3 className="marketing-h5 text-secondary-950">
										Designed by Managers
									</h3>
									<p className="marketing-body-sm leading-snug text-secondary-950">
										We handedly crafted the experience to be simple, enjoyable,
										and accessible.
									</p>
								</div>
							</div>

							<div className="col-start-1 row-start-6 md:col-start-4 md:row-start-2 md:col-span-2 md:row-span-1 bg-gradient-to-bl from-tertiary-200 via-secondary-300 to-secondary-300 rounded-3xl p-6">
								<div className="flex flex-row gap-5 h-full space-y-3">
									<div className="flex items-baseline gap-1">
										<span
											className="marketing-display text-tertiary-950"
											aria-label="75 percent"
										>
											75
										</span>
										<span className="marketing-h4 ml-px text-tertiary-950">
											%
										</span>
									</div>
									<div>
										<p className="marketing-body text-tertiary-900 mt-1 leading-snug">
											of organisations say managers fail to measure value beyond
											basic metrics—costing millions in lost potential.
										</p>
										<cite className="marketing-body-sm text-tertiary-800 mt-4 block not-italic">
											Deloitte, 2025
										</cite>
									</div>
								</div>
							</div>

							<div className="col-start-1 row-start-7 md:col-start-4 md:row-start-3 md:col-span-2 md:row-span-1 bg-gradient-to-br from-secondary-300 via-secondary-200 via-20% to-tertiary-200 to-95% rounded-3xl p-6">
								<div className="text-center flex flex-col justify-center items-center h-full space-y-3">
									<h3 className="marketing-h4 text-secondary-950">
										Powered by AI
									</h3>
									<p className="marketing-body leading-snug text-tertiary-900 max-w-sm">
										A super brain at your disposal to deliver all the needed
										insights and outcomes.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
