import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
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


function MainPage(props) {
    const {} = props;

    const navigate = useNavigate();

    const [postList, setPostlist] = useState([]);

    useEffect(() => {
        const thispostList = localStorage.getItem('posts');
        setPostlist(thispostList ? JSON.parse(thispostList) : []);
    }, []);

    return (
        <Wrapper>
            <Container>
                <Button
                    title="글 작성하기"
                    onClick={() => {
                        navigate("/post-write");
                    }}
                />

                <PostList
                    posts={postList}
                    onClickItem={(item) => {
                        navigate(`/post/${item.id}`)
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default MainPage;