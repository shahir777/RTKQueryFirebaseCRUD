import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { storage } from '../firbase';
import { v4 as uuidv4 } from 'uuid';
import { useAddBlogMutation, useFetchBlogQuery, useUpdateBlogMutation } from '../Services/BlogsApi';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';

const AddEditBlog = () => {

    // const initialstate = {
    //     title: " ",
    //     description: " "
    // }

    // const [data, setData] = useState(initialstate)

    // const { title, description } = data

    interface BlogDetails {
        title: string;
        description: string;
        downloadURL?: string; // Make downloadURL optional as it may not be present during updates
    }

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        pict: null as File | null
    });


    const [loading, setLoading] = useState(false);

    //rtk query hook for adding the data
    const [addBlog] = useAddBlogMutation()

    //rtk query hook for fethcing one document data while updating the data
    const { id } = useParams()
    const { data: blog, error } = useFetchBlogQuery(id ? id : skipToken)

    //useEffect for fetching one document data and display in input fields while updating the data
    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || "",
                description: blog.description || "",
                pict: null,
            });
        }
    }, [blog]);

    //rtk query hook for updating the data
    const [updateBlog] = useUpdateBlogMutation()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files !== null) {
            setFormData(prev => ({ ...prev, pict: files[0] }));
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (error) {
        // Handle error here
        return <div>Error loading data</div>;
    }


    // const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        // console.log(pict)
        try {
            let details: BlogDetails = {
                title: formData.title,
                description: formData.description,
            };

            //if user is doing add operation('id' will not be there in useParams),uploading pictue should be required
            if (!formData.pict && !id) {
                alert("please upload the image")
                return
            }

            if (formData.pict) {
                const imgs = ref(storage, `files/${uuidv4()}`);
                const uploadTask = await uploadBytes(imgs, formData.pict as unknown as File);
                const downloadURL = await getDownloadURL(uploadTask.ref);
                details = {
                    ...details,
                    downloadURL,
                };
            }

            //if user is adding the data('id' will not be there in useParams)
            if (!id) {
                // Add operation
                await addBlog(details);
            } 
            
            //if user is updating the data('id' will be there in useParams)
            else {
                // Update operation
                await updateBlog({ id, details });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex justify-center items-center h-screen" onSubmit={handleSubmit}>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        name='title'
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        name='description'
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                        File:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="pict"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddEditBlog;