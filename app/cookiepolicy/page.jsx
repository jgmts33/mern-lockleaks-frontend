"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';

export default function CookiePolicy() {

    const PravicyPolicy = {
        title: "Cookie Policy",
    }

    return (
        <>
            <div className="flex flex-col mx-auto items-center max-w-[1470px] justify-center text-white w-full font-normal text-base">
                <div className='text-center mt-10 max-sm:mt-5'>
                    <p className='font-medium text-5xl uppercase'>{PravicyPolicy.title}</p>
                </div>
                <div className='mt-5 max-xl:px-3 mb-5'>
                    <p className='font-normal text-base mt-5'>This Cookie Policy explains how Company ("Company", "we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our websites at https://www.rulta.co</p>
                    <p className='font-normal text-base'>("Websites"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
                    <p className='font-normal text-base mt-5'>In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.</p>
                    <p className='font-medium text-[22px] mt-5 text-[#F68171]'>What are cookies?</p>
                    <p className='font-normal text-base'>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
                    <p className='font-normal text-base mt-5'>Cookies set by the website owner (in this case, Company) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.</p>
                    <p className='font-medium text-[22px] mt-5 text-[#F68171]'>Why do we use cookies?</p>
                    <p className='font-normal text-base'>We use first and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Websites for advertising, analytics and other purposes. This is described in more detail below</p>
                    <p className='font-normal text-base mt-5'>The specific types of first and third party cookies served through our Websites and the purposes they perform are described below (please note that the specific cookies served may vary depending on the specific Online Properties you visit):</p>
                    <p className='font-medium text-[22px] mt-5 text-[#F68171]'>How can I control cookies?</p>
                    <p className='font-normal text-base'>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
                    <p className='font-normal text-base mt-5'>The Cookie Consent Manager can be found in the notification banner and on our website. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.</p>
                    <p className='font-normal text-base mt-5'>In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit http://www.aboutads.info/choices/ or http://www.youronlinechoices.com.</p>
                    <p className='font-normal text-base mt-5'>The specific types of first and third party cookies served through our Websites and the purposes they perform are described in the table below (please note that the specific cookies served may vary depending on the specific Online Properties you visit):</p>
                    <p className='font-medium text-[22px] mt-5 text-[#F68171]'>Essential website cookies:</p>
                    <p className='font-normal text-base'>These cookies are strictly necessary to provide you with services available through our Websites and to use some of its features, such as access to secure areas.</p>
                    <p className='font-normal text-base mt-5'>Performance and functionality cookies:</p>
                    <p className='font-normal text-base mt-5'>These cookies are used to enhance the performance and functionality of our Websites but are nonessential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</p>
                    <p className='font-medium text-[22px] mt-5 text-[#F68171]'>Targeting cookies:</p>
                    <p className='font-normal text-base'>These cookies collect information that is used either in aggregate form to help us understand how our Websites are being used or how effective our marketing campaigns are, or to help us customize our Websites for you. </p>
                    <p className='font-medium text-[22px] mt-5'>What about other tracking technologies, like web beacons?</p>
                    <p className='font-normal text-base mt-5'>Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Websites or opened an e-mail including them. This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of e-mail marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.</p>
                    <p className='font-normal text-[22px] mt-5 text-[#F68171]'>Do you use Flash cookies or Local Shared Objects?</p>
                    <p className='font-normal text-base'>Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention and for other site operations</p>
                    <p className='font-normal text-base mt-5'>If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the Website Storage Settings Panel. You can also control Flash Cookies by going to the Global Storage Settings Panel and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies (referred to "information" on the Macromedia site), how to prevent Flash LSOs from being placed on your computer without your being asked, and (for Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).</p>
                    <p className='font-normal text-base mt-5'>Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content. </p>
                    <p className='font-normal text-[22px] mt-5 text-[#F68171]'>Do you serve targeted advertising?</p>
                    <p className='font-normal text-base'>Third parties may serve cookies on your computer or mobile device to serve advertising through our Websites. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details or other details that directly identify you unless you choose to provide these.</p>
                    <p className='font-normal text-[22px] mt-5 text-[#F68171]'>How often will you update this Cookie Policy?</p>
                    <p className='font-normal text-base'>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
                    <p className='font-normal text-base mt-5'>The date at the top of this Cookie Policy indicates when it was last updated.</p>
                    <p className='font-normal text-[22px] mt-5 text-[#F68171]'>Where can I get further information?</p>
                    <p className='font-normal text-base'>If you have any questions about our use of cookies or other technologies, please email us at support@rulta.com or by post to: CompanyPudisoo küla, Männimäe Kuusalu vald , Harju maakond 74626 Ed Phone: (US) (443) 717-8335</p>
                </div>
            </div>
        </>
    )
}
