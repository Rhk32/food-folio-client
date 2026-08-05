import Image from 'next/image';
import React from 'react';
import Logo from '../../public/foodFolioLogoCircular.png'

const Home = async () => {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
	const uuid = await res.json();

	return (
		<div className='max-w-7xl mx-auto text-center space-y-6'>
			<h1>If everytime you get a different uuid then its ok</h1>
			<p>{uuid}</p>
			<h1 className='font-bold text-7xl'>LOGO</h1>
			<Image loading='eager' src={Logo} alt='' width={500} height={500}></Image>
		</div>
	);
};

export default Home;