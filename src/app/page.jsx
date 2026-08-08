import React from 'react';

const Home = async () => {
	const health = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
	const healthMessage = await health.json();
	console.log(healthMessage);
	return (
		<></>
	);
};

export default Home;