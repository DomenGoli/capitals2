import Link from "next/link";
import Navigation from "./Navigation";

function Header() {
    return (
        <header className='px-8 py-5 z-10'>
            <div className="flex justify-between max-w-7xl mx-auto text-xl ">
                <Link className="hover:text-amber-400" href="/">Countries Game</Link>
                <Navigation />
            </div>
        </header>
    );
}

export default Header;
