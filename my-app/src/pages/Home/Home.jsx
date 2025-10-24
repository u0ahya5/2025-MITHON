// src/pages/Home/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    // 내가 쓴 글 목록
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "힘든 하루였어요",
            content: "오늘 정말 지쳤어요...",
            comfortComments: [
                { id: 1, text: "오늘도 버틴 너 대단해요 🌷", liked: false },
                { id: 2, text: "괜찮아요, 당신 잘하고 있어요.", liked: true },
            ],
        },
        {
            id: 2,
            title: "불안한 마음",
            content: "요즘 계속 불안하고 잠이 안 와요.",
            comfortComments: [
                { id: 1, text: "그럴 수 있어요, 너무 자책하지 마요 💌", liked: false },
                { id: 2, text: "천천히 괜찮아질 거예요 🌙", liked: false },
            ],
        },
    ]);

    const [selectedPost, setSelectedPost] = useState(null);

    // 상세보기 클릭
    const handleShowDetail = (post) => {
        setSelectedPost(post);
    };

    // 뒤로가기 클릭
    const handleBack = () => {
        setSelectedPost(null);
    };

    // 위로글 "마음 표시" 기능
    const handleLikeComment = (commentId) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === selectedPost.id) {
                return {
                    ...post,
                    comfortComments: post.comfortComments.map((c) =>
                        c.id === commentId ? { ...c, liked: !c.liked } : c
                    ),
                };
            }
            return post;
        });

        setPosts(updatedPosts);
        setSelectedPost(updatedPosts.find((p) => p.id === selectedPost.id));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>메인 화면</h1>
            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => navigate("/alarm")}>🔔 알람</button>
                <button onClick={() => console.log("마이페이지로 이동")}>👤 마이페이지</button>
                <button onClick={() => console.log("랜덤 글 받기")}>🎲 랜덤 글</button>
            </div>

            {/* 글 목록 보기 */}
            {!selectedPost ? (
                <>
                    <h2>내가 쓴 글</h2>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                margin: "10px 0",
                                borderRadius: "8px",
                            }}
                        >
                            <h3>{post.title}</h3>
                            <p>{post.content.substring(0, 20)}...</p>
                            <button onClick={() => handleShowDetail(post)}>자세히 보기</button>
                        </div>
                    ))}
                </>
            ) : (
                // 글 상세 보기
                <div>
                    <button onClick={handleBack}>⬅ 뒤로가기</button>
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.content}</p>

                    <h3>익명의 위로글들</h3>
                    {selectedPost.comfortComments.map((comment) => (
                        <div
                            key={comment.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                margin: "10px 0",
                                borderRadius: "8px",
                            }}
                        >
                            <p>{comment.text}</p>
                            <button onClick={() => handleLikeComment(comment.id)}>
                                {comment.liked ? "💖 마음 표시됨" : "🤍 마음 표시"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
