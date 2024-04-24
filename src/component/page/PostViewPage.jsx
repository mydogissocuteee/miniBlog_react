import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage(props) {
    const navigate = useNavigate();

    // 쿼리스트링으로 넘어온 postId 값~!
    const { postId } = useParams();

    // 로컬에서 받아온 게시글 데이터
    const [postData, setPostData] = useState(JSON.parse(localStorage.getItem('posts')));
    const [post, setPost] = useState(null);

    // 마운트/언마운트 시에 실행. 게시글 데이터에서 postId에 해당하는 글 찾기
    useEffect(() => {
        setPost(postData.find((item) => {

        return item.id ==postId;
        }))
    }, []);
    
    // 댓글 작성 시 사용
    const [comment, setComment] = useState("");
    
    const saveDataToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
      };

    const deletePost = () => {

        const filteredArray = postData.filter(item => item.id != postId);
                
        saveDataToLocalStorage('posts', filteredArray);

        navigate("/")
    }

    const insertComment = () => {
        const modifiedData = postData.map(item => {
            if (item.id == postId) {
                console.log(item.comments)
                const commentsList = item.comments;
                
                if (commentsList) {
                    const lastId = commentsList.reduce((maxId, item) => Math.max(maxId, item.id), 0);

                    commentsList.push({id: lastId+1, content: comment})
                }

                return { ...item, comments: commentsList }; // Spread 문법을 사용하여 객체를 복제하고 수정
            }
            return item;
            });

            console.log(modifiedData)

            setPost(modifiedData)
        saveDataToLocalStorage('posts', modifiedData);
        setComment("");

        console.log(post)
        console.log(post.comments)

    }

    return (
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => {
                        navigate("/")
                    }}
                />
                <Button
                    title="수정"
                    onClick={() => {
                        navigate(`/postUpdate/${postId}`)
                    }}
                />
                <Button
                    title="삭제"
                    onClick={deletePost}
                />
                <PostContainer>
                    <TitleText>{post && post.title}</TitleText>
                    <ContentText>{post && post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList postId={post && post.id} post={postData} comment={post}/>

                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button
                    title="댓글 작성하기"
                    onClick={insertComment}
                />

            </Container>
        </Wrapper>
    );
}

export default PostViewPage;