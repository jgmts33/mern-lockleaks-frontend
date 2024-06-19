import { useRouter } from "next/router";
import { useEffect } from "react";
import { verifyEmail } from "@/axios/auth";
import { useDispatch } from "react-redux";
import { Spinner } from "@nextui-org/react";

export default function VerifyEmail() {

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (router.query.token) {
        const res = await verifyEmail(router.query.token);

        if (res.status === 'success') {
          if (res.data?.roles.find(p => p == 'moderator')) window.open('/admin/dashboard', '_self');
          else window.open('/app/dashboard', '_self');
        }
      }
    })();
  }, [router]);

  return (
    <div className='w-full flex flex-col gap-2 justify-center mt-10 min-h-[calc(100vh-600px)] items-center'>
      <Spinner />
      <p>Verifying Email , please wait...</p>
    </div>
  )
}