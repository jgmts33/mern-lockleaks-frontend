"use client";
import {
  Button
} from '@nextui-org/react';
import { Shine, Fan, Lock, Support, ThumbUp, Protect, Star, Twitter, ChevronLeft, ChevronRight, ICON_SUCCESS, PROFILE, CHAT, TIP } from "@/src/utils/Icons";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CustomerReview from '@/src/components/customerReview';

export default function HomePage() {
  const icons = {
    left: <ChevronLeft fill="currentColor" size={16} />,
    right: <ChevronRight fill="currentColor" size={16} />,
    shine: <Shine fill="currentColor" size={16} />,
    fan: <Fan fill="currentColor" size={16} />,
    lock: <Lock fill="currentColor" size={16} />,
    support: <Support fill="currentColor" size={16} />,
    thumbup: <ThumbUp fill="currentColor" size={16} />,
    protect: <Protect fill="currentColor" size={16} />,
    star: <Star fill="currentColor" size={16} />,
    twitter: <Twitter fill="currentColor" size={16} />,
    success: <ICON_SUCCESS fill="currentColor" size={16} />,
    chat: <CHAT fill="currentColor" size={16} />,
    profile: <PROFILE fill="currentColor" size={16} />,
    tip: <TIP fill="currentColor" size={16} />,
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
      description: <div className='outline-none px-12 py-20'>
        <p>Upon detecting any infringing content, our expert agents act promptly by issuing DMCA takedown notices to the relevant internet authorities.We diligently remove any* illicit copies of your content identified through both software and manual scans.</p>
        <p className='mt-10'>Our strong affiliations with file hosting sites ensure swift consideration of our DMCA takedown notices, aligning with our clients business policies.*Limited by DMCA compliance</p>
      </div>,
      img: "assets/services/takedown.svg"
    },
    {
      name: "Delist",
      description: <div className='outline-none px-12 py-20'>
        <p>CopyrightFixer holds membership in Google’s Trusted Copyright Removal Program, leading to the rapid delisting of any reported infringing content.</p>
        <p className='mt-10'>Please note, we refrain from reporting referrals, reviews, affiliates, and any content you wish to retain.</p>
        <p>We boast a perfect track record, removing 100% of reported infringing content from Google Search, Google Video, and Google Images, also covering Microsoft Bing</p>
      </div>,
      img: "assets/services/delist.svg"
    },
    {
      name: "Artificial Intelligence",
      description: <div className='outline-none px-12 py-20'>
        <p>Incorporating facial recognition software, machine learning, optical character recognition, and an array of algorithms developed by our experts, we fortify content protection against copyright infringements on:</p>
        <ul className='mt-10 list-disc pl-4'>
          <li>Google Images</li>
          <li>Google Videos Additionally, these tools are utilized on various social media platforms, including Facebook, Instagram, TikTok, Reddit, X / Twitter, blogs, and other websites</li>
        </ul>
      </div>,
      img: "assets/services/artifical-intelligence.svg"
    },
    {
      name: "Personal Agent",
      description: <div className='outline-none px-12 py-20'>
        <p>Our adept agents conduct manual scans for copyright infringements utilizing your specified usernames and chosen keywords on multiple platforms:</p>
        <ul className='mt-10 list-disc pl-4'>
          <li>Google Search, Images & Videos</li>
          <li>Web-streaming sites</li>
          <li>Forums</li>
          <li>Reddit*</li>
          <li>Twitter</li>
          <li>Tiktok</li>
          <li>Instagram</li>
        </ul>
        <p>Sur support team remains available seven days a week via live chat to extend further assistance.</p>
      </div>,
      img: "assets/services/personal-agent.svg"
    },
    {
      name: "Impersonation",
      description: <div className='outline-none px-12 py-20'>
        <p>Your brand is shielded from fraudulent accounts, impersonators, and harassment on various platforms including:</p>
        <ul className='mt-10 list-disc pl-4'>
          <li>Reddit</li>
          <li>Instagram</li>
          <li>X / Twitter</li>
          <li>TikTok</li>
          <li>Twitter</li>
          <li>YouTube</li>
          <li>Telegram</li>
          <li>Facebook</li>
          <li>Discord</li>
        </ul>
      </div>,
      img: "assets/services/impersonation.svg"
    },
    {
      name: "Scan",
      description: <div className='outline-none px-12 py-20'>
        <p>Our proprietary software scours the internet, uncovering brand copyright infringements, complemented by meticulous manual scans performed by our adept agents. We meticulously scrutinize:</p>
        <ul className='mt-10 list-disc pl-4'>
          <li>Results from Google Search, Images, and Videos</li>
          <li>Diverse websites including video-streaming platforms, forums, peer-to-peer sites, and more, totaling over 100,000 inspected websites</li>
          <li>File hosting services</li>
          <li>Social media platforms such as Reddit, Instagram, Twitter, and TikTok.</li>
        </ul>
      </div>,
      img: "assets/services/scan.svg"
    },
    {
      name: "DMCA BADGES",
      description: <div className='outline-none px-12 py-20'>
        <p>This service involves providing DMCA badges that can be integrated into clients' websites or platforms to indicate that the respective content is protected by copyright and is subject to DMCA (Digital Millennium Copyright Act) policies.</p>
        <p className='mt-10'> These badges offer a visual notification and signal to potential users that the content is protected, highlighting the presence of legal measures for any copyright violations.</p>
      </div>,
      img: "assets/services/dmca-badges.svg"
    },
    {
      name: "Anonymity",
      description: <div className='outline-none px-12 py-20'>
        <p>"Filing a DMCA complaint often necessitates divulging personal information like real names, contact numbers, and addresses. Protecting your anonymity is our top priority; hence, we utilize our company’s contact information to lodge DMCA complaints on your behalf.</p>
        <p className='mt-10'> Several internet companies store personal information in publicly accessible databases like the Lumen database used by Twitter and Google. Rulta takes extra precautions to safeguard your identity.</p>
      </div>,
      img: "assets/services/anonymity.svg"
    },
    {
      name: "Specialists in Content Creator and Cam Model",
      description: <div className='outline-none px-12 py-20'>
        <p>This service entails providing DMCA badges that can be integrated into clients' websites or platforms to indicate that the respective content is protected by copyright and adheres to DMCA (Digital Millennium Copyright Act) policies. </p>
        <p className='mt-10'> These badges serve as visual notifications and signals to potential users that the content is protected, and legal actions will be taken in case of copyright violations.</p>
      </div>,
      img: "assets/services/content-creator.svg"
    },
    {
      name: "Reverify & Reanalyzer",
      description: <div className='outline-none px-12 py-20'>
        <p>This functionality involves repetitive scans and periodic updates to identify and evaluate any new copyright infringements or reintroduced content. It ensures constant monitoring of illegal activities and helps rediscover previously undetected content, ensuring all violations are appropriately managed and eliminated, maintaining high-security standards for copyrighted content.</p>
      </div>,
      img: "assets/services/reverify-reanalyzer.svg"
    },
    {
      name: "Username History Recovery & Removal",
      description: <div className='outline-none px-12 py-20'>
        <p>This service is specially designed for models on cam platforms but can also be adapted and used for models on OnlyFans. The function is intended for recovering and removing content associated with multiple usernames used by the same individuals.</p>
        <p className='mt-10'>  This service provides a historical perspective on content associated with various online identities of a user and helps in removing unauthorized or unwanted content associated with these identities, thereby safeguarding the model's online image and security.</p>
      </div>,
      img: "assets/services/removal.svg"
    },
    {
      name: "Monthly Analytics & PDF Reports",
      description: <div className='outline-none px-12 py-20'>
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
      bg_color: "[#2E2650]"
    }
  ]

  const percentDescription = [
    { title: "40K", content: " Infringements Detected" },
    { title: "100,000 ", content: "Websites Crawled Daily", bgColor: true },
    { title: "7+", content: "Years of Experience" },
    { title: "100%", content: "Search Removal Efficiency", bgColor: true },
    { title: "98%", content: " Success Rate in Filehost Removal" },
    { title: "100%", content: "Removal from All Social Media Platforms" },
    { title: "97%", content: " Adult Tube Posts Removal", bgColor: true },
    { title: "100%", content: " Removal of Fake Profiles" },
    { title: "4", content: "Bots AI", bgColor: true }
  ]

  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [animationCounter, setAnimationCounter] = useState(0);
  const [isFlipped, setIsFlipped] = useState(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (animationCounter === 7) {
        clearInterval(timer);
      }
      setAnimationCounter(p => p + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="text-white max-w-[1480px]">
        <div className='relative flex px-3'>

           {/* This section for define homepage header*/}

          <div className="flex w-full justify-center items-center flex-col relative z-20">
            <div className="max-w-[1100px] justify-center items-center text-center gap-10 mt-20">
              <p className="font-medium text-[70px] max-lg:text-[40px] max-md:justify-center max-md:text-[26px]">
                INCREASE YOUR ONLINE SUCCESS WITH PROFESSIONAL COPYRIGHT PROTECTION
              </p>
            </div>
            <div className='flex w-full justify-center mt-8 relative max-xl:w-full max-xl:flex-col max-xl:items-center max-xl:mx-auto'>
              <Button radius="lg" className="bg-gradient-to-tr max-xl:w-[1/2] from-[#9C3FE4] to-[#C65647] text-white shadow-lg px-10 py-7 text-lg" size='lg'>
                Protect Content Now!
                <span>{icons.shine}</span>
              </Button>
              <div className={"flex max-w-[422px] duration-700 max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute -left-8 top-6 max-xl:left-0 max-xl:top-0 mt-6 " + (animationCounter >= 1 ? "opacity-100" : "opacity-0")}>
                <div>{icons.success}</div>
                <div>
                  <p className='font-semibold text-xl mt-3'>Protect Your Content</p>
                  <p className='font-normal text-base mt-2'>Your Creativity Deserves Protection- We've Got You Covered.</p>
                </div>
              </div>
              <div className={"flex max-w-[422px] duration-700 max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute right-6 top-20 max-xl:right-0 max-xl:top-8 " + (animationCounter >= 2 ? "opacity-100" : "opacity-0")}>
                <div>{icons.profile}</div>
                <div>
                  <p className='font-semibold text-xl mt-3'>PROFESSIONAL SUPPORT</p>
                  <p className='font-normal text-base mt-2'>Live Support at Your Fingertips - We're Just a Click Away.</p>
                </div>
              </div>
              <div className={"flex max-w-[422px] duration-700 max-xl:!relative max-xl:rotate-0 max-xl:right-0 max-xl:top-16 bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] rotate-[12deg] z-40 p-5 cursor-pointer absolute -right-12 -top-8 " + (animationCounter >= 3 ? "opacity-100" : "opacity-0")}>
                <div className='-rotate-[8deg]'>{icons.chat}</div>
                <div>
                  <p className='font-semibold text-xl mt-3'>DEFEND YOUR NAME</p>
                  <p className='font-normal text-base mt-2'>Your Brand is Your Legacy, Let Us Be Your Guardians.</p>
                </div>
              </div>
            </div>

             {/* This section for define chosen by esteemed industry leaders*/}

            <div className="flex flex-col w-full mt-60 text-center items-center max-md:mt-32">
              <p className="text-center font-normal text-xl max-md:justify-center">Increase your online success with professional copyright protection</p>
              <div className="w-full flex flex-wrap justify-center mt-12 gap-8 items-center max-lg:flex-col">
                <Image src="assets/onlyfans.svg" width={154} height={26} alt='onlyfans' />
                <Image src="assets/myfreecams.svg" width={151} height={13} alt='myfreecams' />
                <Image src="assets/stripchat.svg" width={143} height={26} alt='stripchat' />
                <Image src="assets/patreon.svg" width={118} height={32} alt='patreon' />
                <Image src="assets/stripchat.svg" width={134} height={26} alt='stripchat' />
                <Image src="assets/manyvids.svg" width={186} height={95} alt='manyvids' />
                <Image src="assets/chaturbate.svg" width={136} height={41} alt='chaturbate' />
                <p className="font-normal text-xl">and more</p>
              </div>
              <p className="text-center font-light text-base mt-5 opacity-80">Chosen by esteemed industry leaders</p>
            </div>
          </div>
        </div >

        {/* This section for define we're ready to assist*/}

        <div className='max-lg:px-3'>
          <div className='flex w-full relative mt-32 px-3'>
            <div className="flex flex-col mx-auto z-20 relative">
              <p className="font-medium text-[50px] uppercase max-lg:text-[30px] max-lg:text-center">We're ready to assist</p>
              <div className="flex justify-center items-center gap-8 max-lg:mt-10">
                <div className="max-xl:hidden flex justify-center items-center max-lg:hidden w-full">
                  <img src="assets/robert.svg" alt='robert' className='w-80 h-[680px] mt-20 bg-opacity-90' />
                </div>
                <div className='flex items-center justify-center gap-6 max-lg:flex-col'>
                  <div className="flex flex-col top-0 relative gap-8">
                    {
                      assistSecionItems[0].map((item, index) => {
                        return (
                          <div
                            key={index}
                            className='w-[365px] max-md:w-[320px] relative h-[315px] cursor-pointer'
                            onMouseEnter={() => setIsFlipped(index)}
                            onMouseLeave={() => setIsFlipped(-1)}
                          >
                            <div className={" bg-gradient-to-br from-gray-600/40 to-gray-800/40 border absolute w-full h-full outline-none rounded-2xl border-gray-600 p-8 " + (isFlipped == index ? "hidden" : "flex flex-col items-start")}>
                              <div className='mb-2'> {item.icon} </div>
                              <p className='font-semibold text-xl'>{item.title}</p>
                              <Button radius="full" className="mt-5 bg-[#D599E126] text-white" size='sm'><p className='font-normal text-base'>Issue:</p></Button>
                              <p className='font-normal text-base mt-5'>{item.content}</p>
                              <Button radius="lg" className="bg-transparent text-white mt-4 flex gap-2 items-center" size='lg'>
                                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Solution</span>
                                <img src="assets/vector.svg" className='w-7 h-7 -ml-2 -mt-1'></img>
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
                  <div className="flex flex-col top-24 max-lg:top-2 relative gap-8">
                    {
                      assistSecionItems[1].map((item, index) => {
                        return (
                          <div
                            key={index}
                            className='card w-[365px] max-md:w-[320px] relative h-[315px] cursor-pointer'
                            onMouseEnter={() => setIsFlipped(index + 2)}
                            onMouseLeave={() => setIsFlipped(-1)}
                          >
                            <div className={" bg-gradient-to-br from-gray-600/40 to-gray-800/40 border absolute w-full h-full outline-none rounded-2xl border-gray-600 p-8 " + (isFlipped == index + 2 ? "hidden" : "flex flex-col items-start")}>
                              <div className='mb-2'> {item.icon} </div>
                              <p className='font-semibold text-xl'>{item.title}</p>
                              <Button radius="full" className="mt-5 bg-[#D599E126] text-white" size='sm'><p className='font-normal text-base'>Issue:</p></Button>
                              <p className='font-normal text-base mt-5'>{item.content}</p>
                              <Button radius="lg" className="bg-transparent text-white mt-4" size='lg'>
                                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Solution</span>
                                <img src="assets/vector.svg" className='w-7 h-7 -ml-2 -mt-1'></img>
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
            <Image src="assets/bg-shape-purple-circle.svg" width={633} height={642} className='absolute z-10 top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl' />
          </div>
        </div>

        {/* This section for define we're ready to assist*/}

        <div className='max-lg:px-3'>
          <div className="flex flex-col w-full p-20 max-md:text-[20px] max-md:p-10 max-sm:p-0 mt-32 max-w-[1100px] itmes-center mx-auto justify-center flex-wrap text-center gap-8">
            <span className='font-medium text-[50px] mx-auto text-white max-w-[600px] max-lg:text-[40px]'>OUR SERVICES FOR YOUR BENEFIT</span>
            <div className="flex flex-wrap relative gap-x-4 gap-y-2 max-lg:flex-col">
              {
                services.map((service, index) => {
                  return (
                    <Button
                      key={index}
                      radius="full"
                      variant={selectedServiceIndex == index ? 'solid' : 'faded'}
                      className={(selectedServiceIndex == index ? "bg-gradient-to-tr from-[#9C3FE4] to-[#C65647]" : "bg-gradient-to-tr from-[#a09f9f31] to-[#1414141e] bg-opacity-20") + "  outline-none text-white shadow-full mt-4"}
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
        <div className='max-lg:px-3 max-w-[]'>
          {
            services.map((service, index) => {
              return (
                <div key={index} className={'flex max-xl:flex-col mx-auto max-xl:mx-auto mt-10 container justify-between bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 rounded-3xl ' + (index != selectedServiceIndex ? "hidden" : "")}>
                  <img src={service.img} alt="Service" className='max-xl:w-full max-md:hidden' />
                  <span className='max-w-1/2 max-xl:text-center'>{service.description}</span>
                </div>
              )
            })
          }
        </div>
        <div className='max-lg:px-3 mx-auto'>
          <div className="mt-24 max-lg:text-center mx-auto max-xl:mx-auto max-lg:justify-center outline-none rounded-3xl bg-[#0E142B] container flex justify-between items-center gap-8 relative p-10">
            <div className=' py-8'>
              <p className='font-medium text-[50px] max-lg:text-[40px] max-lg:leading-[46px] max-xl:text-[40px] uppercase'>Securing Your Brand:</p>
              <p className='font-normal mt-5 text-lg'>Count on Us to Safeguard Your Content</p>
              <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-full mt-6" size='lg'>
                Free Analisis
              </Button>
            </div>
            <div className='flex max-lg:hidden'>
              <Image src="assets/safeground/message.svg" width={300} height={170} className="top-[180x] right-[520px] absolute max-xl:!w-[200px] max-xl:right-[320px]" />
              <Image src="assets/safeground/img-thumbnail.svg" width={320} height={200} className='top-[40px] right-[330px] absolute max-xl:!w-[220px] max-xl:right-[234px]' />
              <Image src="assets/safeground/robot-hand-finger.svg" width={461} height={352} className='absolute right-0 top-10 max-xl:!w-[320px]' />
            </div>
          </div>
        </div>

        {/* This section for define support video*/}

        <div className="mt-32 outline-none rounded-2xl container mx-auto flex justify-between items-center gap-8 max-md:px-3">
          <video controls preload="none" className='rounded-xl w-full'>
            <source src="/path/to/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* This section for define we're ready to assist*/}

        <div className="max-lg:flex-col container p-15 flex mx-auto justify-center flex-wrap text-center gap-16 mt-24">
          {
            percentDescription.map((item, index) => {
              return (
                item.bgColor == true ?
                  <div>
                    <p className='font-medium text-5xl bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>{item.title}</p>
                    <p className='font-normal text-lg'>{item.content}</p>
                  </div>
                  :
                  <div>
                    <p className='font-medium text-5xl'>{item.title}</p>
                    <p className='font-normal text-lg'>{item.content}</p>
                  </div>
              )
            })
          }
        </div>

        {/* This section for define experience our rapid service*/}

        <div className='max-lg:px-3'>
          <div className="mt-24 outline-none flex flex-col rounded-3xl bg-[#0E142B] container justify-between items-center gap-8 relative p-10 mx-auto">
            <div className='flex justify-start w-full'>
              <div className='px-9 py-6 max-xl:w-full max-xl:text-center'>
                <p className='font-medium text-5xl max-lg:text-[30px] max-w-[580px] max-xl:mx-auto'>Quick Setup in Less Than 24 Hours!</p>
                <p className='max-w-[520px] max-xl:mx-auto pt-6'>Experience our rapid service; within just 24 hours, your account will be activated and running smoothly. Get your first comprehensive report highlighting detected copyright infringements delivered directly to your dashboard.</p>
              </div>
              <div className='max-xl:hidden'>
                <Image src="assets/setup/message.svg" width={300} height={170} className="top-20 right-[460px] absolute" />
                <Image src="assets/setup/clock-message.svg" width={800} height={600} className="top-0 right-0 absolute" />
              </div>
            </div>
            <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-full" size='lg'>
              Free Analisis
            </Button>
          </div>
        </div>
      </div >

      {/* This section for define Customer Reviews*/}

      <CustomerReview />
    </>
  )
}     
