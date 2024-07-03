"use client";

import { signInUser } from "@/actions";
import CommonInput from "@/components/common-Layout";
import { Button } from "@/components/ui/button";
import { initialSignInFormData, signInFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  console.log(signInFormData);
  const router = useRouter();

  async function handleSignIn(){
    const res = await signInUser(signInFormData , "/");

    if(res.success){
      console.log('succesfully logged in')
       router.push("/")
    }
  }

  return (
    <div className="w-1/4 m-4 p-2 gap-2 flex flex-col">
    <p className="text-3xl font-semibold text-slate-800">Sign In</p>
      {signInFormControls.map((controlItem) => (
        <CommonInput
          FormControls={controlItem}
          value={signInFormData[controlItem.name]}
          setValue={(event) => {
            setSignInFormData({ ...signInFormData , [event.target.name] : event.target.value });
          }}
        />
      ))}
      <Button variant="" className="bg-zinc-700 hover:bg-zinc-500 rounded text-white text-lg mt-3" onClick={handleSignIn}>Sign In</Button>
    </div>
  );
}
