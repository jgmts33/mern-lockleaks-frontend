"use client";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
    Button, Image, Link
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { deleteDmcaImage, getDmcaImages, getDmcaImagesPositions, updateDmcaImagesPositions } from '@/axios/dmca';
import { RemoveIcon } from '@/components/utils/Icons';


const handleBack = () => {
    history.back()
}

export default function DmcaBadgeDetails() {

    const [list, setList] = useState([]);

    const icons = {
        remove: <RemoveIcon />
    }

    const getDmcaImagesInfo = async () => {
        const res = await getDmcaImages();
        const positionsRes = await getDmcaImagesPositions();

        if (res.status == 'success') {
            if (positionsRes.data.length) {
                let _list = [];
                positionsRes.data?.map((item, index) => {
                    const data = res.data.find((badge) => badge.id == item);
                    _list.push(data);
                });
                setList(_list);
            } else {
                setList(res.data);
            }

        }
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = reorder(
            list,
            result.source.index,
            result.destination.index
        );

        setList(items);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const handleDelete = async (id) => {
        const res = await deleteDmcaImage(id);

        if (res.status == 'success') {
            setList(pre => {
                let data = pre;
                return data.filter((p) => p.id != id);
            });
        }
    }

    useEffect(() => {
        getDmcaImagesInfo();
    }, []);

    useEffect(() => {
        if (!list.length) return;
        let requestDebounce = setTimeout(() => {
            console.log("list:", list);
            let positionsRequestData = [];
            list.map(item => positionsRequestData.push(item.id));
            updateDmcaImagesPositions(positionsRequestData);
        }, 1000);

        return () => clearTimeout(requestDebounce);
    }, [list]);

    useEffect(() => {
        console.log("list:", list);
    }, [list])

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 text-white max-lg:mx-auto w-full">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DMCA BADGES</span>
            </div>
            <div className='flex justify-end mt-10'>
                <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg text-base" size='md' onClick={() => handleBack()}>
                    Back
                </Button>
            </div>

            <div className='mt-2'>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className='space-y-2' >
                                {list.map((item, index) => (
                                    <Draggable key={item?.id} draggableId={`${item?.id}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="flex flex-col gap-2 relative w-full h-24 bg-cover border border-gray-500 rounded-[20px] cursor-pointer">
                                                    <div className='flex w-full relative h-full backdrop-blur-3xl bg-white/10 rounded-[20px] px-2 py-4'>
                                                        <Image
                                                            src={`https://server.lockleaks.com/images?filename=${item?.name}`}
                                                            width={200}
                                                            height={100}
                                                            className='rounded-2xl max-w-full max-h-full'
                                                            alt={item?.name}
                                                        />
                                                        <Button
                                                            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg p-1 text-base absolute top-2 right-2"
                                                            isIconOnly
                                                            size='sm'
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            {icons.remove}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}
