import type {ReactNode} from "react";

export default function Error({error, children}: {error: string, children: ReactNode}) {
    return (
        <>
            <h3 className="text-xl font-bold text-red-400">
                {error}
            </h3>
            <div className={`cursor-none pointer-events-none ${error.length > 0 ? "opacity-40" : ""}`}>
                {children}
            </div>
        </>
    )
}