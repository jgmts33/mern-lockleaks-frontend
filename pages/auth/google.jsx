import { useEffect } from "react";
import { googleAuth } from "@/axios/auth";
import { useSearchParams } from "next/navigation";

export default function VerifyCode() {

  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      if (searchParams.get("code")) {
        const res = await googleAuth(searchParams.get("code"));

        if (res.status === 'success') {
          // Email verification successful
          router.push('/app/dashboard');
        }
      }
    })();
  }, [searchParams]);

  return <></>
}