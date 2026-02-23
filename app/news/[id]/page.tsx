import { NewsItem } from '@/types/news'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import s from './NewsArticle.module.scss'
import NewsArticleContent from './NewsArticleContent'

function getNewsList(): NewsItem[] {
	const filePath = path.join(process.cwd(), 'public', 'api', 'news.json')
	const data = fs.readFileSync(filePath, 'utf-8')
	return JSON.parse(data)
}

function getNewsItem(id: string): NewsItem | null {
	const list = getNewsList()
	return list.find((item) => item.id === id) ?? null
}

export function generateStaticParams() {
	const list = getNewsList()
	return list.map((item) => ({ id: item.id }))
}

export default async function NewsArticlePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const item = getNewsItem(id)

	if (!item) notFound()

	return (
		<>
			<div className="layoutContainer">
				<NewsArticleContent item={item} />
			</div>
			<footer className={s.footer}>
				<div className={s.footerWrap}>
					<Image
						className={s.footerImage}
						src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icons/footerlogo.svg`}
						alt=""
						width={103}
						height={124}
					/>
					<p className={s.footerText}>Креативное агентство 500na700</p>
				</div>
			</footer>
		</>
	)
}
