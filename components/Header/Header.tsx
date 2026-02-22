import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
	return (
		<header className={styles.header}>
			<Link href='/'>
				<Image className={styles.logo} src='/logo.svg' alt='Логотип' width={70} height={84} />
			</Link>
			<Link className={styles.feedbackButton} href='/#feedback'>
				<span className={styles.feedbackButtonText}>Связаться с нами</span>
			</Link>
		</header>
	)
}
