import React, { useState, FC, ReactElement, useEffect } from 'react'
import { createPortal } from 'react-dom'

 type ModalProps = {
   children: ReactElement
   onClose: VoidFunction
 }

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return createPortal(
    <div
      role="dialog"
      onClick={() => onClose()}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        top: 0,
      }}
    >
      <div
        style={{
          padding: 10,
          background: '#fff',
          borderRadius: 3,
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.2)',
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('overlay') as HTMLElement
  )
}

 type ModalWrapperProps = {
   children: ReactElement
   onClose: VoidFunction
 }

 const ModalWrapper: FC<ModalWrapperProps> = ({ children, onClose }) => {
  useEffect(() => {
    const documentKeyboardHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', documentKeyboardHandler)
    return () => {
      document.removeEventListener('keydown', documentKeyboardHandler)
    }
  }, [onClose])

  return <Modal onClose={onClose}>{children}</Modal>
}

const ModalManager = () => {
  const [isOpened1, setIsOpened1] = useState(false)
  const [isOpened2, setIsOpened2] = useState(false)
  const [isOpened3, setIsOpened3] = useState(false)

  const onClose1 = () => setIsOpened1(false)
  const onClose2 = () => setIsOpened2(false)
  const onClose3 = () => setIsOpened3(false)

  return (
    <div className="App">
      <button type="button" onClick={() => setIsOpened1(true)}>
        Открыть первое окно
      </button>

      {isOpened1 && (
        <ModalWrapper onClose={onClose1}>
          <button type="button" onClick={() => setIsOpened2(true)}>
            Открыть второе окно
          </button>
        </ModalWrapper>
      )}
      {isOpened2 && (
        <ModalWrapper onClose={onClose2}>
          <button type="button" onClick={() => setIsOpened3(true)}>
            Открыть третье окно
          </button>
        </ModalWrapper>
      )}
      {isOpened3 && (
        <ModalWrapper onClose={onClose3}>
          <button
            type="button"
            onClick={() => {
              setIsOpened1(false)
              setIsOpened2(false)
              setIsOpened3(false)
            }}
          >
            Закрыть все окна
          </button>
        </ModalWrapper>
      )}
    </div>
  )
}

export default ModalManager
