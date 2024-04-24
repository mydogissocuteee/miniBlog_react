import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import CommentListItem from "./CommentListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function CommentList(props) {
    // 쿼리스트링으로 넘어온 postId 값~!
    const { postId } = useParams();

    // 로컬에서 받아온 게시글 데이터
    const [postData, setPostData] = useState(JSON.parse(localStorage.getItem('posts')));
    const [post, setPost] = useState(null);
    const [commentList, setCommentList] = useState(null);

    // 마운트/언마운트 시에 실행. 게시글 데이터에서 postId에 해당하는 글 찾기
    useEffect(() => {
        const post = postData.find(item => item.id == postId);
        setPost(post);
        if (post) {
            setCommentList(post.comments);
        }
    }, [ postId, postData ]);

    return (
        <Wrapper>
            {commentList && commentList.map((comment, index) => {
                return (<CommentListItem key={comment.id} comment={comment}
                    //  updateComment={updateComment} 
                     />);
            })}
        </Wrapper>
    );
}

export default CommentList;