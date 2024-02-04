import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firbase";


export const blogsApi = createApi({
    reducerPath: 'Blogsapi',
    baseQuery: fakeBaseQuery(), // if we are using api to fetch the data then we have to use 'fetchBaseQuery' here
                                // since we dont use api here,we have to give 'fakeBaseQuery'
    tagTypes: ["blogs"], //this is giving for real time update of data in redux store
    endpoints: (builder) => ({ // an "endpoint" refers to a specific operation that your application can perform 
                               // These operations include fetching data (queries), creating, 
                               // updating, or deleting data (mutations), or a combination of these.

        //this 'fetchBlogs' endoint is for fetching data
        fetchBlogs: builder.query({   // 'query' we use for fetching data
            async queryFn() {
                try {
                    const blogRef = collection(db, "blogs")
                    const querySnapshot = await getDocs(blogRef)
                    const blogs: Array<{ id: string; downloadURL: string; title: string; description: string; }> = [];
                    querySnapshot?.forEach((doc) => {
                        blogs.push({
                            id: doc.id,
                            downloadURL: doc.data().downloadURL,
                            title: doc.data().title,
                            description: doc.data().description
                        })
                    })
                    return { data: blogs }
                } catch (err) {
                    return { error: err }
                }
            },
            providesTags: ["blogs"]
        }),
        
        //this 'addBlog' endoint is for adding data
        addBlog: builder.mutation({   // 'mutation' we use for create,update,deleting of data
            async queryFn(data) {
                try {
                    // console.log(data)
                    await addDoc(collection(db, "blogs"), {
                        ...data,
                        timestamp: serverTimestamp(),
                    });
                    // Return something (or nothing) after a successful mutation
                    return { data: 'success' };
                }
                catch (err) {
                    return { error: err };
                }
            },
            invalidatesTags: ["blogs"]// invalidatesTags: It is used to specify the tags that should be invalidated or 
                                      // refetched when a mutation is successfully executed. It indicates which 
                                      // parts of the cache need to be updated or refetched.
        }),

        //this endoint is for deleting data
        deleteBlog: builder.mutation({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(db, "blogs", id))
                    return { data: 'success' }
                } catch (err) {
                    return { error: err }
                }
            },
            invalidatesTags: ["blogs"]
        }),

        //this endoint is for fetching one single document data while updating data
        fetchBlog: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, "blogs", id)
                    const snapshot = await getDoc(docRef);
                    return { data: snapshot.data() }
                } catch (err) {
                    return { error: err }
                }
            },
            providesTags: ["blogs"]
        }),

        //this endoint is for updating data
        updateBlog: builder.mutation({
            async queryFn({ id, details }) {
                try {
                    console.log(details)
                    await updateDoc(doc(db, "blogs", id), {
                        ...details,
                        timestamp: serverTimestamp()
                    });
                    return { data: 'success' }
                } catch (err) {
                    return { error: err }
                }
            },
            invalidatesTags: ["blogs"]
        })
    })
})

//we will get hooks from the created endpoints
export const {
    useFetchBlogsQuery,
    useAddBlogMutation,
    useDeleteBlogMutation,
    useFetchBlogQuery,
    useUpdateBlogMutation } = blogsApi 