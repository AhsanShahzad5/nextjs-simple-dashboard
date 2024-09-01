import React, { Suspense } from 'react'
import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from '@/components/postUser/PostUser';
import { getPost } from '@/lib/data';


//dynamic meta deta
//also we can make as many api calls as we want within a same page , next js fetches them only once so it doesnt afect perfomrance

export const generateMetadata = async ({params})=> {
  const {slug} = params;
  const post = await getPost(slug);
  return{

    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  //FETCH WITHvexternal API
  // const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`,
  //   /*{cache : "no-store"} */
  //   { next: { revalidate: 3600 } }
  // );
  // if (!response.ok) {
  //   return response.status(404).json({ error: "error reponse" })
  // }

  // const post = await response.json();

  //fetching from db without an api
  //const post = await getPost(slug)

const response = await fetch(`http://localhost:3000/api/blog/${slug}`,
    /*{cache : "no-store"} */
    { next: { revalidate: 3600 } }
  );
  if (!response.ok) {
    return response.status(404).json({ error: "error reponse" })
  }
  const post = await response.json();

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={`https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg`} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.body}</div>
      </div>
    </div>
  )
}

export default SinglePostPage