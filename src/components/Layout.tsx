import Header from './Header'
import Footer from './Footer'

type LayoutProps = { 
  children: JSX.Element | JSX.Element[]
  showFooter?: boolean
  className?: string
}
const Layout = ({ children, showFooter = true,  className}: LayoutProps) => {
  return (
    <div className={className}>
      <Header />
      {children}
      {
        showFooter ? <Footer /> : null
      }
    </div>
  )
}

export default Layout
