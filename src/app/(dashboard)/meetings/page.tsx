import { auth } from "@/lib/auth"
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meeting-list-header"
import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/modules/meetings/ui/view/meetings-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { HydrationBoundary } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { loadSearchParams } from "@/modules/agents/params"
import type { SearchParams } from "nuqs/server"


interface Props {
    searchParams:Promise<SearchParams>
}

const Page = async ({searchParams}:Props)=>{

    const filters = await loadSearchParams(searchParams);

    const session = await auth.api.getSession({
        headers:await headers()
    })

    if(!session){
        redirect('/sign-in')
    }

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({...filters})
    )

    return (
       <>
       <MeetingsListHeader />
        <HydrationBoundary>
            <Suspense fallback={<MeetingsViewLoading/>}>
                <ErrorBoundary fallback={<MeetingsViewError />}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
       </>
    )
}

export default Page