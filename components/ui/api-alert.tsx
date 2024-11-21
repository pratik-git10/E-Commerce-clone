"use client";

import { Check, Clipboard, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import { useState } from "react";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const [check, setCheck] = useState(false); // checking for copy function

  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied");

    setCheck(true); // Set copied to true
    setTimeout(() => setCheck(false), 2000); // Reset after 1 seconds
  };

  return (
    <Alert>
      <Server className="h-4 w-4 " />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy} className="">
          {check ? (
            <Check className="h-4 w-4 text-black transition-opacity duration-1000 ease-in-out opacity-100" />
          ) : (
            <Clipboard className="h-4 w-4 transition-opacity duration-1000 ease-in-out opacity-100" /> //check or clipboard
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
};
