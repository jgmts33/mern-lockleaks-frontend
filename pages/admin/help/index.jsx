"use client";
import {
  Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow,
  Spinner,
  useDisclosure
} from '@nextui-org/react';
import { Chip } from "@nextui-org/chip";
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addNewCategory, deleteCategory, deleteHelpArticle, getHelpAriticles, getHelpCategories, updateCategory } from '@/axios/help';

export default function Blog() {
  const router = useRouter();
  const [isCategoryProcessing, setIsCategoryProcessing] = useState(false);
  const [isArticleProcessing, setIsArticleProcessing] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCategoryActionProcessing, setIsCategoryActionProcessing] = useState(-1);
  const [isArticleActionProcessing, setIsArticleActionProcessing] = useState(-1);
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
    setIsCategoryActionProcessing(selectedCategoryId);
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
    setIsCategoryActionProcessing(-1);
  }, [targetCategory, selectedCategoryId]);

  const handleCategoryDelete = async (categoryId) => {
    setIsCategoryActionProcessing(categoryId);

    const res = await deleteCategory(categoryId);
    if (res.status == 'success') {
      setCategories(p => p.filter(item => item.id != categoryId));
    }
    setIsCategoryActionProcessing(-1);
  }

  const handleArticleDelete = async (articleId) => {
    setIsArticleActionProcessing(articleId);

    const res = await deleteHelpArticle(articleId);
    if (res.status == 'success') {
      setArticles(p => p.filter(item => item.id != articleId));
    }
    setIsArticleActionProcessing(-1);
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
        <div className='mt-6 max-lg:justify-center max-lg:items-center min-w-[430px] w-[430px] max-sm:w-full '>
          <p className='mb-4 uppercase'>Categories</p>
          <div className="flex flex-col w-full bg-white/15 border border-gray-500 rounded-[20px] px-5 pt-5 pb-10 max-md:mx-auto h-[calc(100vh-260px)]">
            <div className='w-full px-[10px]'>
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base w-full "
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
            </div>
            <ScrollShadow>
              <div className='flex flex-col gap-5 mt-8 w-full px-[10px]'>
                {
                  isCategoryProcessing ?

                    <div class="w-full justify-center flex">
                      <Spinner />
                    </div>
                    :
                    categories.length ? categories.map((item, index) => (
                      <div key={index}>
                        <div className='flex items-center gap-2 mb-4' >
                          <div className='px-2 min-w-7 h-6 bg-gradient-to-tr from-purple-light to-purple-weight rounded-full flex items-center justify-center'>{index + 1}</div>
                          <div className='flex gap-4 justify-between w-full'>
                            <p className='text-lg w-[100px] truncate'>{item.name}</p>
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
                                isLoading={isCategoryActionProcessing == item.id}
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
                  <div class="w-full justify-center flex mt-6">
                    <Spinner />
                  </div>
                  :
                  articles.length ? articles.map((article, index) => {
                    return (
                      <div key={index} className='flex flex-col px-2'>
                        <div className='flex justify-between py-7 items-center '>
                          <div className='flex items-center gap-2 flex-wrap'>
                            <span className={'font-semibold text-lg'}>{article.title}</span>
                            <Chip size='sm' color='primary' >{categories.find(p => p.id == article.categoryId)?.name || ""}</Chip>
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
                              isLoading={isArticleActionProcessing == article.id}
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
