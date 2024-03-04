"use client";
import {
  Button
} from '@nextui-org/react';
import { Shine, Fan, Lock, Support, ThumbUp, Protect, Star, Twitter, ChevronLeft, ChevronRight } from "@/src/utils/Icons";
import Image from 'next/image';
import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

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

  const customReview = [
    { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
    { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
    { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  ]

  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  const reviewItems = customReview.map((item, index) => <div key={index} className="text-left w-[418px] flex flex-wrap outline-none rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 p-10">
    <div className='ml-3 mt-2 flex items-center gap-4'>
      <img src="assets/floyed.svg" />
      <div>
        <p className='font-semibold text-xl bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>{item.title}</p>
        <p className='font-light text-xs opacity-80'>{item.subTitle}</p>
        <div className='flex'>
          <span>{icons.star}</span>
          <span>{icons.star}</span>
          <span>{icons.star}</span>
          <span>{icons.star}</span>
          <span>{icons.star}</span>
        </div>
      </div>
      <span>{icons.twitter}</span>
    </div>
    <p className='text-base font-normal opacity-80 pt-4'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
  </div>);

  const responsive = {
    0: {
      items: 1
    },
    568: {
      items: 2
    },
    1024: {
      items: 3,
      itemsFit: 'contain'
    },
  };

  return (

    <main className="flex items-center flex-col px-10 text-white max-w-[1480px] py-4">

      <div className='relative'>
        <div className="flex w-full justify-center items-center flex-col relative z-20">
          <div className="max-w-[1100px] text-center gap-10">
            <p className="font-medium text-[70px]">INCREASE YOUR ONLINE SUCCESS WITH PROFESSIONAL COPYRIGHT PROTECTION</p>
            <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg mt-4 px-10 py-7 text-lg" size='lg'>
              Protect Content Now!
              <span>{icons.shine}</span>
            </Button>
          </div>
          <div className="flex flex-col w-full mt-60 text-center items-center">
            <p className="text-center font-normal text-xl">Increase your online success with professional copyright protection</p>
            <div className="w-full flex flex-wrap justify-center mt-12 gap-8 items-center">
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
      </div>


      <div className='w-full relative mt-32'>
        <div className="flex flex-col mx-auto z-20 relative">
          <p className="font-medium text-[50px] uppercase">We're ready to assist</p>
          <div className="flex justify-center items-center gap-8">
            <div className="max-xl:hidden flex justify-center items-center max-lg:hidden">
              <img src="assets/robert.svg" alt='robert' className='w-80 h-[680px] mt-20 bg-opacity-90' />
            </div>
            <div className='flex items-center justify-center gap-6'>
              <div className="flex flex-col top-0 relative gap-8">
                {
                  assistSecionItems[0].map((item, index) => {
                    return (

                      <div key={index} className="w-[374px] outline-none rounded-2xl bg-gradient-to-br from-gray-600/40 to-gray-800/40 border border-gray-600 p-8">
                        <div className='mb-2'> {item.icon} </div>
                        <p className='font-semibold text-xl'>{item.title}</p>
                        <Button radius="full" className="mt-5 bg-[#D599E126] text-white" size='sm'><p className='font-normal text-base'>Issue:</p></Button>
                        <p className='font-normal text-base mt-5'>{item.content}</p>
                        <Button radius="lg" className="bg-transparent text-white mt-4" size='lg'>
                          <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Solution</span>
                          <img src="assets/vector.svg" className='w-7 h-7'></img>
                        </Button>
                      </div>
                    )
                  })
                }
              </div>
              <div className="flex flex-col top-24 relative gap-8">
                {
                  assistSecionItems[1].map((item, index) => {
                    return (
                      <div
                        key={index} className="text-left w-[374px] outline-none rounded-2xl bg-gradient-to-br from-gray-600/40 to-gray-800/40 border border-gray-600 p-8">
                        <div className='mb-2'> {item.icon} </div>
                        <p className='font-semibold text-xl'>{item.title}</p>
                        <Button radius="full" className="mt-5 bg-[#D599E126] text-white" size='sm'><p className='font-normal text-base'>Issue:</p></Button>
                        <p className='font-normal text-base mt-5'>{item.content}</p>
                        <Button radius="lg" className="bg-transparent text-white mt-4" size='lg'>
                          <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Solution</span>
                          <img src="assets/vector.svg" className='w-7 h-7' />
                        </Button>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>
        </div>
        <Image src="assets/bg-shape-purple-circle.svg" width={633} height={642} className='absolute z-10 top-0 right-0 bg-[#362666] bg-opacity-5 blur-2xl' />
      </div>

      <div className="flex flex-col p-20 mt-32 max-w-[1100px] itmes-center mx-auto justify-center flex-wrap text-center gap-8">
        <span className='font-medium text-[50px] mx-auto text-white max-w-[600px]'>OUR SERVICES FOR YOUR BENEFIT</span>
        <div className="flex flex-wrap relative gap-x-4 gap-y-2">
          {
            services.map((service, index) => {
              return (
                <Button
                  key={index}
                  radius="full"
                  variant={selectedServiceIndex == index ? 'solid' : 'faded'}
                  className={(selectedServiceIndex == index ? "bg-gradient-to-tr from-[#9C3FE4] to-[#C65647]" : "bg-gradient-to-tr from-[#a09f9f31] to-[#1414141e] bg-opacity-20") + "  outline-none text-white shadow-full mt-4 px-4"}
                  onClick={() => setSelectedServiceIndex(index)}
                >
                  <span>{icons.shine}</span>{service.name}
                </Button>
              )
            })
          }
        </div>
      </div>


      {
        services.map((service, index) => {
          return (
            <div className={'flex mt-10 justify-between bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 rounded-3xl ' + (index != selectedServiceIndex ? "hidden" : "")}>
              <img src={service.img} alt="Service" />
              <span className='max-w-1/2'>{service.description}</span>
            </div>
          )
        })
      }


      <div className="mt-24 outline-none  rounded-3xl bg-[#0E142B] container flex justify-between items-center gap-8 relative">
        <div className='p-28'>
          <p className='font-medium text-[50px] leading-[70px] uppercase'>Securing Your Brand:</p>
          <p className='font-normal mt-5 text-lg'>Count on Us to Safeguard Your Content</p>
          <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-full mt-6" size='lg'>
            Free Analisis
          </Button>
        </div>
        <div className='flex'>
          <Image src="assets/safeground/message.svg" width={300} height={170} className="top-[180x] right-[520px] absolute" />
          <Image src="assets/safeground/img-thumbnail.svg" width={320} height={200} className='top-[40px] right-[330px] absolute' />
          <Image src="assets/safeground/robot-hand-finger.svg" width={461} height={352} className='absolute right-0 top-10' />
        </div>
      </div>


      <div className="mt-32 outline-none rounded-2xl container mx-auto flex justify-between items-center gap-8">
        <video controls preload="none" className='rounded-xl w-full'>
          <source src="/path/to/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container p-15 flex mx-auto justify-center flex-wrap text-center gap-16 mt-24">
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


      <div className="mt-32 outline-none flex flex-col rounded-3xl bg-[#0E142B] container justify-between items-center gap-8 relative p-10 ">
        <div className='flex justify-start w-full'>
          <div className='p-10'>
            <p className='font-medium text-5xl max-w-[580px]'>Quick Setup in Less Than 24 Hours!</p>
            <p className='max-w-[520px] pt-6'>Experience our rapid service; within just 24 hours, your account will be activated and running smoothly. Get your first comprehensive report highlighting detected copyright infringements delivered directly to your dashboard.</p>
          </div>
          <Image src="assets/setup/message.svg" width={300} height={170} className="top-20 right-[460px] absolute" />
          <Image src="assets/setup/clock-message.svg" width={800} height={600} className="top-0 right-0 absolute" />
        </div>

        <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-full" size='lg'>
          Free Analisis
        </Button>
      </div>



      <div className='my-20 container'>
        <p className='font-medium text-5xl '>Customer Reviews</p>
        <div className="flex top-0 relative gap-8 mt-16 items-center">
          <Button radius="lg" className="bg-gradient-to-tr from-[#a09f9f31] to-[#1414141e] bg-opacity-20 text-white shadow-full py-7" size='sm'>
            {icons.left}
          </Button>
          {reviewItems.map((item) => item)}
          <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] bg-opacity-20 text-white shadow-full py-7" size='sm'>
            {icons.right}
          </Button>
        </div>
      </div>
    </main >
  )
}     
