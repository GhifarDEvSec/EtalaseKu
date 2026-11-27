import { appConfig } from '../../config'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <p className="footer-brand">{appConfig.appName}</p>
        <p className="footer-meta">
          {appConfig.studentName} · {appConfig.studentNim}
        </p>
      </div>
    </footer>
  )
}
