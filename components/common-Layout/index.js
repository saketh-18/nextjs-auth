
import { Input } from "../ui/input";
import { Label } from "../ui/label";


export default function CommonInput({FormControls , value , setValue}){
    return (
        <div className="gap-2">
            <Label>{FormControls.label}</Label>
            <Input 
                className="rounded"
                name={FormControls.name}
                type={FormControls.type}
                placeholder={FormControls.placeholder}
                value={value}
                onChange={setValue}
            />
        </div>
    )
}