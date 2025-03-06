import { BookOpen } from 'phosphor-react'

export function Navbar() {
    return (
        <header>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid d-flex align-items-center">
                    <a className="navbar-brand d-flex align-items-center gap-3" href="./">
                        <BookOpen size={35} className='p-0 m-0' />
                        <h3 className='m-0'>Leitura Bíblica Anual</h3>
                    </a>
                </div>
            </nav>
        </header>
    )
}


