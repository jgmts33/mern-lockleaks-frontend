import { Button } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import { Google } from "../utils/Icons";
import { googleAuth } from "@/axios/auth";
import { setUserInfo } from '@/lib/auth/authSlice';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function GoogleAuth() {

  const icons = {
    google: <Google />,
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleAuth = async () => {

    const stringifiedParams = queryString.stringify({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: 'https://lockleaks.com/auth/google',
      // redirect_uri: 'http://localhost:3000/auth/google',
      response_type: 'code',
      prompt: 'select_account',
      include_granted_scopes: 'true',
      enable_granular_conset: 'true',
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me'
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`

    router.push(googleLoginUrl);
  }


  return <>
    {
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? <Button
        radius="lg"
        className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600"
        size='md'
        onClick={handleGoogleAuth}
      >
        {icons.google}
      </Button> : <></>
    }
  </>
}