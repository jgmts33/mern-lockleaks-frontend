import { useEffect } from "react";
import { facebookAuth } from "@/axios/auth";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {

  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      if (searchParams.get("code")) {
        const res = await facebookAuth(searchParams.get("code"));

        if (res.status === 'success') {
          // Email verification successful
          router.push('/app/dashboard');
        }
      }
    })();
  }, [searchParams]);

  return <></>
}