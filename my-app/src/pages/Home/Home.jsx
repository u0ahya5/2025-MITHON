import React, { useState } from "react";
import { Bell, User, ChevronLeft, Heart } from 'lucide-react';

// Mock Data (Expanded content for better detail view)
const initialPosts = [
    {
        id: 1,
        title: "힘든 하루였어요",
        content: "오늘 정말 지쳤어요. 몸도 마음도 지쳐서 아무것도 하고 싶지 않은 날이네요. 이 감정을 누군가에게 말하고 싶지만, 괜찮은 척하는 게 익숙해져 버렸어요. 오늘 버틴 나에게 '잘했다'고 말해주고 싶지만, 그럴 힘도 없네요.",
        comfortComments: [
            { id: 1, text: "오늘도 버틴 너 대단해요 🌷", liked: false },
            { id: 2, text: "괜찮아요, 당신 잘하고 있어요.", liked: true },
            { id: 3, text: "충분히 힘들어도 되는 날이에요. 잠시 모든 걸 내려놓고 쉬세요.", liked: false },
        ],
    },
    {
        id: 2,
        title: "불안한 마음",
        content: "요즘 계속 불안하고 잠이 안 와요. 미래에 대한 걱정, 내가 제대로 가고 있는 건지 하는 의문들. 머릿속이 너무 복잡해서 숨이 막히는 것 같아요. 언제쯤 편안하게 잠들 수 있을까요?",
        comfortComments: [
            { id: 1, text: "그럴 수 있어요, 너무 자책하지 마요 💌", liked: false },
            { id: 2, text: "천천히 괜찮아질 거예요 🌙", liked: false },
            { id: 3, text: "불안함은 당신이 열심히 살고 있다는 증거예요. 잠시 멈춰 서서 심호흡하세요.", liked: true },
        ],
    },
    {
        id: 3,
        title: "작은 기쁨을 찾아서",
        content: "오랜만에 하늘을 봤는데 구름이 정말 예뻤어요. 아주 작은 순간이었지만 왠지 모르게 마음이 따뜻해졌네요. 이런 사소한 행복을 자주 찾으려고 노력해야겠어요. 오늘 하루도 고생 많았습니다.",
        comfortComments: [
            { id: 1, text: "예쁜 마음을 가진 당신이 더 예뻐요! ✨", liked: false },
            { id: 2, text: "작은 기쁨들이 모여 큰 행복이 된답니다. 응원해요! 🌈", liked: false },
        ]
    }
];

const Home = () => {
    // --- State and Handlers ---
    const [posts, setPosts] = useState(initialPosts);
    const [selectedPost, setSelectedPost] = useState(null);
    const userName = "아이콘 님";

    // Mock navigation function (for console logging)
    const navigate = (path) => console.log(`Navigating to: ${path}`);

    const handleShowDetail = (post) => setSelectedPost(post);
    const handleBack = () => setSelectedPost(null);

    const handleLikeComment = (commentId) => {
        // 1. Update the posts array (main data source)
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

        // 2. Update selectedPost to reflect the new state immediately for the detail view
        const updatedSelectedPost = updatedPosts.find((p) => p.id === selectedPost.id);
        setSelectedPost(updatedSelectedPost);
    };


    // --- Component Rendering ---
    return (
        <div className="app-container">
            <style>
                {`
                    /* Google Fonts - Noto Sans KR, for better Korean rendering */
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

                    /* Base Styles */
                    .app-container {
                        min-height: 100vh;
                        padding-top: 60px; /* Header height */
                        font-family: 'Noto Sans KR', sans-serif;
                        background-color: #f5f5f5;
                    }

                    /* --- Fixed Header --- */
                    .header {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 10;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 20px;
                        background-color: #FF6B6B; /* Primary Red */
                        color: white;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .header h1 {
                        font-size: 20px;
                        font-weight: 700;
                    }

                    .header .user-info {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }

                    .header .user-info span {
                        font-size: 14px;
                        font-weight: 500;
                        display: none; /* Hidden on small screens */
                    }
                    @media (min-width: 640px) {
                        .header .user-info span {
                            display: inline;
                        }
                    }

                    .header button {
                        background: none;
                        border: none;
                        color: white;
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 50%;
                        transition: background-color 0.2s;
                    }
                    .header button:hover {
                        background-color: rgba(255, 255, 255, 0.2);
                    }

                    /* --- Main Content --- */
                    .main-content {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 16px;
                    }

                    /* Action Area */
                    .action-area {
                        text-align: center;
                        margin: 32px 0 48px 0;
                    }

                    .action-area h2 {
                        font-size: 24px;
                        font-weight: 600;
                        color: #4a4a4a;
                        margin-bottom: 24px;
                    }

                    .action-area .btn-group {
                        display: flex;
                        justify-content: center;
                        gap: 16px;
                    }

                    .action-area button {
                        padding: 12px 24px;
                        border-radius: 9999px; /* Fully rounded */
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        transition: all 0.2s ease;
                        min-width: 140px;
                    }

                    .action-area .btn-primary {
                        background-color: #FF6B6B;
                        color: white;
                        border: none;
                    }
                    .action-area .btn-primary:hover {
                        background-color: #FF4B4B;
                    }

                    .action-area .btn-secondary {
                        background-color: white;
                        color: #FF6B6B;
                        border: 2px solid #FF6B6B;
                    }
                    .action-area .btn-secondary:hover {
                        background-color: #ffe8e8;
                    }

                    /* Post List Grid */
                    .post-list-header {
                        font-size: 20px;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 16px;
                        padding-left: 8px;
                        border-left: 4px solid #FF6B6B;
                    }

                    .posts-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                        gap: 20px;
                    }

                    .post-card {
                        background-color: white;
                        padding: 20px;
                        border-radius: 12px;
                        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
                        transition: transform 0.2s, box-shadow 0.2s;
                        cursor: pointer;
                        border: 1px solid #eee;
                    }

                    .post-card:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
                    }

                    .post-card h4 {
                        font-size: 15px;
                        font-weight: 700;
                        color: #555;
                        margin-bottom: 8px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .post-card p {
                        font-size: 14px;
                        color: #666;
                        /* Custom line-clamp effect for description */
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                        line-height: 1.5;
                        height: 4.5em; /* 3 lines * 1.5 line-height */
                    }

                    .post-card .detail-link {
                        display: block;
                        margin-top: 12px;
                        text-align: right;
                        font-size: 12px;
                        color: #FF6B6B;
                        font-weight: 500;
                    }

                    /* Random Button */
                    .random-button-area {
                        text-align: center;
                        margin-top: 48px;
                        margin-bottom: 48px;
                    }
                    .random-button {
                        padding: 8px 24px;
                        border-radius: 9999px;
                        background-color: #999;
                        color: white;
                        font-weight: 600;
                        font-size: 14px;
                        border: none;
                        cursor: pointer;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        transition: background-color 0.2s;
                    }
                    .random-button:hover {
                        background-color: #777;
                    }

                    /* --- Detail View --- */
                    .detail-view {
                        max-width: 800px;
                        margin: 0 auto;
                        background-color: white;
                        padding: 24px;
                        border-radius: 16px;
                        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
                    }

                    .detail-view .back-button {
                        display: flex;
                        align-items: center;
                        font-size: 16px;
                        font-weight: 600;
                        color: #FF6B6B;
                        margin-bottom: 24px;
                        padding: 8px;
                        background: none;
                        border: none;
                        cursor: pointer;
                        border-radius: 8px;
                        transition: background-color 0.2s;
                    }
                    .detail-view .back-button:hover {
                        background-color: #ffeeee;
                    }
                    .detail-view .back-button svg {
                        width: 20px;
                        height: 20px;
                        margin-right: 4px;
                    }

                    .detail-view h2 {
                        font-size: 28px;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 16px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid #ddd;
                    }

                    .detail-view .content-box {
                        color: #555;
                        white-space: pre-wrap;
                        line-height: 1.8;
                        margin-bottom: 32px;
                        padding: 20px;
                        background-color: #f9f9f9;
                        border-radius: 12px;
                        border: 1px solid #f0f0f0;
                        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
                    }

                    .detail-view h3 {
                        font-size: 20px;
                        font-weight: 700;
                        color: #444;
                        margin-bottom: 16px;
                        padding-left: 8px;
                        border-left: 4px solid #FF6B6B;
                    }

                    /* Comfort Comment Cards */
                    .comment-list {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }

                    .comment-card {
                        background-color: white;
                        padding: 16px;
                        border-radius: 10px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                        border: 1px solid #eee;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .comment-card p {
                        font-style: italic;
                        color: #666;
                        font-size: 15px;
                        flex-grow: 1;
                        margin-right: 16px;
                    }

                    .like-button {
                        display: flex;
                        align-items: center;
                        padding: 6px 12px;
                        border-radius: 9999px;
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.2s;
                        border: none;
                        cursor: pointer;
                    }

                    .like-button.liked {
                        background-color: #fee2e2; /* light pink */
                        color: #ef4444; /* red-500 */
                        font-weight: 700;
                        box-shadow: 0 1px 3px rgba(239, 68, 68, 0.2);
                    }
                    .like-button.unliked {
                        background-color: #f0f0f0;
                        color: #777;
                    }
                    .like-button.unliked:hover {
                        background-color: #e0e0e0;
                    }
                    .like-button svg {
                        width: 16px;
                        height: 16px;
                        margin-right: 4px;
                    }
                    .like-button.liked svg {
                        fill: #ef4444; /* red-500 */
                    }
                `}
            </style>

            {/* --- Fixed Header --- */}
            <header className="header">
                <h1>마음봇</h1>
                <div className="user-info">
                    <span>{userName}</span>
                    <button
                        onClick={() => navigate("/alarm")}
                        aria-label="알람"
                    >
                        <Bell className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => navigate("/mypage")}
                        aria-label="마이페이지"
                    >
                        <User className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="main-content">
                {!selectedPost ? (
                    /* --- Main View: Action Buttons and Post List --- */
                    <>
                        {/* Action Area */}
                        <div className="action-area">
                            <h2>
                                마음을 담아 글을 남겨보세요
                            </h2>
                            <div className="btn-group">
                                <button
                                    onClick={() => console.log("고민 작성하기")}
                                    className="btn-primary"
                                >
                                    고민 작성하기
                                </button>
                                <button
                                    onClick={() => console.log("위로 작성하기")}
                                    className="btn-secondary"
                                >
                                    위로 작성하기
                                </button>
                            </div>
                        </div>

                        {/* Post List */}
                        <h3 className="post-list-header">
                            내가 썼던 글 보기
                        </h3>
                        <div className="posts-grid">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="post-card"
                                    onClick={() => handleShowDetail(post)}
                                >
                                    {/* Mock title for list view */}
                                    <h4>
                                        (그냥 조금 지친 하루였어요)
                                    </h4>
                                    <p>
                                        {post.content}
                                    </p>
                                    <span className="detail-link">자세히 보기 &rarr;</span>
                                </div>
                            ))}
                        </div>

                        {/* Random Button */}
                        <div className="random-button-area">
                            <button
                                onClick={() => navigate("/random")}
                                className="random-button"
                            >
                                🎲 랜덤 글 받기
                            </button>
                        </div>
                    </>
                ) : (
                    /* --- Detail View --- */
                    <div className="detail-view">
                        <button
                            onClick={handleBack}
                            className="back-button"
                        >
                            <ChevronLeft /> 뒤로가기
                        </button>

                        <h2>
                            {selectedPost.title}
                        </h2>
                        <div className="content-box">
                            {selectedPost.content}
                        </div>

                        <h3>
                            익명의 위로글들
                        </h3>

                        <div className="comment-list">
                            {selectedPost.comfortComments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="comment-card"
                                >
                                    <p>{comment.text}</p>
                                    <button
                                        onClick={() => handleLikeComment(comment.id)}
                                        className={`like-button ${comment.liked ? 'liked' : 'unliked'}`}
                                    >
                                        {selectedPost.comfortComments.find(c => c.id === comment.id)?.liked ? (
                                            <>
                                                <Heart className="w-4 h-4 fill-current" />
                                                마음 표시됨
                                            </>
                                        ) : (
                                            <>
                                                <Heart className="w-4 h-4" />
                                                마음 표시
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
