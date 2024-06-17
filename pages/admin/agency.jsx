"use client";
import {
  Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow,
  Switch,
  useDisclosure
} from '@nextui-org/react';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { SelectSwitch, UnselectSwitch } from '../../components/utils/Icons';
import { generateNewPaymentLink } from '../../axios/agency';
import CopyToClipboard from 'react-copy-to-clipboard';
import { checkDoubleUsername } from '../../axios/usernames';

export default function Dmcabadges() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isActionProcessing, setIsActionProcessing] = useState(false);
  const [createdCode, setCreatedCode] = useState("");
  const [warning, setWarning] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [targetKeywordType, setTargetKeywordType] = useState('username');
  const [targetKeywordIndex, setTargetKeywordIndex] = useState(0);
  const [targetKeyword, setTargetKeyword] = useState({
    username: '',
    link: '',
    update: false
  });

  const [urlValidation, setUrlValidation] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [customerCount, setCustomerCount] = useState(0);
  const [isUsernameLinkValidationProcessing, setIsUsernameLinkValidationProcessing] = useState(false);

  const handleSetNewUsername = useCallback(() => {

    console.log(usernames, targetKeywordIndex);
    let newUsername = targetKeyword.username.replace("@", "");
    if (newUsername) {
      const _usernames = usernames.slice(0);
      _usernames[targetKeywordIndex].username = newUsername;
      setUsernames(_usernames);
      setTargetKeywordType('link');
    }
  }, [targetKeyword, usernames, targetKeywordIndex]);

  const handleSetNewLink = useCallback(async () => {
    let newLink = targetKeyword.link.replace("@", "");
    setIsUsernameLinkValidationProcessing(true);
    if (newLink && checkLinkValidation()) {
      const _usernames = usernames.slice(0);
      const res = await checkDoubleUsername({
        username: _usernames[targetKeywordIndex].username,
        link: newLink
      });
      if (res.data.valid && !usernames.filter((item, index) => index != targetKeywordIndex).find(item => item.link === newLink && item.username == targetKeyword.username.replace("@", ""))) {
        _usernames[targetKeywordIndex].link = newLink;
        setUsernames(_usernames);
        setTargetKeyword(null);
        setTargetKeywordType('username');
      }
      else {
        setUrlValidation("Already existed.");
      }
    }
    setIsUsernameLinkValidationProcessing(false);
  }, [targetKeyword, usernames, targetKeywordIndex]);

  const checkLinkValidation = useCallback(() => {
    var url = targetKeyword?.link || "";
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (!regexp.test(url)) {
      setUrlValidation("Please enter valid Link.");
      return false;
    }
    return true;
  }, [targetKeyword]);

  const handleCreateNewPaymentLink = useCallback(async () => {
    setIsActionProcessing(true);
    const res = await generateNewPaymentLink({
      email,
      usernames,
      user_counts: customerCount,
      amount: price
    });

    if (res.status == 'success') {
      setCreatedCode(res.data.code);
    } else {
      setWarning(res.data);
    }
    setIsActionProcessing(false);
  }, [usernames, customerCount, email, price]);

  useEffect(() => {
    setUrlValidation("");
  }, [usernames]);

  return (
    <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
      <div className='flex max-lg:mx-auto'>
        <span className='font-extrabold text-lg'>AGENCY</span>
      </div>
      <div className='grid grid-cols-2 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1 mt-5'>
        <div>
          <p className='font-medium text-lg'>USERNAMES LIST <span className='font-medium text-sm'>({usernames.filter(p => (p.link != "")).length} USERNAMES)</span></p>
          <div className='flex flex-col gap-5 w-full bg-white/10 shadow-sm border border-gray-500 rounded-[16px] p-6 mt-4'>
            <Modal
              backdrop="opaque"
              isOpen={targetKeyword && isOpen}
              size='lg'
              onOpenChange={onOpenChange}
              classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
              }}
            >
              <ModalContent className='bg-gradient-to-br from-gray-600/10 to-gray-800/80 justify-center opacity-[.9]  text-white text-center max-md:absolute max-md:top-32'>
                {(onClose) => (
                  <>
                    <ModalHeader>
                      {
                        targetKeywordType == 'link' ?
                          <p className='font-medium text-center'>{!targetKeyword.update ? "ADD" : "UPDATE"} LINK TO <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{usernames[targetKeywordIndex].username}</span></p>
                          : <p className='font-medium text-center'> {!targetKeyword.update ? "ADD NEW" : "UPDATE"} USERNAME</p>
                      }
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col pb-10 px-10 ">

                        {/* <p className='mt-3'>
                          {targetKeywordType == 'link' ? "We will utilize the profile page URL to establish the ownership of this content" : "We will use the username to identify and report copyright infringements"}
                        </p> */}
                        <div className="flex w-full flex-col gap-4 mt-5">
                          <p className='flex justify-start'>{targetKeywordType == 'link' ? "LINK:" : "USERNAME:"}</p>
                          <div className='flex'>
                            {
                              <div className="w-full flex">
                                <div className="flex flex-col gap-2 mt-1">
                                  <Switch
                                    defaultSelected
                                    size="lg"
                                    color="default"
                                    thumbIcon={({ isSelected, className }) =>
                                      isSelected ? (
                                        <SelectSwitch className={className} />
                                      ) : (
                                        <UnselectSwitch className={className} />
                                      )
                                    }
                                  >
                                  </Switch>
                                </div>
                                <div className='flex flex-col w-full'>
                                  <input
                                    type="text"
                                    placeholder={targetKeywordType == 'username' ? 'Type here.. @username' : 'Type here.... example: https://onlyfans.com/@username'}
                                    value={targetKeywordType == 'link' ? targetKeyword.link : targetKeyword.username}
                                    onChange={(e) => {
                                      if (targetKeywordType == 'link') setTargetKeyword(p => ({ ...p, link: e.target.value }))
                                      else setTargetKeyword(p => ({ ...p, username: e.target.value }))
                                    }}
                                    className='w-full outline-none p-2 rounded-lg bg-white text-black'
                                    required
                                  />
                                  <p className='mt-1 text-red-700 text-left'>{urlValidation}</p>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                        <div
                          className='bg-gradient-to-tr max-sm:flex-wrap w-full mx-auto mt-4 from-gray-600/40 to-gray-800/40 p-1 border-gray-700 border rounded-[30px] max-w-[576px] gap-2 items-center'
                        >
                          <Button
                            radius="full"
                            className="bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg"
                            onClick={() => {
                              if (targetKeywordType == 'link') handleSetNewLink();
                              else handleSetNewUsername();
                            }}
                            isLoading={isUsernameLinkValidationProcessing}
                          >
                            {targetKeywordType == 'link' ? <span>Save</span> : <span>Next</span>}
                          </Button>
                          <Button
                            radius="full"
                            className="w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"
                            onClick={() => {
                              setTargetKeyword(null);
                              setTargetKeywordType("username")
                              let _usernames = targetKeyword.update ? usernames.slice(0) : usernames.slice(0, -1);
                              setUsernames(_usernames);
                            }}
                          >
                            <span>Cancel</span>
                          </Button>
                        </div>
                      </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Button
              radius="md"
              className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base border border-white/40 w-max mt-2"
              size='md'
              onClick={() => {
                setTargetKeyword({
                  username: '',
                  link: ''
                });
                setUsernames(p => [...p, {
                  username: '',
                  link: ''
                }])
                setTargetKeywordIndex(usernames.length)
                onOpen();
              }}
            >
              <span>Add New Username</span>
            </Button>
            <ScrollShadow className='h-[560px] flex flex-col gap-3 py-2'>
              {
                usernames.map((keyword, index) => {
                  return (
                    <div key={index}>
                      {
                        keyword.username && keyword.link ?
                          <div className='flex flex-wrap items-center gap-4 bg-gradient-to-br from-gray-600/10 to-gray-800/80 shadow-sm border border-gray-700 px-4 py-2 w-full rounded-xl'>
                            <p className='max-sm:hidden bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent text-xl font-bold'>{index + 1}</p>
                            <div className='flex flex-col gap-2 flex-1'>
                              <div>USERNAME: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keyword.username}</span></div>
                              <div>LINK: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keyword.link}</span></div>
                            </div>
                            <div className='flex w-max items-center gap-4'>
                              <Button
                                radius="full"
                                className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                size='sm'
                                onClick={() => {
                                  setTargetKeywordIndex(index);
                                  setTargetKeyword({ ...usernames[index], update: true });
                                }}
                              >
                                <span>Edit</span>
                              </Button>
                              <Button
                                radius="full"
                                className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                size='sm'
                                onClick={() => {
                                  setUsernames(p => {
                                    let _p = p.slice(0);
                                    _p.splice(index, 1);
                                    return _p;
                                  });
                                }}
                              >
                                <span>Delete</span>
                              </Button>
                            </div>
                          </div>
                          :
                          <></>}
                    </div>
                  )
                })
              }
            </ScrollShadow>
          </div>

        </div>
        <div>
          <p className='font-medium text-lg text-center'>Bind</p>
          <div className='flex flex-col gap-6 w-full bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-4 max-md:mt-0 p-6 pt-8'>
            <div>
              <Input
                type="text"
                label="Email"
                placeholder="exmaple@gmail.com"
                labelPlacement='outside'
                value={email}
                onChange={(e) => {
                  setWarning("");
                  setEmail(e.target.value);
                }}
              />
              <p className='text-red-600 font-medium text-sm mt-2'>{warning}</p>
            </div>
            <Input
              type="number"
              label="Price"
              labelPlacement='outside'
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">USD</span>
                </div>
              }
            />
            <div className='flex gap-4'>
              <Input
                type="number"
                label="Count of Customers"
                placeholder='0'
                value={customerCount}
                onChange={(e) => setCustomerCount(e.target.value)}
              />
              <Input
                type="number"
                label="Count of photoes"
                disabled
                value={customerCount * 2}
              />
            </div>
            <Button
              radius="lg"
              className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
              onClick={handleCreateNewPaymentLink}
              isLoading={isActionProcessing}
            >
              <span>Create Link</span>
            </Button>
            {createdCode ? <CopyToClipboard text={`${window.location.host}/payment?code=${createdCode}&type=agency`}
              onCopy={() => {
                setIsCopied(true)
                setTimeout(() => {
                  setIsCopied(false);
                }, 1000)
              }}>
              <Button
                radius="lg"
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-8 py-5 text-base"
                size='sm'
              >
                {isCopied ? <span>Copied</span> : <span>Code: '{createdCode}'</span>}
              </Button>
            </CopyToClipboard> : <></>}
          </div>
        </div>
      </div>
    </div>
  )
}
