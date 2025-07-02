
import {JSX,useState} from 'react';

import {Button} from '@/components/ui/button'

import { ResponsiveDialog } from '@/components/responsive-dialog';

export const useConfirm = (
title:string,
description:string
):[()=>JSX.Element,()=>Promise<unknown>]=>{

    const [promise,setPromise] = useState<{
        resolve:(value:boolean)=>void
    }|null>(null)

    const confirm = () => {
        return new Promise((resolve)=>{
            setPromise({resolve})
        })
    }

    const handleClose = () =>{
        setPromise(null)
    }

    const handleconfirm = () =>{
        promise?.resolve(true)
        handleClose()
    }

    const handleCancle = ()=>{
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmationDialog = () => (
        <ResponsiveDialog
            open={promise !== null}
            onOpenChange={handleClose}
            title={title}
            description={description}
        >
            <div className='pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 justify-end'>
                <Button onClick={handleCancle} variant='outline'
                className='lg:auto'
                >
                    Cancle
                </Button>
                <Button onClick={handleconfirm}
                className='lg:auto'
                >
                    Confirm
                </Button>
            </div>
        </ResponsiveDialog>
    )


    return [ConfirmationDialog,confirm]

}