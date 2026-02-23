'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import gsap from 'gsap'
import s from './Modal.module.scss'

type ModalProps = {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !overlayRef.current || !boxRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      )
      gsap.fromTo(
        boxRef.current,
        { scale: 0.65, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 }
      )
    })
    return () => ctx.revert()
  }, [open])

  if (!open) return null

  const modalContent = (
    <div
      ref={overlayRef}
      className={s.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-hidden
    >
      <div
        ref={boxRef}
        className={s.box}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={s.modalHeader}>
          <h2 className={s.titleFeedback}>Связаться с нами</h2>
          <button type="button" className={s.closeBtn} onClick={onClose} aria-label="Закрыть">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icons/close.svg`} alt="" width={36} height={36} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}