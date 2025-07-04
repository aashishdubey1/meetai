'use client';

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
// import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";
// import { useAgentsFilters } from "../../hooks/use-agents-filters";
// import { AgentsSearchFilter } from "./agents-search-filters";
// import { DEFAULT_PAGE } from "@/constant";

export const MeetingsListHeader = ()=>{

    const [isDialogOpen,setIsDialogOpen] = useState(false)
    // const [filters,setFilters] = useAgentsFilters();

    // const isAnyFilterModified = !!filters.search;

    // const onClearFilters = () => {
    //     setFilters({
    //         search:"",
    //         page:DEFAULT_PAGE
    //     })
    // }

    return (
        <>
        <NewMeetingDialog open ={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="text-2xl font-medium">My Meetings</h5>
                <Button onClick={()=>setIsDialogOpen(true)}>
                    <PlusIcon />
                    New Meeting
                </Button>
            </div>
            {/* <div className="flex items-center gap-x-2 p-1" >
                <AgentsSearchFilter />
                {isAnyFilterModified && (
                    <Button variant='outline' size='sm' onClick={onClearFilters}>
                        <XCircleIcon /> Clear
                    </Button>
                )}
            </div> */}
        </div> 

        </>
    )
}