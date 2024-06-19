import { Button } from "@nextui-org/react";
import { Twitter } from "../utils/Icons";
import { googleAuth } from "@/axios/auth";
import { setUserInfo } from '@/lib/auth/authSlice';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function FaceBookAuth() {

  const icons = {
    twitter: <Twitter />,
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleTwitterAuth = async () => {



    const stringifiedParams = queryString.stringify({
      client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
      redirect_uri: 'https://lockleaks.com/auth/twitter',
      state: 'twitter-increaser-state',
      response_type: 'code',
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(" "),
      prompt: 'consent',
      incluse_granted_scopes: 'true',
      enable_granular_consent: 'true'
    });

    const twitterLoginUrl = `https://twitter.com/i/oauth2/authenticate?${stringifiedParams}`

    router.push(twitterLoginUrl);
  }


  return <>
    {
      process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID ? <Button
        radius="lg"
        className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600"
        size='md'
        onClick={handleTwitterAuth}
      >
        {icons.twitter}
      </Button> : <></>
    }
      </>
    }