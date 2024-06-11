import { twitterAuth } from "@/axios/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/lib/auth/authSlice';

export default function VerifyCode() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  (async () => {
    if (searchParams.get("code")) {
      const res = await twitterAuth(searchParams.get("code"));

      if (res.status === 'success') {
        dispatch(setUserInfo({ ...res.data }));
        setTokens(res.data.tokens);
        if ( res.data.roles.find(p => p == 'moderator') ) router.push('/admin/dashboard');
        else router.push('/app/dashboard');
      }
    }
    else {
      router.push("/auth/login");
    }
  })();
}