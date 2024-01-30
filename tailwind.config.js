/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {
				colors: {
					'usach-aqua': {
						100: '#E5F3F3',
						200: '#CEE8E8',
						300: '#B4DDDD',
						400: '#9CD3D2',
						500: '#84CBC8',
						600: '#6BC2BE',
						700: '#53BCB6',
						800: '#32B5AD',
						900: '#17AEA4',
						1000: '#00A499'
					},
					'usach-terra': {
						100: '#FDF1E5',
						200: '#FBE4CD',
						300: '#F9D6B3',
						400: '#F7C898',
						500: '#F5BB7F',
						600: '#F3AD66',
						700: '#F1A04D',
						800: '#EF9132',
						900: '#ED8318',
						1000: '#EA7600'
					},
					'usach-industrial': {
						100: '#EBECED',
						200: '#D8D9DB',
						300: '#C4C6C9',
						400: '#B0B3B7',
						500: '#9C9FA4',
						600: '#888C92',
						700: '#747980',
						800: '#61676E',
						900: '#4D545C',
						1000: '#394049'
					},
					'usach-ultra': {
						100: '#F4ECF5',
						200: '#E8DAEA',
						300: '#DDC8E0',
						400: '#D0B5D6',
						500: '#C6A3CD',
						600: '#BA91C2',
						700: '#AE7EB6',
						800: '#A36CAB',
						900: '#975AA0',
						1000: '#8C4799'
					},
					'usach-cloudy': {
						100: '#ECF4FC',
						200: '#DAE9F9',
						300: '#C7DDF4',
						400: '#B3D2F0',
						500: '#A1C7EB',
						600: '#8FBBE5',
						700: '#7CAFDF',
						800: '#6AA4D9',
						900: '#5998D2',
						1000: '#498BCA'
					},
					'usach-daisy': {
						100: '#FDF7E6',
						200: '#FCEECC',
						300: '#F9E6B3',
						400: '#F7DD98',
						500: '#F5D57F',
						600: '#F2CC65',
						700: '#F0C34C',
						800: '#EEBB33',
						900: '#ECB21A',
						1000: '#EAAA00'
					},
					'usach-rouge': {
						100: '#FAE7EA',
						200: '#F4D0D5',
						300: '#EFB8C0',
						400: '#E99FAC',
						500: '#E48796',
						600: '#DE6F81',
						700: '#D8596D',
						800: '#D34058',
						900: '#CE2943',
						1000: '#C8102E'
					}
				},
				fontFamily: {
					'usach-bebas-title': ['BebasNeuePro Bold', 'sans-serif'],
					'usach-bebas-body': ['BebasNeuePro Regular' , 'sans-serif'],
					'usach-helvetica-body': ['Helvetica Neue Regular' , 'sans-serif'],
					'usach-helvetica-medium': ['Helvetica Neue Medium' , 'sans-serif'],
					'usach-helvetica-bold': ['Helvetica Neue Bold' , 'sans-serif'],
				}
		},
	},
	plugins: [
		require("daisyui")
	],
	daisyui: {
	  themes: ["light"],
	},
}

