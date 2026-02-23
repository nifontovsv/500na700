'use client'
import { useState } from 'react'
import { IMaskInput } from 'react-imask'
import s from './Form.module.scss'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_LENGTH = 18 // +7 (000) 000-00-00

export default function Form() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [consent, setConsent] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}

    if (!name.trim()) errs.name = 'Обязательное поле'
    if (!EMAIL_REGEX.test(email)) errs.email = 'Введите корректный email'
    if (phone.length < PHONE_LENGTH) errs.phone = 'Введите номер телефона'
    if (!consent) errs.consent = 'Необходимо согласие'

    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    console.log({name: name.trim(), email, phone, consent})
  }

	const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
	return (
		<form
			className={s.form}
			onSubmit={handleSubmit}
			style={{ ['--checkbox-icon' as string]: `url('${basePath}/icons/checkbox.svg')` }}
		>
			<div className={s.field}>
				<input
					id='name'
					type='text'
					value={name}
					onChange={(e) => {
						setName(e.target.value)
						setErrors((prev) => ({ ...prev, name: '' }))
					}}
					className={s.input}
					placeholder='Имя'
				/>
				{errors.name && <span className={s.error}>{errors.name}</span>}
			</div>

			<div className={s.field}>
				<IMaskInput
					id='phone'
					mask='+7 (000) 000-00-00'
					value={phone}
					onAccept={(value) => {
						setPhone(value ?? '')
						setErrors((prev) => ({ ...prev, phone: '' }))
					}}
					className={s.input}
					placeholder='Телефон'
				/>
				{errors.phone && <span className={s.error}>{errors.phone}</span>}
			</div>

			<div className={s.field}>
				<input
					id='email'
					type='email'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value)
						setErrors((prev) => ({ ...prev, email: '' }))
					}}
					className={s.input}
					placeholder='Email'
				/>
				{errors.email && <span className={s.error}>{errors.email}</span>}
			</div>

			<div className={s.field}>
				<label className={s.checkboxLabel}>
					<input
						type='checkbox'
						checked={consent}
						onChange={(e) => {
							setConsent(e.target.checked)
							setErrors((prev) => ({ ...prev, consent: '' }))
						}}
						className={s.checkbox}
						aria-describedby='consent-text'
					/>
					<span className={s.checkboxBox} aria-hidden />
					<span id='consent-text' className={s.consentText}>Я согласен (-а) на обработку персональных данных</span>
				</label>
				{errors.consent && <span className={s.error}>{errors.consent}</span>}
			</div>

			<button type='submit' className={s.submit}>
				<span className={s.submitText}>Отправить</span>
			</button>
		</form>
	)
}
