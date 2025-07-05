import EmptyState from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"

interface Props {
    meetingId:string;
    onCancleMeeting:()=>void;
    isCancelling:boolean;
}


export const UpcomingState = ({
    meetingId,
    onCancleMeeting,
    isCancelling
}:Props)=>{
    return (
        <div className="bg-white rouded-lg px-4 py-5 flex flex-col gap-y-8 items-center">
            <EmptyState
            image="/upcoming.svg"
            title="Not started yet"
            description="Once you start this meeting, a summany will appear here" /> 
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
                <Button 
                    asChild
                    variant={"secondary"}
                    className="w-full lg:w-auto"
                    onClick={onCancleMeeting}
                    disabled={isCancelling}
                    >
                    <Link href={`/call/${123}`}>
                        <BanIcon />
                        Cancle Meeting
                    </Link>
                </Button>
                <Button asChild className="w-full lg:w-auto" disabled={isCancelling}>
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Start Meeting
                    </Link>
                </Button>
            </div>   
        </div>
    )
}