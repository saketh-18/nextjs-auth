"use client";

import { SignUpUser } from "@/actions";
import CommonInput from "@/components/common-Layout";
import { Button } from "@/components/ui/button";
import { initialSignUpFormData, signUpFormControls } from "@/utils";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  console.log(signUpFormData);

  async function handleSubmit(){
    const res = await SignUpUser(signUpFormData );

    if(res && res.success){
      console.log(signUpFormData);
      console.log("user registered succesfully");
      redirect("/sign-in");
    }
    else {
      console.log(("error registering user"));
    }
  }

  return (
    <div className="w-1/4 m-4 p-2 gap-2 flex flex-col">
    <p className="text-3xl font-semibold text-slate-800">Sign Up</p>
      {signUpFormControls.map((controlItem) => 
         (
        <CommonInput
          FormControls={controlItem}
          value={signUpFormData[controlItem.name]}
          setValue={(event) => {
            setSignUpFormData({ ...signUpFormData , [event.target.name] : event.target.value });
          }}
        /> )
      )}
      <Button variant="" className="bg-zinc-700 hover:bg-zinc-500 rounded text-white text-lg mt-3" onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
}
