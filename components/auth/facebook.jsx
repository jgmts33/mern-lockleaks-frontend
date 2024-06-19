import { Button } from "@nextui-org/react";
import { Facebook } from "../utils/Icons";
import { googleAuth } from "@/axios/auth";
import { setUserInfo } from '@/lib/auth/authSlice';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function FaceBookAuth() {

  const icons = {
    facebook: <Facebook />,
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleFacebookAuth = async () => {

    const stringifiedParams = queryString.stringify({
      client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      redirect_uri: 'https://lockleaks.com/auth/facebook',
      scope: ['email', 'user_friends'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });

    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`

    router.push(facebookLoginUrl);
  }


  return <>
    {
      process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ? <Button
        radius="lg"
        className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600"
        size='md'
        onClick={handleFacebookAuth}
      >
        {icons.facebook}
      </Button> : <></>
    }
  </>
}