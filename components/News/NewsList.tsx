'use client'

import { NewsItem } from '@/types/news'
import { useEffect, useRef, useState } from 'react'
import s from './NewsList.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'

export default function NewsList() {
	const [items, setItems] = useState<NewsItem[]>([])
	const [loading, setLoading] = useState(true)
	const listRef = useRef<HTMLUListElement>(null)

	useEffect(() => {
		const load = async () => {
			await new Promise((r) => setTimeout(r, 500))
			const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
			const res = await fetch(`${base}/api/news.json`)
			const data = await res.json()
			setItems(data)
			setLoading(false)
		}
		load()
	}, [])

	useEffect(() => {
		if (loading || !items.length || !listRef.current) return
		const cards = listRef.current.querySelectorAll('li')
		const ctx = gsap.context(() => {
			gsap.from(cards, {
				y: 28,
				opacity: 0,
				duration: 1,
				stagger: 0.15,
				ease: 'power3.out',
				delay: 0.1,
			})
		})
		return () => ctx.revert()
	}, [loading, items.length])

	if (loading)
		return (
			<div className={s.loading}>
				<div className={s.spiner} aria-hidden />
			</div>
		)
	return (
		<section className={s.newsSection}>
			<ul className={s.list} ref={listRef}>
				{items.map((item) => (
					<li className={s.listItem} key={item.id}>
						<Link className={s.listItemLink} href={`/news/${item.id}`}>
							<div className={s.imageWrap}>
								{item.image ?
									<Image
										className={s.image}
										src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${item.image}`}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 991px) 100vw, (max-width: 1440px) 50vw, 440px"
										alt={item.title || ''}
									/>
								:	<div className={s.imagePlaceholder} aria-hidden />}
							</div>
							<h2 className={s.title}>{item.title}</h2>
							<p className={s.description}>{item.description}</p>
							<time className={s.date}>{item.date}</time>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}
