import React from 'react'
import styles from "./blog.module.css";
import PostCard from '@/components/postCard/PostCard';
import {  getPosts } from '@/lib/data';
const BlogPage = async () => {
 
/*   this is how we get urls and params from servet side
  console.log(searchParams);

  by default , next js caches the api responses, if we dont wsnt that we can use this option
  if wehave some webiste data that constantly changes , we can use tis option
  another way is that are data gets revalidated after one hour
 */
//getting by an external api
  /* 
    const response = await fetch('https://jsonplaceholder.typicode.com/posts' ,
    {cache : "no-store"} 
    {next : {revalidate:3600 }}
  );
  if (!response.ok){
    return response.status(404).json({ error: "error reponse" })
  }

const posts = await response.json();
 */

// //here we were fetching data from database without using apis
// const posts = await getPosts();

const response = await fetch('http://localhost:3000/api/blog' ,
  {next : {revalidate:3600 }}
);
if (!response.ok){
  return response.status(404).json({ error: "error reponse" })
}

const posts = await response.json();

return (
  <div className={styles.container}>
    {posts.map((post) => (
      <div className={styles.post} key={post.id}>
        <PostCard post={post} />
      </div>
    ))}
  </div>)
}
export default BlogPage