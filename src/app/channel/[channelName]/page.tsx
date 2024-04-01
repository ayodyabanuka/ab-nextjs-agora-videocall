"use client"

import Call from "@/components/call"
import { useEffect } from "react"


export default function Page({ params }: { params: { channelName: string } }) {
       useEffect(() => {
              console.log(process.env.PUBLIC_AGORA_APP_ID!);

       }, [])
       return (

              <main className="flex w-full flex-col">
                     <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
                            {params.channelName!}
                     </p>
                     <Call appId={'5ad9d828d4ab48c08c08d195fee669c5'} channelName={params.channelName}></Call>
              </main>
       )
}