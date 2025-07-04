'use client'

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meetings-form";
import { MeetingGetOne } from "../../types";



interface NewMeetingDialogProps {
    open:boolean,
    onOpenChange:(open:boolean)=>void;
    initialValues:MeetingGetOne
}

export const UpdateMeetingDialog = ({
    open,
    onOpenChange,
    initialValues
}:NewMeetingDialogProps) => {

    return (
        <ResponsiveDialog
            title="Edit Meeting"
            description="Edit the meetings details"
            open={open}
            onOpenChange={onOpenChange}
        >
        <MeetingForm onSuccess={(id)=>{
            onOpenChange(false)
        }}
        onCancle={()=>onOpenChange(false)}
        initialValues={initialValues}
         
        />
        </ResponsiveDialog>
    )

}


{/* <MeetingForm
            onSuccess={()=>onOpenChange(false)}
            onCancle={()=>onOpenChange(false)}
        /> */}