export function getPerformanceLevel(wpm: number) {
    if (wpm <= 30) return { label: "Beginner", icon: "🔴", colorClass: "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]" };
    if (wpm <= 50) return { label: "Average", icon: "🟡", colorClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]" };
    if (wpm <= 70) return { label: "Good", icon: "🟢", colorClass: "bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]" };
    if (wpm <= 100) return { label: "Pro", icon: "🔵", colorClass: "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]" };
    return { label: "Elite", icon: "🟣", colorClass: "bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]" };
}
