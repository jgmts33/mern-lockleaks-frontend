import { useEffect } from "react";
import { googleAuth } from "@/axios/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function VerifyCode() {

  const searchParams = useSearchParams();
  const router = useRouter();

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