import React, { useState, FC, ReactElement, useEffect, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  children: ReactElement
  setIsOpened: (value: boolean) => void
  isOpened: boolean
}

const Modal: FC<ModalProps> = ({ children, setIsOpened, isOpened }) => {
  const onClose = () => setIsOpened(false)

  const clickHandle = (e: MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  if (!isOpened) {
    return null
  }

  return createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <div
      role="dialog"
      tabIndex={-1}
      onClick={clickHandle}
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
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        style={{
          padding: 10,
          background: '#fff',
          borderRadius: 3,
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.2)',
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById('overlay') as HTMLElement
  )
}

const ModalManager = () => {
  const [isOpened1, setIsOpened1] = useState(false)
  const [isOpened2, setIsOpened2] = useState(false)
  const [isOpened3, setIsOpened3] = useState(false)

  useEffect(() => {
    const documentKeyboardHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpened3) {
          setIsOpened3(false)
        } else if (isOpened2) {
          setIsOpened2(false)
        } else if (isOpened1) {
          setIsOpened1(false)
        }
      }
    }

    document.addEventListener('keydown', documentKeyboardHandler)

    return () => {
      document.removeEventListener('keydown', documentKeyboardHandler)
    }
  }, [isOpened1, isOpened2, isOpened3])

  return (
    <div className="App">
      <button type="button" onClick={() => setIsOpened1(true)}>
        Открыть первое окно
      </button>

      <Modal setIsOpened={setIsOpened1} isOpened={isOpened1}>
        <button
          type="button"
          onClick={(e) => {
            setIsOpened2(true)
            e.stopPropagation()
          }}
        >
          Открыть второе окно
        </button>
      </Modal>
      <Modal setIsOpened={setIsOpened2} isOpened={isOpened2}>
        <button
          type="button"
          onClick={(e) => {
            setIsOpened3(true)
            e.stopPropagation()
          }}
        >
          Открыть третье окно
        </button>
      </Modal>
      <Modal setIsOpened={setIsOpened3} isOpened={isOpened3}>
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
      </Modal>
    </div>
  )
}

export default ModalManager
