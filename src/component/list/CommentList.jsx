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
    const commentList = props.post.comments;
    const { deleteComment } = props;

    return (
        <Wrapper>
            {commentList && commentList.map((comment, index) => {
                return <CommentListItem key={comment.id} comment={comment}
                    //  updateComment={updateComment}
                    deleteComment={deleteComment}/>;
            })}
        </Wrapper>
    );
}

export default CommentList;