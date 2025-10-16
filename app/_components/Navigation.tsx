import Link from "next/link"

function Navigation() {
    return (
        <nav className="z-10">
            <ul className="flex gap-16 items-center">
                <li>
                    <Link className="hover:text-amber-400" href="/capitals">Capitals</Link>
                </li>
                <li>
                    <Link className="hover:text-amber-400" href="/flags">Flags</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
