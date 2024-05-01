import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import Button from "../ui/SmallButton.jsx";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const CommentText = styled.p`
    font-size: 14px;
    white-space: pre-wrap;
`

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 8px;
    height: 32px; /* 수정: 버튼 높이와 동일하게 맞춤 */
`

function CommentListItem(props) {
    const { comment, deleteComment } = props;
    const { postId } = useParams();

    const commentId = comment.id;

    const saveDataToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const [postList, setPostlist] = useState(JSON.parse(localStorage.getItem('posts')));
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        setPost(postList.find((item) => {

        return item.id ==postId;
        }))
    }, []);
    
    function updateComment () {
        // 글 데이터에서 해당 id 찾기
        const modifiedData = postList.map(item => {
            if (item.id == postId) {
                const commentList = item.comments
                const modifiedData2 = commentList.map(item2 => {
                    if (item2.id == comment.id) {
                        return { ...item2, content: comment.id+"  수정됨" }
                    } else {
                        return item2;
                    }
                });

                return { ...item, comments: modifiedData2 };
            }
            return item;
            });

          saveDataToLocalStorage('posts', modifiedData);
          setPostlist(modifiedData)
    }

    return (
        <Wrapper>
            <CommentText>{comment.content}</CommentText>
            <ButtonContainer>
            <Button
                title="수정"
                onClick={updateComment}
            />
            <Button
                title="삭제"
                onClick={()=>deleteComment(commentId)}
            />
            </ButtonContainer>
        </Wrapper>
    )
}

export default CommentListItem;