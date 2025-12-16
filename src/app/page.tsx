export default function Home() {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-10 p-5 text-center">
            <h1 className="text-foreground text-3xl font-semibold tracking-wider md:text-5xl lg:text-7xl">
                Restaurant Reviews
            </h1>
            <p className="text-lg tracking-wide md:text-2xl lg:text-4xl">
                Review your favorite places
            </p>
        </div>
    )
}
