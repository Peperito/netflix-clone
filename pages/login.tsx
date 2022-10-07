import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import img from "../public/testlogo.png"
import { useForm, SubmitHandler } from "react-hook-form";
import { signInAnonymously, signInWithPopup } from "firebase/auth";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string
  password: string
}
 

const Login = () => {

  const [login, setLogin] = useState(false)
  const {signIn, signUp} = useAuth()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
    if(login){
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }


  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent space-y-6">
      <Head>
        <title>NetflixClone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src="https://rb.gy/p2hphi" alt="bg" layout="fill" className="-z-10 !hidden opacity-60 sm:!inline" />
      <Image src={img} alt="logo" width="150" height="150" className="absolute left-4 top-4 object-contain md:left-10 md:top-6"/>
      <div className="relative mt-24 space-y-8 bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-2xl font-semibold mb-6">Welcome!</h1>
        <div className="flex flex-col space-y-4">
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className="input" {...register("email", {required: true})} />
            {errors.email && <p className="p-1 text-sm font-light text-red-400"> Enter Valid Email</p>}
          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Password" className="input" {...register("password", {required: true})} />
            {errors.password && <p className="p-1 text-sm font-light text-red-400"> Password required</p>}
          </label>
        </div>
        <button type="submit" className="p-4 mt-12 bg-orange-400 w-full rounded-lg shadow-md text-xl font-semibold"
        onClick={() => setLogin(true)}
        >Sign-in</button>

        <div className="flex mt-4 space-x-2">
        <h2>New to Netflix Clone?</h2>
        <button type="submit" onSubmit={handleSubmit(onSubmit)} className="decoration-orange-400 decoration-2 underline cursor-pointer rounded" onClick={() => setLogin(false)}>Sign Up</button>
      </div>
      </form>
      </div>
    </div>
  )
}

export default Login