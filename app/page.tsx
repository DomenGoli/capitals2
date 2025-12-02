import Image from "next/image";
import bg from "@/public/world-in-geographic-projection-true-colour-satellite-image-99151124-58b9cc3e5f9b58af5ca7578d.jpg";
import Link from "next/link";

export default function Home() {
    return (
        <main className="mt-90">
            <Image
                src={bg}
                fill
                className="object-cover lg:object-fill object-top"
                alt="Flags map of the world"
                placeholder="blur"
                quality={100}
            />

            <div className="relative z-10 text-center">
                <Link href="/capitals"><h1 className="text-6xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Test your knowledge of countries </h1></Link>
            </div>
        </main>
    );
}
