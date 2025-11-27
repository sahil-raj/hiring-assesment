import type { Metadata } from 'next';
import './globals.css';
import { Nunito } from 'next/font/google';
import Loading from './loading';
import { Suspense } from 'react';
import Providers from './providers';

const nunito = Nunito({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Heizen Next Js Template',
	description: 'Opengig',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`antialiased ${nunito.className}`}>
				<Suspense fallback={<Loading />}>
					<Providers>{children}</Providers>
				</Suspense>
			</body>
		</html>
	);
}
