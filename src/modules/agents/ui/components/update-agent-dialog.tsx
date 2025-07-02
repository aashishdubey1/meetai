import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Description } from "@radix-ui/react-dialog";
import { AgentForm } from "./agents-from";
import { AgentGetOne } from "../../types";


interface NewAgentDialogProps {
    open:boolean,
    onOpenChange:(open:boolean)=>void;
    initialValues: AgentGetOne
}

export const UpdateAgentDialog = ({
    open,
    onOpenChange,
    initialValues
}:NewAgentDialogProps) => {

    return (
        <ResponsiveDialog
            title="New Agent"
            description="Edit the agent details"
            open={open}
            onOpenChange={onOpenChange}
        > <AgentForm
            onSuccess={()=>onOpenChange(false)}
            onCancle={()=>onOpenChange(false)}
            initialValues={initialValues}
        />
        </ResponsiveDialog>
    )

}