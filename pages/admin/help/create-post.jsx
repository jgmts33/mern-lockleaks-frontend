"use client";
import Image from 'next/image';
import {
  Button, Link, ScrollShadow, Input,
  Select,
  SelectItem
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import dynamic from "next/dynamic";
import { addNewArticle, getHelpArticle, getHelpCategories, updateHelpArticle } from '../../../axios/help';

const TextEditer = dynamic(() => import("../../../components/text-editor"), {
  ssr: false,
});

export default function CreatePost() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isActionProcessing, setIsActionProcessing] = useState(false);
  const [articleDetails, setArticleDetails] = useState({
    title: "",
    content: "",
    categoryId: null
  })

  const getCategoriesInfo = async () => {

    const res = await getHelpCategories();
    if (res.status == 'success') setCategories(res.data);

  }

  const handleSubmit = useCallback(async () => {
    if (articleDetails.title && articleDetails.content && articleDetails.categoryId) {
      setIsActionProcessing(true);

      if (searchParams.get('id')) {
        const res = await updateHelpArticle(searchParams.get('id'), articleDetails);

        if (res.status == 'success') router.push("/admin/help")
        else {
          console.log("Error:", res.data);
        }
      } else {
        const res = await addNewArticle(articleDetails);

        if (res.status == 'success') router.push("/admin/help")
        else {
          console.log("Error:", res.data);
        }
      }
      setIsActionProcessing(false);
    }

  }, [articleDetails, searchParams.get('id')]);

  useEffect(() => {
    setMounted(true);
    (async () => {
      setIsProcessing(true);
      getCategoriesInfo();
      if (searchParams.get('id')) {
        const res = await getHelpArticle(searchParams.get('id'));
        setArticleDetails(res.data);
      }
      setIsProcessing(false);
    })();
  }, []);

  return (
    <div className='flex flex-col bg-gradient-to-tr px-5 space-y-6 text-white w-full'>
      <div className='mt-5 max-lg:mx-auto'>
        <span className='font-extrabold text-lg'>Help Article</span>
      </div>
      <div className='flex justify-end mt-10'>
        <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg text-base" size='md' onClick={() => router.push("/admin/help")}>
          Back
        </Button>
      </div>
      {
        isProcessing ?
          <div className='w-full flex justify-center mt-6'>
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          :
          <>
            <div className='space-y-6'>
              {
                categories.length && articleDetails ? <Select
                  isRequired
                  label="Category"
                  placeholder="Select Category"
                  className="max-w-xs"
                  defaultSelectedKeys={[`${articleDetails.categoryId}`]}
                  onChange={(e) => setArticleDetails(p => ({ ...p, categoryId: e.target.value }))}
                >
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      selected={articleDetails.categoryId == category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </Select> : <div></div>}
              <Input
                type="text"
                label="Title"
                value={articleDetails.title}
                onChange={(e) => setArticleDetails(p => ({ ...p, title: e.target.value }))}
              />
            </div>
            {mounted ?
              <TextEditer
                value={articleDetails.content}
                setValue={(value) => setArticleDetails(p => ({ ...p, content: value }))}
              />
              : <></>
            }
            <div className='flex justify-end'>
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg w-40 mb-5"
                onPress={handleSubmit}
                isLoading={isActionProcessing}
              >
                Post
              </Button>
            </div>
          </>
      }
    </div>
  )
}
;