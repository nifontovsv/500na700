import { NewsItem } from '@/types/news'
import { headers } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import s from './NewsArticle.module.scss'

async function getNewsItem(id: string): Promise<NewsItem | null> {
	await new Promise((r) => setTimeout(r, 500))

	const headerList = await headers()
	const host = headerList.get('host') ?? 'localhost:3000'
	const protocol = headerList.get('x-forwarded-proto') ?? 'http'
	const base = `${protocol}://${host}`

	const res = await fetch(`${base}/api/news.json`, { cache: 'no-store' })
	const list: NewsItem[] = await res.json()
	return list.find((item) => item.id === id) ?? null
}

export default async function NewsArticlePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const item = await getNewsItem(id)

	if (!item) notFound()

	return (
		<>
			<div className='layoutContainer'>
				<main className={s.article}>
					<div className={s.imageWrap}>
						{item.image ?
							<Image
								className={s.image}
								src={item.image}
								fill
								alt={item.subtitle || ''}
							/>
						:	<div className={s.imagePlaceholder} aria-hidden />}
					</div>
					<div className={s.content}>
						<h1 className={s.title}>{item.title}</h1>
						<time className={s.date}>{item.date}</time>
						<div className={s.descriptionWrap}>
							<h3 className={s.subtitle}>{item.subtitle}</h3>
							<p className={s.text}>{item.text}</p>
						</div>
					</div>
				</main>
			</div>
			<footer className={s.footer}>
				<div className={s.footerWrap}>
					<Image
						className={s.footerImage}
						src='/icons/footerlogo.svg'
						alt=''
						width={103}
						height={124}
					/>
					<p className={s.footerText}>Креативное агентство 500na700</p>
				</div>
			</footer>
		</>
	)
}
