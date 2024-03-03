import {
    Button
} from '@nextui-org/react'; 

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col text-white items-center bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-[transparent]  ">
      <div className="flex w-full justify-center items-center flex-col min-h-screen">
        <div className="w-[1100px] text-center gap-10">
          <p className="font-[500] text-[70px]">INCREASE YOUR ONLINE SUCCESS WITH PROFESSIONAL COPYRIGHT PROTECTION</p>
          <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg mt-4" size='lg'>
            Protect Content Now!
          </Button>
        </div>
        <div className="flex flex-col w-full mt-20 gap-5 text-center items-center">
          <p className="text-center font-[400] text-[20px]">INCREASE YOUR ONLINE SUCCESS WITH PROFESSIONAL COPYRIGHT PROTECTION</p>
        </div>
        <div className="w-full flex flex-row justify-center mt-20 space-x-20 items-center">
          <img src="assets/onlyfans.svg" alt='onlyfans' />
          <img src="assets/myfreecams.svg" alt='myfreecams' />
          <img src="assets/stripchat.svg" alt='stripchat' />
          <img src="assets/patreon.svg" alt='patreon' />
          <img src="assets/stripchat.svg" alt='stripchat' />
          <img src="assets/manyvids.svg" alt='manyvids' />
          <img src="assets/chaturbate.svg" alt='chaturbate' />
          <p className="font-[400] mt-10 text-[20px]">add more</p>
        </div>
        <div>
          <p className="text-center font-[300] text-[16px] mt-5">CHOSEN BY ESTEEMED INDUSTRY LEADERS</p>
        </div>
      </div>
      <div className="flex flex-col p-20 bg-gradiant w-full">
        <div className="flex justify-start">
          <p className="font-[500] ml-20 text-[50px] text-starter mt-20">We're ready to assist</p>
        </div>
        <div className="flex flex-row justify-center">
          <div className="justify-center items-center px-16 lg:flex">
          </div>
          <div className="lg:w-1/2 flex gap-10">
            <div className="bg-card rounded-[20px] p-10">
              <p className='font-[600px] text-[20px]'>Reclaiming Your Rights</p>
              <p className='font-[400px] text-[16px]'>Issue:</p>
              <p className='font-[400px] text-[16px]'>Losing money and respect due to pirated content.</p>
              <Button radius="lg" className="mt-5">
                <span>Confirm</span><i className='vector-arrow'></i>
              </Button>
            </div>
            <div className="bg-card rounded-[20px] w-[374px] h-[315px] p-10"><i className="icon-thumb"></i></div>
            <div className="bg-card rounded-[20px] w-[374px] h-[315px] p-10"><i className="icon-fan"></i></div>
            <div className="bg-card rounded-[20px] w-[374px] h-[315px] p-10"><i className="icon-key"></i></div>
          </div>
        </div>
      </div>
    </main>
  );
}
