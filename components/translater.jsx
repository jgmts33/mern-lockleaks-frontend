import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useState } from "react";

const languages = [
  { label: "English", value: "en", src: "https://flagcdn.com/h60/us.png" },
  { label: "Romania", value: "ro", src: "https://flagcdn.com/h60/ro.png" },
  { label: "Italy", value: "it", src: "https://flagcdn.com/h60/it.png" },
  { label: "Spanish", value: "es", src: "https://flagcdn.com/h60/es.png" },
  // Add additional languages as needed
];

const includedLanguages = languages.map(lang => lang.value).join(",");

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement({
    pageLanguage: "auto", includedLanguages
  }, "google_translate_element");
}

export function GoogleTranslate({ prefLangCookie }) {
  const [langCookie, setLangCookie] = useState(decodeURIComponent(prefLangCookie));

  useEffect(() => {

    window.googleTranslateElementInit = googleTranslateElementInit;

    // Define the init function outside the effect to prevent redefining it on every render
    const setLanguageAndTriggerChange = () => {
      const element = document.querySelector(".goog-te-combo");
      if (element) {
        element.value = prefLangCookie.replace('/auto/', '');
        element.dispatchEvent(new Event("change"));
      }
    };

    // Use a timeout to delay the execution, giving the DOM time to load
    setTimeout(setLanguageAndTriggerChange, 1000); // Adjust the timeout as needed

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('load', setLanguageAndTriggerChange);
    };
  }, [prefLangCookie]);

  const onChange = (value) => {
    const lang = "/auto/" + value;
    setLangCookie(lang);
    const element = document.querySelector(".goog-te-combo");
    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div>
      <div id="google_translate_element" style={{ visibility: "hidden", width: "1px", height: "1px" }}></div>
      <LanguageSelector onChange={onChange} value={langCookie} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
};

function LanguageSelector({ onChange, value, renderValueType }) {

  const [isExpended, setIsExpended] = useState(false);
  const langCookie = value.split("/")[2];
  const selectedItem = languages.find((item) => item.value === langCookie) || languages[0];

  return (
    <div className="relative w-max flex flex-col">
      <div
        className="flex gap-2 items-center hover:cursor-pointer"
        onClick={() => setIsExpended(!isExpended)}
      >
        <span className="uppercase notranslate">{selectedItem?.value}</span>
        <Image src={selectedItem?.src} width={30} height={20} alt="Flag" />
      </div>
      {
        isExpended ? (
          <div className="absolute top-10 right-0 w-max flex flex-col p-2 bg-slate-500 rounded-md divide-y-1">
            {
              languages.map((item) => (
                <div
                  key={item.value}
                  className="flex gap-2 items-center justify-between p-2 hover:cursor-pointer hover:bg-slate-600 duration-300"
                  onClick={() => {
                    onChange(item.value);
                    setIsExpended(false);
                  }}
                >
                  <span className="uppercase notranslate">{item.value}</span>
                  <Image src={item.src} width={30} height={20} alt="Flag" />
                </div>
              ))
            }
          </div>
        ) : null
      }
    </div>
  );
}
