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

  const [categories, setCategories] = useState([]);
  const [tagsStr, setTagsStr] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
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
      setIsProcessing(true);

      if (searchParams.get('id')) {
        const res = await updateHelpArticle(searchParams.get('id'), formData);

        if (res.status == 'success') router.push("/admin/help")
        else {
          console.log("Error:", res.data);
        }
      } else {
        const res = await addNewArticle(formData);

        if (res.status == 'success') router.push("/admin/help")
        else {
          console.log("Error:", res.data);
        }
      }
      setIsProcessing(false);
    }

  }, [articleDetails, searchParams.get('id')]);

  useEffect(() => {
    setMounted(true);
    getCategoriesInfo();
    (async () => {
      if (searchParams.get('id')) {
        const res = await getHelpArticle(searchParams.get('id'));
        setArticleDetails(res.data);
      }
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
      <div className='space-y-6'>
        <Select
          label="Category"
          placeholder="Select Category"
          className="max-w-xs"
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
        </Select>
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
          isLoading={isProcessing}
        >
          Post
        </Button>
      </div>
    </div>
  )
}
;