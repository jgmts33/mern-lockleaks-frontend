import { Button } from "@nextui-org/react";
import { Twitter } from "../utils/Icons";
import { googleAuth } from "@/axios/auth";
import { setUserInfo } from '@/lib/auth/authSlice';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function FaceBookAuth() {

  const icons = {
    twitter: <Twitter fill="currentColor" size={16} />,
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleTwitterAuth = async () => {

    const stringifiedParams = queryString.stringify({
      client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
      redirect_uri: 'https://copyrightfixer.com/auth/twitter/',
      state: 'state',
      response_type: 'code',
      code_challenge: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET,
      code_challenge_method: 'S256',
      scope: ["users.read", "tweet.read", "follows.read", "follows.write"]
    });

    const facebookLoginUrl = `https://twitter.com/i/oauth2/authorize?${stringifiedParams}`

    router.push(facebookLoginUrl);
  }


  return <Button
    radius="lg"
    className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600"
    size='md'
    onClick={handleTwitterAuth}
  >
    {icons.twitter}
  </Button>
}