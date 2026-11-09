import { useCallback, useState, type ReactNode } from 'react'
import { ToastContext } from '../hooks/useToast'

interface Toast {
  id: number
  message: string
}

let nextId = 1

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string) => {
    const id = nextId++
    setToasts((list) => [...list, { id, message }])
    setTimeout(() => {
      setToasts((list) => list.filter((toast) => toast.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
