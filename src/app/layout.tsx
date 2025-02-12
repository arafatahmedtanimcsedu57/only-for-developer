import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Developer Playground',
	description: 'This is only for developer',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
