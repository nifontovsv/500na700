'use client'

import Image from 'next/image'
import Link from 'next/link'
import s from './Header.module.scss'
import { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import Form from '../Form/Form'

export default function Header() {
	const [modalOpen, setModalOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const SCROLL_THRESHOLD = 10

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > SCROLL_THRESHOLD)
		}
		window.addEventListener('scroll', handleScroll)
		handleScroll()
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header className={scrolled ? `${s.header} ${s.headerScrolled}` : s.header}>
			<Link href='/'>
				<Image
					className={s.logo}
					src='/logo.svg'
					alt='Логотип'
					width={70}
					height={84}
				/>
			</Link>
			<Link
				onClick={(e) => {
					e.preventDefault()
					setModalOpen(true)
				}}
				className={s.feedbackButton}
				href='/#feedback'
			>
				<span className={s.feedbackButtonText}>Связаться с нами</span>
			</Link>
			{modalOpen && (
				<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
					<Form />
				</Modal>
			)}
		</header>
	)
}
