import EmptyState from "@/components/empty-state"

export const ProcessingState = ()=>{
    return (
        <div className="bg-white rouded-lg px-4 py-5 flex flex-col gap-y-8 items-center">
            <EmptyState
            image="/processing.svg"
            title="Meeting Completed"
            description="The meeting was Completed,a summary will appear soon" /> 
        </div>
    )
}