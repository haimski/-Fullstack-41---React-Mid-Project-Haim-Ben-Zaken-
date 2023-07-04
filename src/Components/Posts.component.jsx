import { uniqueId } from "lodash";
const PostsComponent = ({currentUser, posts}) => {

    return (
        <>
            <div className='user-items set-border'>
                    <div className="user-items-title">
                        <div className="title-row">
                            <span>Posts - User {currentUser && currentUser.id}</span>
                            <span><button>Add</button></span>
                        </div>
                        <ul className={posts.length > 0 ? 'user-items-list set-border' : 'user-items-list'}>
                            {
                                posts && posts.map((post, index) => {
                                    if (index < 3) {
                                        return (
                                            <li className="user-items-list-item post" key={uniqueId('post-')}>
                                                <div className="user-items-list-item-title post-title">
                                                    <span>Title:</span>
                                                    <span>{post.title}</span>
                                                </div>
                                                <div className="user-items-list-item-status post-body">
                                                    <span>Body:</span>
                                                    <span>{post.body}</span>
                                                </div>
                                            </li>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
        </>
    )
}

export default PostsComponent