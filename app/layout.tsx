import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import Header from '@/components/Header/Header'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600'], // Regular, Medium, Semibold
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: '500na700',
	description: 'Blog news',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${inter.variable} antialiased`}>
				<Header />
				<div>{children}</div>
			</body>
		</html>
	)
}
