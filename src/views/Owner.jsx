export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-yellow-50">
            <h1 className="py-8 text-center">
                19 Methus (Kanoon) - JSD11
            </h1>
            <div>
                <img src="assets/cat_la_02.jpg" className="w-70 h-70 rounded-full" />
            </div>
            <h2 className="pt-8 pb-4">
                Short Biography:
            </h2>
            <h3 className="w-[60%] text-center text-2xl font-semibold">
                Cat Engineer
            </h3>
            <ul className="list-disc">
                <li>Fast Cat</li>
                <li>Analytic Moewing</li>
                <li>Systematic Sleeper</li>
            </ul>
        </div>
    )
}