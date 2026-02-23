import NewsList from '@/components/News/NewsList'
import SectionTitle from '@/components/News/SectionTitle'

export default function Home() {
	return (
		<main>
			<section className="layoutContainer" id="news">
				<SectionTitle />
				<NewsList />
			</section>
		</main>
	)
}
