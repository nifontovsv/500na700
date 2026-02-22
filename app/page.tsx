import NewsList from "@/components/News/NewsList";
import s from '../components/News/NewsList.module.scss'

export default function Home() {
	return (
		<main>
			<section id='news'>
				<h1 className={s.title}>Новости</h1>
				<NewsList />
			</section>
			<section id='feedback'>{/* сюда потом форму */}</section>
		</main>
	)
}
