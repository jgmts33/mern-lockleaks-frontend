"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { tuple } from 'yup';
import { Editor } from '@tinymce/tinymce-react';

export default function CreatePost() {
    const router = useRouter();
    const [selectblog, setSlectBlog] = useState(0);
    const [value, setValue] = useState('<p></p>');
    const [text, setText] = useState('');

    const blogContent = [
        {
            title: "Title"
        }, {
            title: "Title"
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 space-y-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>BLOG</span>
            </div>
            <div className='flex mt-5 w-full px-3'>
                <Input type="text" label="Title" />
            </div>
            <Editor
                apiKey='j9vvbxoc4iq2zp87e9zuryasu0roc91682u6ayc1btavtr7u'
                value={value}
                onInit={(evt, editor) => {
                    setText(editor.getContent({ format: 'text' }));
                }}
                onEditorChange={(newValue, editor) => {
                    setValue(newValue);
                    setText(editor.getContent({ format: 'text' }));
                }}
                init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
            />
            <textarea>{text}</textarea>
            <div className='flex justify-end'>
                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg" size='sm'>
                    START
                </Button>
            </div>
        </div>
    )
}
