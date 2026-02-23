import NewsList from "@/components/News/NewsList";
import s from '../components/News/NewsList.module.scss'

export default function Home() {
	return (
		<main>
			<section className='layoutContainer' id='news'>
				<h1 className={s.titleMain}>Новости</h1>
				<NewsList />
			</section>
		</main>
	)
}
