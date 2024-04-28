import { Button } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import { Google } from "../utils/Icons";
import { googleAuth } from "@/axios/auth";
import { setUserInfo } from '@/lib/auth/authSlice';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function GoogleAuth() {

  const icons = {
    google: <Google fill="currentColor" size={16} />,
  };
  
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (codeReponse) => {

      const res = await googleAuth(codeReponse.code)

      if (res.status === 'success') {
        dispatch(setUserInfo({ ...res.data }));
        router.push("/app/dashboard");
      } else {
        console.log(res.data);
      }

    },
    flow: 'auth-code',
    scope: ['openid'],
  });


  return <Button
    radius="lg"
    className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600"
    size='md'
    onClick={handleGoogleAuth}
  >
    {icons.google}
  </Button>
}