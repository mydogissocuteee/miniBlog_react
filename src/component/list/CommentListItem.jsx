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
    const { comment } = props;
    const { postId } = useParams();

    const saveDataToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const [postData, setPostData] = useState(JSON.parse(localStorage.getItem('posts')));
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        setPost(postData.find((item) => {

        return item.id ==postId;
        }))
    }, []);

    console.log(post)
    
    function updateComment () {
        console.log("수정")
        console.log(comment)
        console.log(postData)
        
        // 글 데이터에서 해당 id 찾기
        const modifiedData = postData.map(item => {
            if (item.id == postId) {
                debugger
                console.log(item)
                console.log(item.comments)
                const commentList = item.comments


                const modifiedData2 = commentList.map(item2 => {
                    debugger
                    if (item2.id == comment.id) {
                        console.log("댓글====")
                        console.log(item2)
                        return { ...item2, content: comment.id+"  수정됨" }
                        // return { ...item, title: title, content: content }; // Spread 문법을 사용하여 객체를 복제하고 수정
                    } else {
                        return item2;
                    }
                });

                console.log(modifiedData2)
                console.log(item)
                console.log(item.comments)

                return { ...item, comments: modifiedData2 };
            }
            return item;
            });

            
          saveDataToLocalStorage('posts', modifiedData);
          setPostData(modifiedData)
    }
    
    function deleteComment () {
        const modifiedData = postData.map(item => {
            if (item.id == postId) {
                const commentList = item.comments
                const newArray = commentList.filter(item => item.id !== comment.id);
                item.comments = newArray

                return { ...item, comments: newArray };
                // return { ...item, title: title, content: content }; // Spread 문법을 사용하여 객체를 복제하고 수정
            }
            return item;
            });

          saveDataToLocalStorage('posts', modifiedData);
          setPostData(modifiedData)
    
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
                onClick={deleteComment}
            />
            </ButtonContainer>
        </Wrapper>
    )
}

export default CommentListItem;