import type { ReactNode } from 'react'

type AuthLayoutProps = {
  eyebrow: string
  title: string
  visualTitle: string
  visualCopy: string
  badge: string
  features?: string[]
  panelClassName?: string
  cardClassName?: string
  children: ReactNode
  footer?: ReactNode
}

function AuthLayout({
  eyebrow,
  title,
  visualTitle,
  visualCopy,
  badge,
  features,
  panelClassName,
  cardClassName,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="auth-shell">
      <div className={`auth-panel ${panelClassName ?? ''}`.trim()}>
        <div className="auth-visual">
          <div className="brand-badge">{badge}</div>
          <p className="eyebrow">Expense Tracker</p>
          <h2>{visualTitle}</h2>
          <p className="visual-copy">{visualCopy}</p>

          {features && features.length > 0 && (
            <ul className="feature-list">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
        </div>

        <div className={`auth-card ${cardClassName ?? ''}`.trim()}>
          <div className="auth-header">
            <p className="eyebrow subtle">{eyebrow}</p>
            <h1>{title}</h1>
          </div>

          {children}

          {footer && <p className="auth-footer">{footer}</p>}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
