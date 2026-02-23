'use client'

import { NewsItem } from '@/types/news'
import { useEffect, useState } from 'react'
import s from './NewsList.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function NewsList() {
	const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 500))
      const res = await fetch('/api/news.json')
      const data = await res.json()
      setItems(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className={s.loading}><div className={s.spiner} aria-hidden /></div>
  return (
		<section className={s.newsSection}>
			<ul className={s.list}>
				{items.map((item) => (
					<li className={s.listItem} key={item.id}>
						<Link className={s.listItemLink} href={`/news/${item.id}`}>
            <div className={s.imageWrap}>

							{item.image ?
								<Image
                  className={s.image}
									src={item.image}
									fill
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
