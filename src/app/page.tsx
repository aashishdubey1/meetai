'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


export default function Home() {
  const {data:session} = authClient.useSession()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  const onSubmit =  ()=>{
     authClient.signUp.email({
      password,
      name,
      email,
    },
    {
      onError:(ctx)=>{
        window.alert("Somthing Went wrong");
      },
      onSuccess:(ctx)=>{
        window.alert("Success");
      }
    }
  )
  setEmail("")
  setName("")
  setPassword("")
  }

  const onLogin = ()=>[
    authClient.signIn.email({
      email,
      password
    }
  )
  ]

if(session){
  return (
    <div className="bg-black h-screen p-10 text-white text-2xl flex flex-col gap-y-5">
      <p>Logged in as {session.user.name}</p>
      <Button className="w-30" onClick={()=>authClient.signOut()}>Log Out</Button>
    </div>
  )
}


  return (
    <div className="bg-black h-screen p-10">
      {/* <div className="bg-black px-5 py-2">
        <div className='relative h-16 w-16 m-5'>
          <div className="absolute top-0 bottom-3 bg-gradient-to-tr from-amber-50 to-amber-100 h-full w-full blur-md"></div>
          <div className="bg-black h-full rounded-lg relative border-1 border-white/50 hover:border-white/70"></div>
      </div>
      </div> */}
      <div className="flex flex-col gap-5 text-white p-5 bg-neutral-900 w-lg rounded border border-white my-3">
        <Input 
          className="w-sm" 
          placeholder="Email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
        />
        <Input 
          className="w-sm" 
          placeholder="Password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button 
          className="active:scale-95 w-30 border border-white"
          onClick={onLogin}>
          Log IN
        </Button>
      </div>
      <div className="flex flex-col gap-5 text-white p-5 bg-neutral-900 w-lg rounded border border-white">
        <Input 
          className="w-sm"
          placeholder="Name"
          value={name} 
          onChange={(e)=>setName(e.target.value)}
        />
        <Input 
          className="w-sm" 
          placeholder="Email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
        />
        <Input 
          className="w-sm" 
          placeholder="Password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button 
          className="active:scale-95 w-30 border border-white"
          onClick={onSubmit}>
          Create User
        </Button>
      </div>
    </div>
  )  
}
