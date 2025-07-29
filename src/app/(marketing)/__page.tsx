export default function ComingSoonPage() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
			{/* Main SVG container - covers half the screen, moved 1rem to the right */}
			<div className="relative w-full max-w-[60vw] max-h-[60vh] lg:max-w-[40vw] lg:max-h-[40vh] flex items-center justify-center ml-10 lg:ml-16">
				{/* Background SVG with original aspect ratio */}
				<svg
					className="w-full h-full"
					viewBox="0 0 881 872"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M352.973 0C332.551 133.003 252.584 219.017 135.217 243.038C71.4894 249.982 31.1369 237.697 0.872559 224.076C37.5343 260.917 59.679 303.664 83.0539 354.943C150.718 540.56 19.8186 695.238 11.9449 699.469C49.6894 678.42 120.799 650.224 218.919 656.611C422.043 669.87 527.689 844.758 536.464 872C519.259 818.585 515.852 743.099 530.622 656.611C558.871 491.453 687.603 339.185 875.095 307.938C875.826 307.816 881 307.318 881 307.318C673.578 330.02 561.379 259.864 561.379 259.864C407.35 175.201 367.638 41.5256 352.973 0Z"
						fill="url(#paint0_linear_3508_215)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_3508_215"
							x1="553.511"
							y1="167.692"
							x2="937.674"
							y2="1290.85"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#011932" />
							<stop offset="1" stopColor="#034C98" />
						</linearGradient>
					</defs>
				</svg>

				{/* Content overlay - centered within the SVG */}
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 px-8 -ml-8 lg:-ml-24">
					{/* Almost ready text */}
					<div>
						<p className="text-white marketing-h6">Almost ready...</p>
					</div>
				</div>
			</div>
		</div>
	);
}
