'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import s from './NewsList.module.scss'

export default function SectionTitle() {
	const titleRef = useRef<HTMLHeadingElement>(null)

	useEffect(() => {
		if (!titleRef.current) return
		const ctx = gsap.context(() => {
			gsap.from(titleRef.current, {
				x: -180,
				opacity: 0,
				duration: 1,
				ease: 'power3.out',
			})
		})
		return () => ctx.revert()
	}, [])

	return (
		<h1 className={s.titleMain} ref={titleRef}>
			Новости
		</h1>
	)
}
