import {
  Button
} from '@nextui-org/react';

export default function HomePage() {

  const cards_left = [
    { title: "Reclaiming Your Rights", content: "Losing money and respect due to pirated content." },
    { title: "Stress-Free, Piracy-Free", content: "Discovering content leaks can be stressful." },
  ];
  const cards_right = [
    { title: "Protecting Your Brand Image", content: "The risk of your brand being compromised by impostors." },
    { title: "Ensured Privacy, Enhanced Sales", content: "Stolen content impacting sales and reputation." }
  ];

  const service_buttons = [
    "Delist", "Artificial Intelligence", "Personal Agent", "Impersonation", "Scan", "DMCA BADGES", "Anonymity", "Specialists in Content Creator and Cam Model", "Reverify & Reanalyzer", "Username History Recovery & Removal", "Monthly Analytics & PDF Reports"
  ]

  const percent_description = [
    { title: "40K", content: " Infringements Detected" },
    { title: "100,000 ", content: "Websites Crawled Daily", bg_color: true },
    { title: "7+", content: "Years of Experience" },
    { title: "100%", content: "Search Removal Efficiency", bg_color: true },
    { title: "98%", content: " Success Rate in Filehost Removal" },
    { title: "100%", content: "Removal from All Social Media Platforms", bg_color: true },
    { title: "97%", content: " Adult Tube Posts Removal" },
    { title: "100%", content: " Removal of Fake Profiles", bg_color: true },
    { title: "4", content: "Bots AI" }
  ]

  const custom_review = [
    {title:"Floyd Miles",sub_title:"Vice President, GoPro",content:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
    {title:"Floyd Miles",sub_title:"Vice President, GoPro",content:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
    {title:"Floyd Miles",sub_title:"Vice President, GoPro",content:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
  ]

  return (
    <main className="fflex items-center flex-col px-10 min-h-screen text-white bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-[transparent]  ">
      <div className="flex w-full justify-center items-center flex-col min-h-screen">
        <div className="w-[1100px] text-center gap-10">
          <p className="font-[500] text-[70px]">INCREASE YOUR ONLINE SUCCESS WITH PROFESSIONAL COPYRIGHT PROTECTION</p>
          <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg mt-4" size='lg'>
            Protect Content Now!
          </Button>
        </div>
        <div className="flex flex-col w-full mt-20 gap-5 text-center items-center">
          <p className="text-center font-normal text-xl">INCREASE YOUR ONLINE SUCCESS WITH PROFESSIONAL COPYRIGHT PROTECTION</p>
        </div>
        <div className="w-full flex flex-row justify-center mt-20 space-x-20 items-center">
          <img src="assets/onlyfans.svg" alt='onlyfans' />
          <img src="assets/myfreecams.svg" alt='myfreecams' />
          <img src="assets/stripchat.svg" alt='stripchat' />
          <img src="assets/patreon.svg" alt='patreon' />
          <img src="assets/stripchat.svg" alt='stripchat' />
          <img src="assets/manyvids.svg" alt='manyvids' />
          <img src="assets/chaturbate.svg" alt='chaturbate' />
          <p className="font-normal mt-10 text-xl">add more</p>
        </div>
        <div>
          <p className="text-center font-[300] text-base mt-5">CHOSEN BY ESTEEMED INDUSTRY LEADERS</p>
        </div>
      </div>
      <div className="flex flex-col p-20 bg-gradiant w-full">
        <div className="flex justify-start">
          <p className="font-[500] ml-20 text-[50px] text-starter mt-20">We're ready to assist</p>
        </div>
        <div className="flex justify-center items-center gap-8">
          <div className="w-1/4 justify-center items-center">
            <img src="assets/robert.svg" alt='robert' className='w-80 h-[680px] mt-20 bg-opacity-90' />
          </div>
          <div className="flex flex-col top-0 relative gap-8">
            {
              cards_left.map((item, index) => {
                return (

                  <div key={index} className="text-left w-[374px] outline-none rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 p-10">
                    <img src="assets/icon-support.svg" className='mb-2'></img>
                    <p className='font-semibold text-xl'>{item.title}</p>
                    <Button radius="full" className="mt-5 bg-[#D599E126] text-white" size='sm'><p className='font-normal text-base'>Issue:</p></Button>
                    <p className='font-normal text-base mt-5'>{item.content}</p>
                    <Button radius="lg" className="bg-transparent text-white shadow-lg mt-4" size='lg'>
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
              cards_right.map((item, index) => {
                return (
                  <div key={index} className="text-left w-[374px] outline-none rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 p-10">
                    <img src="assets/icon-support.svg" className='mb-2'></img>
                    <p className='font-semibold text-xl'>{item.title}</p>
                    <Button radius="full" className="mt-5 bg-[#D599E126] text-white" size='sm'><p className='font-normal text-base'>Issue:</p></Button>
                    <p className='font-normal text-base mt-5'>{item.content}</p>
                    <Button radius="lg" className="bg-transparent text-white shadow-lg mt-4" size='lg'>
                      <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Solution</span>
                      <img src="assets/vector.svg" className='w-7 h-7'></img>
                    </Button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col p-20 mt-20 max-w-[1100px] itmes-center mx-auto justify-center flex-wrap text-center gap-8">
        <span className='font-[500] text-5xl text-white'>OUR SERVICES FOR YOUR BENEFIT</span>
        <div className="flex flex-wrap relative mt-10">
          <Button radius="full" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-full mt-4" size='full'>
            Protect Content Now!
          </Button>
          {
            service_buttons.map((item, index) => {
              return (
                <Button key={index} radius="full" className="bg-gradient-to-tr from-[#1b1b1b] to-[#353433] text-white shadow-full mt-4">
                  <img src="assets/icon-shine.svg" />{item}
                </Button>
              )
            })
          }
        </div>
      </div>
      <div className='flex mt-10 justify-center'>
        <img src="assets/rectangle.svg" />
        <div className='w-1/2 outline-none p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60'>
          <p className='mt-10'>Upon detecting any infringing content, our expert agents act promptly by issuing DMCA takedown notices to the relevant internet authorities.We diligently remove any* illicit copies of your content identified through both software and manual scans.</p>
          <p className='mt-10'>Our strong affiliations with file hosting sites ensure swift consideration of our DMCA takedown notices, aligning with our clients business policies.*Limited by DMCA compliance</p>
        </div>
      </div>
      <div className="mt-20 outline-none p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 container mx-auto flex justify-between items-center gap-8">
        <div className='p-10'>
          <p className='font-medium text-5xl'>Securing Your Brand:</p>
          <p className='font-normal mt-5 text-lg'>Count on Us to Safeguard Your Content</p>
          <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-full mt-4 mt-5" size='full'>
            Free Analisis
          </Button>
        </div>
        <div className='flex'>
          <img src="assets/envelop.svg" className='mt-20'></img>
          <img src="assets/photo.svg"></img>
          <img src="assets/robot-hand-finger.svg"></img>
        </div>
      </div>
      <div className="mt-20 outline-none p-10 rounded-2xl container mx-auto flex justify-between items-center gap-8">
        <img src='assets/3d-background.svg'></img>
      </div>
      <div className="min-w-screen container p-15 flex mx-auto justify-center flex-wrap text-center gap-20">
        {
          percent_description.map((item, index) => {
            return (
              item.bg_color == true ?
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
      <div className="mt-20 outline-none p-10 flex rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 container mx-auto flex justify-between items-center gap-8">
        <div className='p-10'>
          <p className='font-medium text-5xl'>Quick Setup in Less Than 24 Hours!</p>
          <p>Experience our rapid service; within just 24 hours, your account will be activated and running smoothly. Get your first comprehensive report highlighting detected copyright infringements delivered directly to your dashboard.</p>
        </div>
        <div className='flex'>
          <img src="assets/envelop.svg" className='mt-20'></img>
          <img src="assets/photo.svg"></img>
          <img src="assets/robot-hand-finger.svg"></img>
        </div>
        <div className=''>
        <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-full mt-4 mt-5" size='full'>
          Free Analisis
        </Button>
        </div>
      </div>
      <div className="mt-20 outline-none p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 container mx-auto flex justify-between items-center gap-8">
        <div className='p-10'>
          <p className='font-medium text-5xl'>Quick Setup in Less Than 24 Hours!</p>
          <p>Experience our rapid service; within just 24 hours, your account will be activated and running smoothly. Get your first comprehensive report highlighting detected copyright infringements delivered directly to your dashboard.</p>
        </div>
        <div className='flex'>
          <img src="assets/envelop.svg" className='mt-20'></img>
          <img src="assets/photo.svg"></img>
          <img src="assets/robot-hand-finger.svg"></img>
        </div>
        <div className=''>
        <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-full mt-4 mt-5" size='full'>
          Free Analisis
        </Button>
        </div>
      </div>
      <div className='font-medium text-5xl mt-20'><p>Customer Reviews</p></div>
      <div className="flex mt-20 justify-center items-center gap-8">
          <div className="flex top-0 relative gap-8">
            {
              custom_review.map((item, index) => {
                return (
                  <div key={index} className="text-left w-[418px] flex flex-wrap outline-none rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 p-10">
                    <img src="assets/floyed.svg" className='mb-3'></img>
                    <div className='ml-3 mt-2'>
                    <p className='font-semibold text-xl'>{item.title}</p>
                    <p className='font-light text-xs'>{item.sub_title}</p>
                    <div className='flex'>
                    <img src="assets/star.svg"></img><img src="assets/star.svg"></img><img src="assets/star.svg"></img><img src="assets/star.svg"></img><img src="assets/star.svg"></img>
                    </div>
                    <div>
                      <img src="assets/twitter.svg"></img>
                    </div>
                    </div>
                    <div>
                      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
    </main >
  )  
}     
