"use client";
import {
  Button
} from '@nextui-org/react';
import { Shine, Fan, Lock, Support, ThumbUp, Protect, Star, Twitter, ChevronLeft, ChevronRight, IconSuccess, Profile, Chat, Tip } from "@/components/utils/Icons";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CustomerReview from '@/components/customer-review';
import { useRouter } from 'next/navigation';
import { getCookieValue } from '@/axios/token';
import { Crisp } from 'crisp-sdk-web';

export default function HomePage() {
  const router = useRouter();

  const icons = {
    left: <ChevronLeft />,
    right: <ChevronRight />,
    shine: <Shine />,
    fan: <Fan />,
    lock: <Lock />,
    support: <Support />,
    thumbup: <ThumbUp />,
    protect: <Protect />,
    star: <Star />,
    twitter: <Twitter />,
    success: <IconSuccess />,
    chat: <Chat />,
    profile: <Profile />,
    tip: <Tip />,
  };

  const assistSecionItems = [
    [
      { title: "Reclaiming Your Rights", content: "Losing money and respect due to pirated content.", icon: icons.support },
      { title: "Protecting Your Brand Image", content: "The risk of your brand being compromised by impostors.", icon: icons.fan },
    ],
    [
      { title: "Stress-Free, Piracy-Free", content: "Discovering content leaks can be stressful.", icon: icons.thumbup },
      { title: "Ensured Privacy, Enhanced Sales", content: "Stolen content impacting sales and reputation.", icon: icons.protect }
    ]
  ];

  const services = [
    {
      name: "Protect Content Now!",
      description: <div className='outline-none px-10 py-10'>
        <p>Upon detecting any infringing content, our expert agents act promptly by issuing DMCA takedown notices to the relevant internet authorities.We diligently remove any* illicit copies of your content identified through both software and manual scans.</p>
        <p className='mt-10'>Our strong affiliations with file hosting sites ensure swift consideration of our DMCA takedown notices, aligning with our clients business policies.*Limited by DMCA compliance.</p>
      </div>,
      img: "assets/services/takedown.svg"
    },
    {
      name: "Delist",
      description: <div className='outline-none px-10 py-10'>
        <p>Delist holds membership in Google's Trusted Copyright Removal Program, leading to the rapid delisting of any reported infringing content.</p>
        <p className='mt-10'>Please note, we refrain from reporting referrals, reviews, affiliates, and any content you wish to retain.</p>
        <p>We boast a perfect track record, removing 100% of reported infringing content from Google Search, Google Video, and Google Images, also covering Microsoft Bing.</p>
      </div>,
      img: "assets/services/delist.svg"
    },
    {
      name: "Artificial Intelligence",
      description: <div className='outline-none px-10 py-10'>
        <p>Incorporating facial recognition software, machine learning, optical character recognition, and an array of algorithms developed by our experts, we fortify content protection against copyright infringements on:</p>
        <ul className='mt-10 list-disc pl-4'>
          <li>Google Images</li>
          <li>Google Videos</li>
          <li>Additionally, these tools are utilized on various social media platforms, including Facebook, Instagram, TikTok, Reddit, X / Twitter, blogs, and other websites</li>
        </ul>
      </div>,
      img: "assets/services/artifical-intelligence.svg"
    },
    {
      name: "Personal Agent",
      description: <div className='outline-none px-10 py-10'>
        <p>Our adept agents conduct manual scans for copyright infringements utilizing your specified usernames and chosen keywords on multiple platforms:</p>
        <ul className='mt-10 list-disc pl-4'>
          <li>Google Search, Images & Videos</li>
          <li>Web-streaming sites</li>
          <li>Forums</li>
          <li>Reddit</li>
          <li>Twitter</li>
          <li>Tiktok</li>
          <li>Instagram</li>
        </ul>
        <p>Our support team remains available seven days a week via live chat to extend further assistance.</p>
      </div>,
      img: "assets/services/personal-agent.svg"
    },
    {
      name: "Impersonation",
      description: <div className='outline-none px-10 py-10'>
        <p>Your brand is shielded from fraudulent accounts, impersonators, and harassment on various platforms including:</p>
        <ul className='mt-10 list-disc pl-4'>
          <li>Reddit</li>
          <li>Instagram</li>
          <li>X / Twitter</li>
          <li>TikTok</li>
          <li>YouTube</li>
          <li>Telegram</li>
          <li>Facebook</li>
        </ul>
      </div>,
      img: "assets/services/impersonation.svg"
    },
    {
      name: "Scan",
      description: <div className='outline-none px-10 py-10'>
        <p>Our proprietary software scours the internet, uncovering brand copyright infringements, complemented by meticulous manual scans performed by our adept agents. We meticulously scrutinize:</p>
        <ul className='mt-10 list-disc pl-4'>
          <li>Results from Google Search, Images, and Videos</li>
          <li>Diverse websites including video-streaming platforms, forums, peer-to-peer sites, and more, totaling over 100,000 inspected websites</li>
          <li>File hosting services</li>
          <li>Social media platforms such as Reddit, Instagram, Twitter, and TikTok</li>
        </ul>
      </div>,
      img: "assets/services/scan.svg"
    },
    {
      name: "DMCA BADGES",
      description: <div className='outline-none px-10 py-10'>
        <p>This service involves providing DMCA badges that can be integrated into clients' websites or platforms to indicate that the respective content is protected by copyright and is subject to DMCA (Digital Millennium Copyright Act) policies.</p>
        <p className='mt-10'> These badges offer a visual notification and signal to potential users that the content is protected, highlighting the presence of legal measures for any copyright violations.</p>
      </div>,
      img: "assets/services/dmca-badges.svg"
    },
    {
      name: "Anonymity",
      description: <div className='outline-none px-10 py-10'>
        <p>Filing a DMCA complaint often necessitates divulging personal information like real names, contact numbers, and addresses. Protecting your anonymity is our top priority; hence, we utilize our company’s contact information to lodge DMCA complaints on your behalf.</p>
        <p className='mt-10'> Several internet companies store personal information in publicly accessible databases like the Lumen database used by Twitter and Google. Rulta takes extra precautions to safeguard your identity.</p>
      </div>,
      img: "assets/services/anonymity.svg"
    },
    {
      name: "Specialists in Content Creator and Cam Model",
      description: <div className='outline-none px-10 py-10'>
        <p>This service entails providing DMCA badges that can be integrated into clients' websites or platforms to indicate that the respective content is protected by copyright and adheres to DMCA (Digital Millennium Copyright Act) policies. </p>
        <p className='mt-10'> These badges serve as visual notifications and signals to potential users that the content is protected, and legal actions will be taken in case of copyright violations.</p>
      </div>,
      img: "assets/services/content-creator.svg"
    },
    {
      name: "Re-verify & Re-analyzer",
      description: <div className='outline-none px-10 py-10'>
        <p>This functionality involves repetitive scans and periodic updates to identify and evaluate any new copyright infringements or reintroduced content. It ensures constant monitoring of illegal activities and helps rediscover previously undetected content, ensuring all violations are appropriately managed and eliminated, maintaining high-security standards for copyrighted content.what need be here.</p>
      </div>,
      img: "assets/services/reverify-reanalyzer.svg"
    },
    {
      name: "Username History Recovery & Removal",
      description: <div className='outline-none px-10 py-10'>
        <p>This service is specially designed for models on cam platforms but can also be adapted and used for models on OnlyFans. The function is intended for recovering and removing content associated with multiple usernames used by the same individuals.</p>
        <p className='mt-10'>  This service provides a historical perspective on content associated with various online identities of a user and helps in removing unauthorized or unwanted content associated with these identities, thereby safeguarding the model's online image and security.</p>
      </div>,
      img: "assets/services/removal.svg"
    },
    {
      name: "Monthly Analytics & PDF Reports",
      description: <div className='outline-none px-10 py-10'>
        <p>This service entails generating detailed monthly reports in PDF format that provide analysis and perspectives on data. These reports offer a comprehensive view of content performance, analyzing trends, interactions, and other relevant data, providing clients with a detailed overview of their content's evolution and potential future strategies.</p>
      </div>,
      img: "assets/services/analytics.svg"
    },
  ]

  const hoverContent = [
    {
      description: "Through our DMCA service, we recover your content from illegal websites, ensuring your earnings and reputation are safeguarded.",
      bg_color: "from-[#262739] to-[#282147]"
    },
    {
      description: "By removing pirated content, we ensure your brand is shielded from imitators, maintaining an authentic presence in the industry.",
      bg_color: "from-[#27273C] to-[#141528]"
    },
    {
      description: "With continuous monitoring and removal, we secure your privacy, eliminating threats to your sales and standing in the industry.",
      bg_color: "from-[#24233F] to-[#0E0F22]"
    },
    {
      description: "With our assistance, free yourself from piracy-induced stress. Focus on what you do best - creating quality content.",
      bg_color: "from-[#24233F] to-[#1c1342]"
    }
  ]

  const percentDescription = [
    { title: "40K", content: " Infringements Detected" },
    { title: "100,000 ", content: "Websites Crawled Daily", bgColor: true },
    { title: "7+", content: "Years of Experience" },
    { title: "100%", content: "Search Removal Efficiency", bgColor: true },
    { title: "4", content: "Bots AI" },
    { title: "98%", content: " Success Rate in Filehost Removal", bgColor: true },
    { title: "100%", content: "Removal from All Social Media Platforms" },
    { title: "97%", content: " Adult Tube Posts Removal", bgColor: true },
    { title: "100%", content: " Removal of Fake Profiles" }
  ]

  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [animationCounter, setAnimationCounter] = useState(0);
  const [isFlipped, setIsFlipped] = useState(-1);
  const [functionalCookieAllowed, setFunctionalCookieAllowed] = useState(false);

  useEffect(() => {

    if (getCookieValue('functional') == 'allowed') {
      setFunctionalCookieAllowed(true);
    }

    if (screen.width >= 650) {
      const timer = setInterval(() => {
        if (animationCounter === 2) {
          clearInterval(timer);
        }
        setAnimationCounter(p => p + 1);
      }, 300);
      return () => clearInterval(timer);
    }
    else {
      setAnimationCounter(3)
    }
  }, []);

  return (
    <>
      {/* This section for define cookie setting*/}
      <div className="text-white max-w-[1480px] mx-auto">

        <div className='relative flex px-5'>

          {/* This section for define homepage header*/}

          <div className="flex w-full justify-center items-center flex-col relative">
            <div className="text-center max-w-[950px] gap-10 mt-10 max-sm:mt-5">
              <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute -top-44 -left-64 bg-[#0d091a] bg-opacity-5 blur-3xl' />
              <p className="font-bold text-6xl max-lg:text-2xl max-md:mx-auto uppercase whitespace-normal z-10">
                increase your online success with professional copyright protection
              </p>
            </div>
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute -top-44 -right-10 bg-[#0d091a] bg-opacity-5 blur-3xl' />
            <div className='flex w-full justify-center mt-8 relative max-xl:flex-col max-xl:items-center max-xl:mx-auto max-lg:pb-10'>
              <Button
                radius="lg"
                className="bg-gradient-to-tr max-xl:w-[1/2] from-purple-light to-purple-weight text-white shadow-lg px-10 py-7 text-lg"
                size='lg'
                onPress={() => router.push("/pricing")}
              >
                <span>Protect Content Now!</span> {icons.shine}
              </Button>
              <div className={"flex max-w-[422px] duration-700 max-xl:!relative max-xl:mt-10 bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute left-0 top-6 max-xl:top-0 mt-6 max-sm:opacity-100 " + (animationCounter >= 1 ? "opacity-100" : "opacity-0")}>
                <div>{icons.success}</div>
                <div>
                  <p className='font-semibold text-lg mt-3'>Protect Your Content</p>
                  <p className='font-normal text-base mt-2'>Your Creativity Deserves Protection- We've Got You Covered.</p>
                </div>
              </div>
              <div className={"flex max-w-[422px] duration-700 max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute right-20 top-28 max-xl:right-0 max-xl:top-8 max-sm:opacity-100 " + (animationCounter >= 2 ? "opacity-100" : "opacity-0")}>
                <div>{icons.profile}</div>
                <div>
                  <p className='font-semibold text-lg mt-3'>DEFEND YOUR NAME</p>
                  <p className='font-normal text-base mt-2'>Your Brand is Your Legacy, Let Us Be Your Guardians.</p>
                </div>
              </div>
              <div className={"flex max-w-[422px] duration-700 max-xl:!relative max-xl:rotate-0 max-2xl:right-2 max-xl:right-0 max-xl:top-16 bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] rotate-[12deg] z-10 p-5 cursor-pointer absolute right-10 -top-5 max-sm:opacity-100 " + (animationCounter >= 3 ? "opacity-100" : "opacity-0")}>
                <div className='-rotate-[8deg]'>{icons.chat}</div>
                <div>
                  <p className='font-semibold text-lg mt-3'>PROFESSIONAL SUPPORT</p>
                  <p className='font-normal text-base mt-2'>Live Support at Your Fingertips - We're Just a Click Away.</p>
                </div>
              </div>
            </div>

            {/* This section for define chosen by esteemed industry leaders*/}

            <div className="flex flex-col w-full pt-72 text-center items-center max-xl:pt-24">
              <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute top-56 -left-10 bg-[#0d091a] bg-opacity-5 blur-3xl' />
              <p className="text-center font-normal text-xl max-md:justify-center z-10">Increase your online success with professional copyright protection</p>
              <div className="w-full flex flex-wrap justify-center mt-12 gap-8 items-center max-lg:flex-col z-10">
                <Image src="/assets/logos/onlyfans.png" width={154} height={26} alt='onlyfans' />
                <Image src="/assets/logos/myfreecams.png" width={151} height={13} alt='myfreecams' />
                <Image src="/assets/logos/stripchat.png" width={143} height={26} alt='stripchat' />
                <Image src="/assets/logos/patreon.png" width={118} height={32} alt='patreon' />
                <Image src="/assets/logos/manyvids.png" width={186} height={95} alt='manyvids' />
                <Image src="/assets/logos/chaturbate.png" width={136} height={41} alt='chaturbate' />
                <p className="font-normal text-xl">and more</p>
              </div>
              <p className="text-center font-light text-base mt-5 opacity-80">Chosen by esteemed industry leaders</p>
            </div>
          </div>
        </div >

        {/* This section for define we're ready to assist*/}

        <div className='max-lg:px-3'>
          <div className='flex w-full relative mt-32 max-sm:mt-20'>
            <div className="flex flex-col mx-auto relative">
              <p className="font-medium text-[50px] uppercase max-lg:text-[30px] max-lg:text-center">We're ready to assist</p>
              <div className="flex justify-center items-center gap-8 max-md:mt-0">
                <div className="flex justify-center items-center max-xl:hidden max-lg:hidden w-full">
                  <Image src="assets/robert.svg" alt='robert' width={320} height={680} className='mt-20 bg-opacity-90' />
                </div>
                <div className='flex items-center justify-center gap-6 max-lg:flex-col'>
                  <div className="flex flex-col top-10 relative gap-8">
                    {
                      assistSecionItems[0].map((item, index) => {
                        return (
                          <div
                            key={index}
                            className='w-[365px] relative h-[315px] cursor-pointer max-md:w-[320px] z-10'
                            onMouseEnter={() => setIsFlipped(index)}
                            onMouseLeave={() => setIsFlipped(-1)}
                          >
                            <div className={" bg-gradient-to-br from-gray-600/40 to-gray-800/40 border absolute w-full h-full outline-none rounded-2xl border-gray-600 p-8 " + (isFlipped == index ? "hidden" : "flex flex-col items-start")}>
                              <div className='mb-2'> {item.icon} </div>
                              <p className='font-semibold text-xl'>{item.title}</p>
                              <Button radius="full" className="mt-5 bg-[#D599E126] text-white py-3" size='sm'><span className='font-normal text-base'>Issue:</span></Button>
                              <p className='font-normal text-base mt-5'>{item.content}</p>
                              <Button radius="lg" className="bg-transparent text-white mt-3 flex gap-2 items-center" size='lg'>
                                <span className='bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>See Solution</span>
                                <Image src="assets/vector.svg" width={28} height={28} className='' alt='vector' />
                              </Button>
                            </div>
                            <div className={"flex-col p-10 bg-gradient-to-br absolute w-full h-full border outline-none rounded-2xl border-gray-600 " + hoverContent[index].bg_color + (isFlipped != index ? " hidden" : " flex")}>
                              <div className='bg-[#D599E126] p-1 flex justify-center items-center rounded-full w-1/3'>{icons.tip}&nbsp;Solution</div>
                              <div><p className='font-normal mt-10 text-base text-start'>{hoverContent[index].description}</p></div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="flex flex-col top-36 max-lg:top-10 relative gap-8 z-10">
                    {
                      assistSecionItems[1].map((item, index) => {
                        return (
                          <div
                            key={index}
                            className='card w-[365px] max-md:w-[320px] relative h-[315px] cursor-pointer z-10'
                            onMouseEnter={() => setIsFlipped(index + 2)}
                            onMouseLeave={() => setIsFlipped(-1)}
                          >
                            <div className={" bg-gradient-to-br from-gray-600/40 to-gray-800/40 border absolute w-full h-full outline-none rounded-2xl border-gray-600 p-8 " + (isFlipped == index + 2 ? "hidden" : "flex flex-col items-start")}>
                              <div className='mb-2'> {item.icon} </div>
                              <p className='font-semibold text-xl'>{item.title}</p>
                              <Button radius="full" className="mt-5 bg-[#D599E126] text-white py-3" size='sm'><span className='font-normal text-base'>Issue:</span></Button>
                              <p className='font-normal text-base mt-5'>{item.content}</p>
                              <Button radius="lg" className="bg-transparent text-white mt-3" size='lg'>
                                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Solution</span>
                                <Image src="assets/vector.svg" width={28} height={28} className='' alt='vector' />
                              </Button>
                            </div>
                            <div className={"flex-col p-10 bg-gradient-to-br absolute w-full h-full border outline-none rounded-2xl border-gray-600 " + hoverContent[index + 2].bg_color + (isFlipped != index + 2 ? " hidden" : " flex")}>
                              <div className='bg-[#D599E126] p-1 flex justify-center items-center rounded-full w-1/3'>{icons.tip}&nbsp;Solution</div>
                              <div><p className='font-normal mt-10 text-base text-start'>{hoverContent[index + 2].description}</p></div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl z-[5]' />
          </div>
        </div>

        {/* This section for define we're ready to assist*/}

        <div className='max-lg:px-3 relative'>
          <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl z-[5]' />
          <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 left-0 bg-[#362666] bg-opacity-5 blur-3xl z-[5]' />
          <div className="flex flex-col w-full p-20 max-md:text-[20px] max-md:p-10 max-sm:p-0 mt-32 max-sm:mt-24 max-w-[1100px] itmes-center mx-auto justify-center flex-wrap text-center gap-8 relative z-10">
            <span className='font-medium text-5xl mx-auto text-white max-w-[600px] max-lg:text-3xl'>OUR SERVICES FOR YOUR BENEFIT</span>
            <div className="grid grid-cols-4 gap-x-3 max-lg:flex-col max-w-[700px] mx-auto lg:hidden">
              {
                services.map((service, index) => {
                  return (
                    <Button
                      key={index}
                      radius="lg"
                      variant={selectedServiceIndex == index ? 'solid' : 'faded'}
                      className={(selectedServiceIndex == index ? "bg-gradient-to-tr from-purple-light to-purple-weight" : "bg-transparent border border-white/10 bg-opacity-20") + "  outline-none text-white shadow-full p-8 max-md:px-7 mt-4 relative z-10"}
                      onClick={() => setSelectedServiceIndex(index)}
                    >
                      <Image src={service.img} width={30} height={30} alt='service' />
                    </Button>
                  )
                })
              }
            </div>
            <div className="flex flex-wrap relative gap-x-4 gap-y-2 max-lg:flex-col max-lg:hidden z-10 justify-center">
              {
                services.map((service, index) => {
                  return (
                    <Button
                      key={index}
                      radius="full"
                      variant={selectedServiceIndex == index ? 'solid' : 'faded'}
                      className={(selectedServiceIndex == index ? "bg-gradient-to-tr from-purple-light to-purple-weight" : "bg-gradient-to-tr from-[#a09f9f31] to-[#1414141e] bg-opacity-20") + "  outline-none text-white shadow-full mt-4"}
                      onClick={() => setSelectedServiceIndex(index)}
                    >
                      <span>{icons.shine}</span><span className='max-lg:text-[10px]'>{service.name}</span>
                    </Button>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='max-xl:px-3 max-w-[1076px] mx-auto max-lg:pt-20 relative z-10'>
          {
            services.map((service, service_index) => {
              return (
                <div key={service_index} className={(service_index != selectedServiceIndex ? "hidden" : "") + ' flex items-center justify-between max-lg:flex-col relative z-10'}>
                  <Image src={service.img} width={150} height={150} alt='services' className='max-lg:hidden relative z-10' />
                  <div className='max-w-[822px] w-full bg-transparent border border-gray-600 bg-opacity-60 rounded-3xl pt-10 relative z-10'>
                    <div className='flex justify-center items-center'><span className='font-medium text-3xl text-center'>{service.name}</span></div>
                    <span className='font-medium text-lg'>{service.description}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='max-lg:px-3 mx-auto relative'>
          <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute -top-96 -left-56 bg-[#0d091a] blur-3xl z-[5]' />
          <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute -bottom-96 right-0 bg-[#0d091a] blur-3xl z-[5]' />
          <div className="mt-24 max-lg:text-center mx-auto max-xl:mx-auto max-lg:justify-center outline-none rounded-3xl bg-[#0E142B] container flex justify-between items-center gap-8 relative p-10 relative z-10">
            <div className='py-8'>
              <p className='font-medium text-5xl max-lg:text-4xl max-lg:leading-10 max-xl:text-4xl uppercase'>Securing Your Brand:</p>
              <p className='font-normal mt-5 text-lg'>Count on Us to Safeguard Your Content</p>
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-full mt-6"
                size='lg'
                onClick={() => {
                  Crisp.chat.open();
                }}
              >
                <span>Support Chat</span>
              </Button>
            </div>
            <div className='flex max-lg:hidden'>
              <Image src="assets/safeground/message.svg" alt='message' width={300} height={170} className="top-[180x] right-[520px] absolute max-xl:!w-[200px] max-xl:right-[320px]" />
              <Image src="assets/safeground/img-thumbnail.svg" alt='thumbnail' width={320} height={200} className='top-[40px] right-[330px] absolute max-xl:!w-[220px] max-xl:right-[234px]' />
              <Image src="assets/safeground/robot-hand-finger.svg" alt='robert-hand' width={461} height={352} className='absolute right-0 top-10 max-xl:!w-[320px]' />
            </div>
          </div>
        </div>

        {/* This section for define support video*/}

        {functionalCookieAllowed ? <div className="mt-32 max-sm:mt-20 outline-none rounded-2xl container mx-auto flex justify-between items-center gap-8 max-md:px-3 z-10 relative">
          <video controls preload="none" className='rounded-xl w-full z-10 relative'>
            <source src="/path/to/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> : <></>}

        {/* This section for define we're ready to assist*/}

        <div className="max-lg:flex-col container p-15 flex mx-auto justify-center flex-wrap text-center gap-16 mt-24 max-sm:mt-20 relative">
          <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute -bottom-96 -left-56 bg-[#0d091a] blur-3xl z-[5]' />
          <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute -top-96 right-0 bg-[#0d091a] blur-3xl z-[5]' />
          {
            percentDescription.map((item, index) => {
              return (
                item.bgColor == true ?
                  <div key={index} className='z-10 relative'>
                    <p className='font-medium text-5xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-lg:text-4xl'>{item.title}</p>
                    <p className='font-normal text-lg'>{item.content}</p>
                  </div>
                  :
                  <div key={index} className='z-10 relative'>
                    <p className='font-medium text-5xl max-lg:text-4xl'>{item.title}</p>
                    <p className='font-normal text-lg'>{item.content}</p>
                  </div>
              )
            })
          }
        </div>

        {/* This section for define experience our rapid service*/}

        <div className='max-lg:px-3 z-10 relative'>
          <div className="mt-24 max-sm:mt-20 outline-none flex flex-col rounded-3xl bg-[#0E142B] container justify-between items-center gap-8 relative p-10 mx-auto">
            <div className='flex justify-start w-full'>
              <div className='px-9 py-6 max-xl:w-full max-xl:text-center'>
                <p className='font-medium text-5xl max-lg:text-3xl max-w-[580px] max-xl:mx-auto'>Quick Setup in Less Than 24 Hours!</p>
                <p className='max-w-[520px] max-xl:mx-auto pt-6'>Experience our rapid service; within just 24 hours, your account will be activated and running smoothly. Get your first comprehensive report highlighting detected copyright infringements delivered directly to your dashboard.</p>
              </div>
              <div className='max-xl:hidden'>
                <Image src="assets/setup/message.svg" alt='message' width={300} height={170} className="top-20 right-[460px] absolute" />
                <Image src="assets/setup/clock-message.svg" alt='clock-message' width={800} height={600} className="top-0 right-0 absolute" />
              </div>
            </div>
            <Button
              radius="lg"
              className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-full" size='lg'
              onPress={() => router.push("/free-trial")}
            >
              <span>Get Free Trial</span>
            </Button>
          </div>
        </div>
      </div >

      {/* This section for define Customer Reviews*/}

      <CustomerReview />
    </>
  )
}     
