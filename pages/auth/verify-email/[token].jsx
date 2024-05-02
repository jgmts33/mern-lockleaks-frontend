import { useRouter } from "next/router";
import { useEffect } from "react";
import { verifyEmail } from "@/axios/auth";
import { useDispatch } from "react-redux";

export default function VerifyEmail() {

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (router.query.token) {
        const res = await verifyEmail(router.query.token);

        if (res.status === 'success') {
          dispatch(setUserInfo({ ...res.data }));
          // Email verification successful
          router.push('/app/dashboard');
        }
      }
    })();
  }, [router]);

  return <></>
}