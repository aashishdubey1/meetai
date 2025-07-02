'use client'

import {useState} from 'react';
import ErrorState from "@/components/error-state"
import LoadingState from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { AgentIdViewHeader } from "../components/agentId-view-header"
import GeneratedAvatar from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useConfirm } from "@/hooks/use-confirm"
import { UpdateAgentDialog } from '../components/update-agent-dialog';

interface Props {
    agentId:string
}

export const AgentIdView = ({agentId}:Props)=>{

    const trpc = useTRPC()
    const router = useRouter()
    const queryClient = useQueryClient()

    const [updateAgentdialogOpen,setUpdateAgentdialogOpen] = useState(false)

    const {data} = useSuspenseQuery(trpc.agents.getOne.queryOptions({id:agentId}))

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async ()=>{
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
                router.push('/agents')
            },
            onError:(error)=>{
                toast.error(error.message)
            }
        })
    )

    const [RemoveConfirmation,confrimRemove] = useConfirm(
        "Are you sure?",
        `The follwing action will remove ${data.meetingCount} associated meetings`
    )

    const handleRemoveAgent = async ()=>{
        const ok = await confrimRemove()
        if(!ok) return 
        await removeAgent.mutateAsync({id:agentId})
    }

    

    return (
        <>
            <RemoveConfirmation />
            <UpdateAgentDialog 
                open={updateAgentdialogOpen}
                onOpenChange={setUpdateAgentdialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <AgentIdViewHeader 
                agentId={agentId}
                agentName={data.name}
                onEdit={()=>setUpdateAgentdialogOpen(true)}
                onRemove={handleRemoveAgent}
            />    

            <div className="bg-white rounded-lg border">
                <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                    <div className="flex items-center gap-x-3">
                        <GeneratedAvatar 
                            variant="botttsNeutral"
                            seed={data.name}
                            classname="size-10"
                        />
                        <h2 className="text-2xl font-medium">{data.name}</h2>
                    </div>

                    <Badge className="flex items-center gap-x-2 [&>svg]:size-4">

                      <VideoIcon/>      
                      {data.meetingCount} {data.meetingCount===1?"meeting":"meetings"}
                    </Badge>
                    <div className="flex flex-col gap-y-4">
                        <p className="text-lg font-medium">Instruction</p>
                        <p className="text-neutral-800 text-sm">{data.instructions}</p>

                    </div>

                </div>
            </div>

        </div>
        </>
    )

}

export const AgentsIdViewLoading = ()=>{
    return <LoadingState
        title="Loading Agent"
        description="This may take some time"
    />
}

export const AgentsIdViewError = ()=>{
    return <ErrorState 
        title="Error Loading Agent" 
        description="Something went wrong"
    />
}