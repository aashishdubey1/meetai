'use client'

import ErrorState from "@/components/error-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { CallProvider } from "../components/call-provider"

interface Props {
    meetinngId:string
}

export const CallView = ({meetinngId}:Props) =>{
    const trpc = useTRPC()
    
    const {data}  = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetinngId})) 


    if(data.status === 'completed'){
        return (
            <div className="flex h-screen items-center justify-center">
                <ErrorState 
                    title="Meeting has ended"
                    description="You can no longer join this meeting"
                />
            </div>
        )
    }



    return <CallProvider meetingId={meetinngId} meetingName={data.name}/>
    
}