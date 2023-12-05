import React from 'react'

function StaticsCard({ children, className, label, value }: { children: React.ReactNode, className?: string, label: string, value: any }) {
    return (
        <div className={`border-l shadow-md border-white pl-[8px] flex flex-col gap-[8px] ${className}`}>

            {children}
            <div>{label}</div>
            <div className="flex items-center justify-between">
                <div>{value}</div>
                <div>{label}</div>
            </div>
        </div>

    )
}

export default StaticsCard