
'use clint'

import { authClient } from "@/lib/auth-client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'

import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import GeneratedAvatar from "@/components/generated-avatar"
import { ChevronDownCircleIcon, ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"

const DashboardUserButton = () => {

    const router = useRouter();
    const isMobile = useIsMobile()

    const {data,isPending} = authClient.useSession()

    const onLogout =  ()=>{
         authClient.signOut({
            fetchOptions:{
                onSuccess:()=>router.push('/sign-in')
            }
        })
    }

    if(isPending || !data?.user) {
        return null
    }

    if(isMobile){
        return(
            <Drawer >
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-center bg-[#222831]/5 hover:bg-[#222831]/10 overflow-hidden gap-2.5">
                {data.user.image?(
                <Avatar>
                    <AvatarImage src={data.user.image}/>  
                </Avatar>
            ): (
                <GeneratedAvatar seed={data.user.name} variant="intials" classname="size-9 mr-3"/>
            ) }
            <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                <p className="text-sm truncate w-full">{data.user.name}</p>
                <p className="text-xs truncate w-full">{data.user.email}</p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0"/>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                            variant="outline"
                            onClick={()=>{}}
                        >
                            <CreditCardIcon className="size-4 text-black"/>
                            Billing
                        </Button>
                        <Button
                            variant="outline"
                            onClick={()=>{}}
                        >
                            <LogOutIcon className="size-4 text-black"/>
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }


  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-center bg-[#222831]/5 hover:bg-[#222831]/10 overflow-hidden gap-2.5">
            {data.user.image?(
                <Avatar>
                    <AvatarImage src={data.user.image}/>  
                </Avatar>
            ): (
                <GeneratedAvatar seed={data.user.name} variant="intials" classname="size-9 mr-3"/>
            ) }
            <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                <p className="text-sm truncate w-full">{data.user.name}</p>
                <p className="text-xs truncate w-full">{data.user.email}</p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="right" className="w-72 bg-[#000000]/50 text-white" >
            <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                    <span className="font-medium truncate">{data.user.name}</span>
                    <span className="font-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=" cursor-pointer flex items-center justify-between !hover:bg-red-300">
                Billing 
                <CreditCardIcon  className="size-4"/>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center justify-between"
                onClick={onLogout}
            >
                Logout
                <LogOutIcon className="size-4" />
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DashboardUserButton