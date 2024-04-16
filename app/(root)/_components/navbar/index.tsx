import Actions from './actions'
import { Logo } from './logo'

export const Navbar = () => {

  return (
    <div>
    <nav className="fixed top-0 w-full h-14 z-50 backdrop-blur border-b border-slate-200 px-2 lg:px-4 flex justify-between items-center">
      <Logo title='Renux'/>
      <Actions />
    </nav>
   </div> 
  )
}
