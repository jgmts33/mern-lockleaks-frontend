"use client";
import Image from 'next/image';
import {
  Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow,
  useDisclosure
} from '@nextui-org/react';
import { Chip } from "@nextui-org/chip";
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addNewCategory, deleteCategory, deleteHelpArticle, getHelpAriticles, getHelpCategories, updateCategory } from '../../../axios/help';

export default function Blog() {
  const router = useRouter();
  const [isCategoryProcessing, setIsCategoryProcessing] = useState(false);
  const [isArticleProcessing, setIsArticleProcessing] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCategoryActionProcessing, setIsCategoryActionProcessing] = useState(false);
  const [targetCategory, setTargetCategory] = useState({
    id: null,
    name: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const getCategoriesInfo = async () => {

    setIsCategoryProcessing(true);

    const res = await getHelpCategories();
    if (res.status == 'success') setCategories(res.data);

    setIsCategoryProcessing(false);
  }

  const getArticlesInfo = async () => {

    setIsArticleProcessing(true);

    const res = await getHelpAriticles();
    if (res.status == 'success') setArticles(res.data);

    setIsArticleProcessing(false);
  }

  const handleCategorySubmit = useCallback(async () => {
    setIsCategoryActionProcessing(true);
    let res = null;
    if (selectedCategoryId) {
      res = await updateCategory(selectedCategoryId, targetCategory);
      if (res.status == 'success') {
        setCategories(p => {
          return p.map(item => {
            if (item.id == selectedCategoryId) return { ...item, ...targetCategory }
            return item;
          });
        })
        onClose();
      }
    } else {
      res = await addNewCategory({
        name: targetCategory.name,
        description: targetCategory.description
      });
      if (res.status == 'success') {
        setCategories(p => [res.data, ...p]);
        onClose();
      }
    }
    setIsCategoryActionProcessing(false);
  }, [targetCategory, selectedCategoryId]);

  const handleCategoryDelete = async (categoryId) => {
    setIsCategoryActionProcessing(true);

    const res = await deleteCategory(categoryId);
    if (res.status == 'success') {
      setCategories(p => p.filter(item => item.id != categoryId));
    }
    setIsCategoryActionProcessing(false);
  }

  const handleArticleDelete = async (articleId) => {
    setIsCategoryActionProcessing(true);

    const res = await deleteHelpArticle(articleId);
    if (res.status == 'success') {
      setArticles(p => p.filter(item => item.id != articleId));
    }
    setIsCategoryActionProcessing(false);
  }

  const handleCreatePost = () => {
    router.push("/admin/help/create-post")
  }

  useEffect(() => {
    getCategoriesInfo();
    getArticlesInfo();
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
      <div className='max-lg:mx-auto max-sm:mt-0'>
        <span className='font-extrabold text-lg'>Help</span>
      </div>
      <div className='flex items-center space-x-20 max-lg:justify-between mt-5'>
        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='md' onClick={() => handleCreatePost()}>
          Create post
        </Button>
      </div>
      <div className='flex gap-5 max-xl:flex-col max-sm:gap-0'>
        <div className='mt-6 max-lg:justify-center max-lg:items-center min-w-[380px] w-[380px] max-sm:w-full '>
          <p className='mb-4 uppercase'>Categories</p>
          <div className="flex flex-col w-full bg-white/15 border border-gray-500 rounded-[20px] px-5 pt-5 pb-10 max-md:mx-auto h-[calc(100vh-260px)]">

            <Button
              radius="lg"
              className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base w-full mx-[10px]"
              size='md'
              onClick={() => {
                onOpen();
                setSelectedCategoryId(null);
                setTargetCategory({
                  id: null,
                  name: '',
                  description: ''
                });
              }}
            >
              Add New Category
            </Button>
            <ScrollShadow>
              <div className='flex flex-col gap-5 mt-8 w-full px-[10px]'>
                {
                  isCategoryProcessing ?

                    <div className='w-full flex justify-center'>
                      <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    :
                    categories.length ? categories.map((item, index) => (
                      <div key={index}>
                        <div className='flex items-center gap-2 mb-4' >
                          <div className='px-2 min-w-7 h-6 bg-gradient-to-tr from-purple-light to-purple-weight rounded-full flex items-center justify-center'>{index + 1}</div>
                          <div className='flex gap-4 justify-between w-full'>
                            <div className='text-lg max-w-[100px] truncate'>{item.name}</div>
                            <div className='flex gap-4 items-center'>
                              <Button
                                radius="full"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                size='sm'
                                onPress={() => {
                                  setSelectedCategoryId(item.id);
                                  setTargetCategory(item);
                                  onOpen();
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                radius="full"
                                className="bg-gradient-to-tr from-gray-600 to-gray-700 border border-gray-500 text-white shadow-lg text-base"
                                size='sm'
                                isLoading={isCategoryActionProcessing}
                                onPress={() => {
                                  handleCategoryDelete(item.id);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                        <hr className='w-full' />
                      </div >
                    ))
                      :
                      <p className='text-center'>There is not any created Categories</p>
                }
              </div>
            </ScrollShadow>
          </div>
          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            size='lg'
            onOpenChange={onOpenChange}
            classNames={{
              backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
            }}
          >
            <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
              {(onClose) => (
                <>
                  <ModalHeader>
                    {selectedCategoryId ? "Update Category" : "New Category"}
                  </ModalHeader>
                  <ModalBody>
                    <div className='flex flex-col gap-4'>
                      <Input
                        type="text"
                        label="Name"
                        value={targetCategory.name}
                        onChange={(e) => setTargetCategory(p => ({ ...p, name: e.target.value }))}
                      />
                      <Input
                        type="text"
                        label="Description"
                        value={targetCategory.description}
                        onChange={(e) => setTargetCategory(p => ({ ...p, description: e.target.value }))}
                      />
                      <div className='flex my-2 justify-end'>
                        <Button
                          radius="lg"
                          className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                          onClick={handleCategorySubmit}
                          isLoading={isCategoryActionProcessing}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className='w-full mt-6'>
          <p className='mb-4 uppercase'>Help Postings</p>
          <div className='bg-white/10 shadow-sm border border-gray-500 px-6 max-sm:px-4 rounded-[16px] w-full h-[calc(100vh-260px)] overflow-y-auto'>
            <ScrollShadow>
              {
                isArticleProcessing ?
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
                  articles.length ? articles.map((article, index) => {
                    return (
                      <div key={index} className='flex flex-col px-2'>
                        <div className='flex justify-between py-7 items-center'>
                          <div className='flex items-center'>
                            <span className={'font-semibold text-lg'}>{article.title}</span>
                            <Chip size='sm' color='primary' className={'ml-8'}>{categories.find(p => p.id == article.categoryId)?.name || ""}</Chip>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <Button
                              radius="full"
                              className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                              size='sm'
                              onPress={() => router.push(`/admin/help/create-post?id=${article.id}`)}
                            >
                              Edit
                            </Button>
                            <Button
                              radius="full"
                              className="bg-gradient-to-tr from-gray-600 to-gray-700 border border-gray-500 text-white shadow-lg text-base"
                              size='sm'
                              onPress={() => handleArticleDelete(article.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <hr className='w-full' />
                      </div>
                    )
                  }) : <p className='text-center mt-10'>There is not any created Help Articles</p>
              }
            </ScrollShadow>
          </div>
        </div>
      </div>
    </div >
  )
}
