'use client'

import { NewsItem } from '@/types/news'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import s from './NewsArticle.module.scss'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

type Props = { item: NewsItem }

export default function NewsArticleContent({ item }: Props) {
	const imageWrapRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const dateRef = useRef<HTMLTimeElement>(null)
	const subtitleRef = useRef<HTMLHeadingElement>(null)
	const textRef = useRef<HTMLParagraphElement>(null)

	useEffect(() => {
		const imageWrap = imageWrapRef.current
		const contentEls = [titleRef.current, dateRef.current, subtitleRef.current, textRef.current].filter(Boolean)

		if (!imageWrap || !contentEls.length) return

		const ctx = gsap.context(() => {
			gsap.from(imageWrap, {
				scale: 0.5,
				opacity: 0,
				duration: 1,
				ease: 'power3.out',
			})
			gsap.from(contentEls, {
				x: 80,
				opacity: 0,
				duration: 0.7,
				stagger: 0.12,
				ease: 'power3.out',
				delay: 0.15,
			})
		})

		return () => ctx.revert()
	}, [])

	return (
		<main className={s.article}>
			<div className={s.imageWrap} ref={imageWrapRef}>
				{item.image ? (
					<Image
						className={s.image}
						src={`${basePath}${item.image}`}
						fill
						sizes="(max-width: 768px) 100vw, 440px"
						alt={item.subtitle || ''}
					/>
				) : (
					<div className={s.imagePlaceholder} aria-hidden />
				)}
			</div>
			<div className={s.content}>
				<h1 className={s.title} ref={titleRef}>
					{item.title}
				</h1>
				<time className={s.date} ref={dateRef}>
					{item.date}
				</time>
				<div className={s.descriptionWrap}>
					<h3 className={s.subtitle} ref={subtitleRef}>
						{item.subtitle}
					</h3>
					<p className={s.text} ref={textRef}>
						{item.text ?? item.description ?? ''}
					</p>
				</div>
			</div>
		</main>
	)
}
