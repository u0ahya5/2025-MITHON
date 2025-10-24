// src/pages/Home/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate(); // 페이지 이동 함수
    const [posts, setPosts] = useState([
        { id: 1, title: "힘든 하루였어요", content: "오늘 정말 지쳤어요...", liked: false },
        { id: 2, title: "불안한 마음", content: "요즘 계속 불안하고 잠이 안 와요.", liked: true },
    ]);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleLike = (id) => {
        setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
    };

    const handleShowDetail = (post) => {
        setSelectedPost(post);
    };

    const handleBack = () => {
        setSelectedPost(null);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>메인 화면</h1>
            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => navigate("/alarm")}>🔔 알람</button>
                <button onClick={() => console.log("마이페이지로 이동")}>👤 마이페이지</button>
                <button onClick={() => console.log("랜덤 글 받기")}>🎲 랜덤 글</button>
            </div>

            {!selectedPost ? (
                <>
                    <h2>내가 쓴 글</h2>
                    {posts.map((post) => (
                        <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                            <h3>{post.title}</h3>
                            <p>{post.content.substring(0, 20)}...</p>
                            <button onClick={() => handleShowDetail(post)}>자세히 보기</button>
                            <button onClick={() => handleLike(post.id)}>
                                {post.liked ? "💖 마음 표시됨" : "🤍 마음 표시"}
                            </button>
                        </div>
                    ))}
                </>
            ) : (
                <div>
                    <button onClick={handleBack}>⬅ 뒤로가기</button>
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.content}</p>

                    <h3>다른 사람들의 위로글</h3>
                    <ul>
                        <li>당신은 정말 잘하고 있어요 🌷</li>
                        <li>괜찮아요, 이 시기도 곧 지나갈 거예요.</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
