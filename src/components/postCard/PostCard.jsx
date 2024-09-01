import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({post}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {post.img && <div className={styles.imgContainer}>
          <Image src={`https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg`} alt="" fill className={styles.img}/>
        </div>}
      </div>
        <span className={styles.date}> {post.createdAt?.toString().slice(4, 16)}</span>
      <div className={styles.bottom}>
        
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc}</p>
        
        <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard