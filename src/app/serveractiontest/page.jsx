import { createPost, deletePost, sayHello } from "@/lib/actions"

const ServerActionTestPage = () => {

    //can also create it here 
    const actionInComponent = async ()=>{
      "use server"
      console.log("it works!")
    }
  //when say hello runs it sends an api request
    return (
      <div>
      {/* giving name is very imp for server actions  */}
        <form action={createPost}>
          <input type="text" placeholder="title" name="title"/>
          <input type="text" placeholder="desc" name="desc"/>
          <input type="text" placeholder="slug" name="slug"/>
          <input type="text" placeholder="userId" name="userId"/>
          <button>Create</button>
        </form>
  
        <form action={deletePost}>
          <input type="text" placeholder="postId" name="id" />
          <button>Delete</button>
        </form>
      </div>
    )
  }
  
  export default ServerActionTestPage