import { useRouter } from "next/router";
import { useEffect } from "react";
import { verifyEmail } from "../../../axios/auth";

export default function VerifyEmail() {

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.query.token) {
        const res = await verifyEmail(router.query.token);

        if (res.status === 'success') {
          // Email verification successful
          router.push('/app/dashboard');
        }
      }
    })();
  }, [router]);

  return <></>
}