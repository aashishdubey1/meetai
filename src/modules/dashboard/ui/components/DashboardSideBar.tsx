'use client'

import { Separator } from "@/components/ui/separator"
import {
     Sidebar,
     SidebarContent,
     SidebarFooter,
     SidebarGroup,
     SidebarGroupContent,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem

 } from "@/components/ui/sidebar" 
import { cn } from "@/lib/utils"
import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DashboardUserButton from "./DashboardUserButton"


const firstSection = [
    {
        icon:VideoIcon,
        label:"Meetings",
        href:'/meetings'
    },
    {
        icon:BotIcon,
        label:"Agents",
        href:'/agents'
    }
]

const secondSection = [
    {
        icon:StarIcon,
        label:"Upgrade",
        href:"/upgrade"
    }
]



const DashboardSideBar = ()=>{
    // const pathanme = usePathname()
    const pathname =  '/agent'
    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href={'/'} className="flex items-center gap-2 px-2 pt-2">
                    <Image src={'./logo.svg'} alt="Meet.Ai" height={36} width={40}/>
                    <p className="text-xl font-semibold">Meet.Ai</p>
                </Link>
                <div className="px-x py-2">
                    <Separator className="opacity-30 bg-[#222831]"/>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item)=>(
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#222831]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 transition-all",
                                        pathname === item.href && "bg-linear-to-r/oklch border-[#222831]/20"
                                    )}
                                    isActive={pathname===item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5"/>
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-2 py-2">
                    <Separator className="opacity-30 bg-[#222831]"/>
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item)=>(
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#222831]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 transition-all",
                                        pathname === item.href && "bg-linear-to-r/oklch border-[#222831]/20"
                                    )}
                                    isActive={pathname===item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5"/>
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="flex">
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}

export default DashboardSideBar