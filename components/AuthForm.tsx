"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.action";
const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();

  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  // const hi = () => {
  //   // console.log("Form submitted:", data); // Log the form data
  //   console.log("Form Errors:", form.formState.errors);
  //   console.log("hi");
  // };
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsloading(true);
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
      if (type === "sign-in") {
        console.log(type);
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <section className="auth-form">
      <header>
        <div className="flex flex-col gap-5 md:gap-8">
          <Link href="/" className=" flex items-center gap-1 cursor-pointer">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon icon"
            />
            <h1 className="text-26 text-black-1 font-bold font-ibm-plex-serif">
              Horizon
            </h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user
                ? "Link Account"
                : type === "sign-in"
                ? "Sign In"
                : "Sign Up"}
            </h1>
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </div>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/*  */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      name={"firstName"}
                      label={"First Name"}
                      placeholder={"Enter your firstname"}
                      control={form.control}
                    />
                    <CustomInput
                      name={"lastName"}
                      label={"Last Name"}
                      placeholder={"Enter your lastname"}
                      control={form.control}
                    />
                  </div>
                  <CustomInput
                    name={"address1"}
                    label={"Address"}
                    placeholder={"Enter your specifc Address"}
                    control={form.control}
                  />
                  <CustomInput
                    name={"city"}
                    label={"City"}
                    placeholder={"Enter your city name"}
                    control={form.control}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      name={"state"}
                      label={"State"}
                      placeholder={"Example: NY"}
                      control={form.control}
                    />
                    <CustomInput
                      name={"postalCode"}
                      label={"Postal Code"}
                      placeholder={"Example: 11101"}
                      control={form.control}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      name={"dateOfBirth"}
                      label={"Date of Birth"}
                      placeholder={"yyyy-mm-dd"}
                      control={form.control}
                    />
                    <CustomInput
                      name={"ssn"}
                      label={"SSN"}
                      placeholder={"Example: 1234"}
                      control={form.control}
                    />
                  </div>
                </>
              )}
              <CustomInput
                name={"email"}
                placeholder={"Enteryour email"}
                label={"Email"}
                control={form.control}
              />
              <CustomInput
                name={"password"}
                placeholder={"Enteryour password"}
                label={"Password"}
                control={form.control}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isloading}>
                  {isloading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an Accont?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "sign Up" : "/sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
