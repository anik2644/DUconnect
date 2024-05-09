
import { useState } from "react"
import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"




const Home = () => {
  const [posts,setPosts] = useState([])

  return (
    <div className="home">
      <Stories />
      <Share posts={posts} setPosts={setPosts}/>
      <Posts posts={posts} setPosts={setPosts}/>
    </div>
  )
}

export default Home