import "@/styles/globals.css"

import { type AppType } from "next/app"
import Head from "next/head"
import { Toaster } from "react-hot-toast"

import { api } from "@/utils/api"

const MyApp: AppType = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>todo-app</title>
      <meta name="description" content="This is a simple todo app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Toaster />
    <Component {...pageProps} />
  </>
)

export default api.withTRPC(MyApp)
