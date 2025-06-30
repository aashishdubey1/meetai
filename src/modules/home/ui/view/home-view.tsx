'use client';
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export  function HomeView() {
  const router = useRouter()
  const {data:session} = authClient.useSession()

  if(!session){
    return <p>Loading...</p>
  }


  return (
    <div className="bg-black h-screen p-10 text-white text-2xl flex flex-col gap-y-5">
      <p>Logged in as {session.user.name}</p>
      <Button className="w-30" onClick={()=>authClient.signOut({
        fetchOptions:{
          onSuccess: ()=> router.push('/sign-in')
        }
      })}>Log Out</Button>
    </div>
  )
}
