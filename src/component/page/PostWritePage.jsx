import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import data from "../../data.json"

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

function PostWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const { postId } = useParams();
    const [newPostId, setNewPostId] = useState("");
    
    // 게시글 데이터
    const [postData, setPostData] = useState(JSON.parse(localStorage.getItem('posts')));

    useEffect(() => {
        const thisPostData = localStorage.getItem('posts');
        setPostData(thisPostData ? JSON.parse(thisPostData) : []);
        
        if (thisPostData) {
            const lastId = postData.reduce((maxId, item) => Math.max(maxId, item.id), 0);
            setNewPostId(lastId + 1);
        } else {
            setNewPostId(1);
        }

        // postId가 존재하면 setTitle
        if (postId) {
            const post = postData.find(item => item.id == postId);
            console.log(postData)
            if (post) {
                setTitle(post.title);
                setContent(post.content);
            }
        }
    }, []);

    const saveDataToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
      };

    const handleSave = () => {
        if (postId == null){
            const post = {
                id: newPostId,
                title: title,
                content: content,
                comments: []
            };
    
            postData.push(post)
            
            saveDataToLocalStorage('posts', postData);
        } else {
            const modifiedData = postData.map(item => {
                if (item.id == postId) {
                  return { ...item, title: title, content: content }; // Spread 문법을 사용하여 객체를 복제하고 수정
                }
                return item;
              });
            localStorage.setItem('posts', JSON.stringify(modifiedData));
        }
        navigate("/")
    }

    return (
        <Wrapper>
            <Container>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />

                <TextInput
                    height={480}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                />

                <Button
                    title="글 작성하기"
                    onClick={handleSave}
                />
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;