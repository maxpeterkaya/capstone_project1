import type {ReactNode} from "react";

export default function Error({error, children}: {error: string, children: ReactNode}) {
    return (
        <>
            <h3 className="text-xl font-bold text-red-400">
                {error}
            </h3>
            <div className={`${error.length > 0 ? "opacity-40 cursor-none pointer-events-none" : ""}`}>
                {children}
            </div>
        </>
    )
}