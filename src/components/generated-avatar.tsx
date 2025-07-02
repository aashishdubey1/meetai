import {createAvatar} from '@dicebear/core'
import {initials,botttsNeutral} from '@dicebear/collection'

import { cn } from '@/lib/utils'
import { Avatar ,AvatarFallback,AvatarImage} from './ui/avatar'
import { init } from 'next/dist/compiled/webpack/webpack';

interface GeneratedAvatarProp {
    seed:string,
    classname?: string;
    variant:"botttsNeutral" | "intials"
}

const GeneratedAvatar = ({seed,classname,variant}:GeneratedAvatarProp) =>{
    let avatar;

    if(variant === "botttsNeutral"){
        avatar = createAvatar(botttsNeutral,{seed})
    }else{
        avatar = createAvatar(initials,{
            seed,
            fontWeight:500,
            fontSize:42
        })
    }

    return (
        <Avatar className={classname}>
            <AvatarImage src={avatar.toDataUri()}/>
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    )

}

export default GeneratedAvatar