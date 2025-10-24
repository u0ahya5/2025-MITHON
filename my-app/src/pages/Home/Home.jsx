import React, { useState, useRef, useEffect } from "react";
import { Bell, User, ChevronLeft, Heart, X } from 'lucide-react';

// --- Mock Data ---
// (initialPosts와 mockNotifications는 그대로 사용)
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

const mockNotifications = [
    { id: 1, type: "heart", text: "상대 마음글에 마음을 표시했어요", time: "1분 전", targetPostId: 1 },
    { id: 2, type: "comment", text: "새로운 위로글이 달렸어요", time: "2분 전", targetPostId: 2 },
    { id: 3, type: "heart", text: "상대 마음글에 마음을 표시했어요", time: "10분 전", targetPostId: 3 },
    { id: 4, type: "comment", text: "새로운 위로글이 달렸어요", time: "1시간 전", targetPostId: 1 },
];

// --- Notification Dropdown Component (이전과 동일) ---
const NotificationDropdown = ({ notifications, onClose, onNavigatePost }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div className="notification-dropdown" ref={dropdownRef}>
            <div className="dropdown-header">
                <h4>알림</h4>
                <button onClick={onClose} className="close-button" aria-label="알림 닫기">
                    <X className="w-5 h-5" />
                </button>
            </div>
            {notifications.length === 0 ? (
                <p className="empty-message">새로운 알림이 없어요.</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map(notif => (
                        <li key={notif.id} onClick={() => onNavigatePost(notif.targetPostId)} className="notification-item">
                            <span className={`icon-indicator ${notif.type}`}>
                                {notif.type === 'heart' ? <Heart size={14} fill="currentColor" /> : '💬'}
                            </span>
                            <div className="text-content">
                                <p className="notification-text">{notif.text}</p>
                                <span className="notification-time">{notif.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// --- PostWriteModal Component (새로 추가) ---
const PostWriteModal = ({ onClose, onPostSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const modalRef = useRef(null);

    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // backdrop 클릭 시 모달 닫기
    const handleBackdropClick = (e) => {
        if (e.target.className.includes('modal-backdrop')) {
            onClose();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "" || content.trim() === "") {
            // This case should be handled by 'required' attribute, but added for robustness
            return;
        }
        onPostSubmit({ title, content });
        setTitle("");
        setContent("");
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content" ref={modalRef}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h2>고민 작성하기</h2>
                        <button type="button" onClick={onClose} className="close-button" aria-label="닫기">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="post-title" className="sr-only">제목</label>
                        <input
                            id="post-title"
                            type="text"
                            placeholder="글의 제목을 입력해주세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="title-input"
                            maxLength={50}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="post-content" className="sr-only">글 작성</label>
                        <textarea
                            id="post-content"
                            placeholder="오늘은 무슨 일이 있었나요?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="content-textarea"
                            rows={10}
                            required
                        />
                    </div>

                    <button type="submit" className="upload-button">
                        업로드하기
                    </button>
                </form>
            </div>
        </div>
    );
};


// --- Main Home Component ---
const Home = () => {
    // --- State and Handlers ---
    const [posts, setPosts] = useState(initialPosts);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showWriteModal, setShowWriteModal] = useState(false); // **New state for Write Modal**
    const userName = "아이콘 님";

    const navigate = (pathOrId) => {
        if (typeof pathOrId === 'string') {
            console.log(`Navigating to: ${pathOrId}`);
        } else if (typeof pathOrId === 'number') {
            const post = posts.find(p => p.id === pathOrId);
            if (post) {
                handleShowDetail(post);
                setShowNotifications(false);
            }
        }
    };

    const handleShowDetail = (post) => setSelectedPost(post);
    const handleBack = () => setSelectedPost(null);
    const handleToggleNotifications = () => setShowNotifications(prev => !prev);
    const handleToggleWriteModal = () => setShowWriteModal(prev => !prev); // **Modal Toggle**

    const handlePostSubmit = ({ title, content }) => { // **New Post Submission Handler**
        const newPost = {
            id: Date.now(), // Simple unique ID
            title: title || "(제목 없음)",
            content: content,
            comfortComments: [],
        };
        // Add new post to the beginning of the list
        setPosts(prevPosts => [newPost, ...prevPosts]);
        console.log("새 고민이 작성되었습니다:", newPost);
        // Optionally, navigate to the detail view of the new post
        // handleShowDetail(newPost);
    };

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
                        padding-top: 60px;
                        font-family: 'Noto Sans KR', sans-serif;
                        // background-color: #f5f5f5;
                    }

                    /* --- Fixed Header (Existing styles) --- */
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
                        background-color: #FF6B6B;
                        color: white;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header h1 { font-size: 20px; font-weight: 700; }
                    .header .user-info { display: flex; align-items: center; gap: 15px; position: relative; }
                    .header .user-info span { font-size: 14px; font-weight: 500; display: none; }
                    @media (min-width: 640px) { .header .user-info span { display: inline; } }
                    .header button {
                        background: none;
                        border: none;
                        color: white;
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 50%;
                        transition: background-color 0.2s;
                        position: relative;
                    }
                    .header button:hover { background-color: rgba(255, 255, 255, 0.2); }
                    .notification-dot {
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        width: 8px;
                        height: 8px;
                        background-color: #ffe040;
                        border-radius: 50%;
                        border: 1px solid #FF6B6B;
                    }
                    /* --- Notification Dropdown Styles (Existing styles) --- */
                    .notification-dropdown {
                        position: absolute;
                        top: 50px;
                        right: 0;
                        width: 300px;
                        max-height: 400px;
                        background-color: white;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                        z-index: 20;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        transform-origin: top right;
                        animation: fadeInScale 0.2s ease-out;
                    }
                    @media (max-width: 640px) {
                        .notification-dropdown {
                            width: 90vw;
                            max-width: 350px;
                            right: 5vw;
                        }
                    }
                    @keyframes fadeInScale {
                        from { opacity: 0; transform: scale(0.9); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .dropdown-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #eee; background-color: #f7f7f7; }
                    .dropdown-header h4 { font-size: 16px; font-weight: 700; color: #333; }
                    .dropdown-header .close-button { color: #777; padding: 2px; background-color: transparent; border-radius: 4px; }
                    .dropdown-header .close-button:hover { background-color: #ddd; }
                    .notification-list { list-style: none; padding: 0; margin: 0; overflow-y: auto; }
                    .notification-item { display: flex; align-items: flex-start; padding: 12px 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background-color 0.15s; }
                    .notification-item:hover { background-color: #ffe8e8; }
                    .notification-item:last-child { border-bottom: none; }
                    .icon-indicator { flex-shrink: 0; margin-right: 12px; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; }
                    .icon-indicator.heart { background-color: #fee2e2; color: #ef4444; }
                    .icon-indicator.comment { background-color: #e0f2fe; color: #3b82f6; }
                    .text-content { flex-grow: 1; }
                    .notification-text { margin: 0; font-size: 14px; color: #4a4a4a; line-height: 1.4; font-weight: 500; }
                    .notification-time { display: block; font-size: 12px; color: #999; margin-top: 4px; }
                    .empty-message { padding: 20px; text-align: center; color: #999; font-size: 14px; }


                    /* --- Main Content (Existing styles) --- */
                    .main-content { max-width: 3000px; margin: 0 auto; padding: 16px; }
                    .action-area { text-align: center; margin: 32px 0 48px 0; }
                    .action-area h2 { font-size: 24px; font-weight: 600; color: #4a4a4a; margin-bottom: 24px; }
                    .action-area .btn-group { display: flex; justify-content: center; gap: 16px; }
                    .action-area button { padding: 12px 24px; border-radius: 9999px; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.2s ease; min-width: 140px; }
                    .action-area .btn-primary { background-color: #FF6B6B; color: white; border: none; }
                    .action-area .btn-secondary { background-color: white; color: #FF6B6B; border: 2px solid #FF6B6B; }
                    .action-area .btn-primary:hover, .action-area .btn-secondary:hover { transform: translateY(-2px); box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); }
                    .post-list-header { font-size: 20px; font-weight: 700; color: #333; margin-bottom: 16px; padding-left: 8px; border-left: 4px solid #FF6B6B; }
                    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
                    .post-card { background-color: white; padding: 20px; border-radius: 12px; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; border: 1px solid #eee; }
                    .post-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); }
                    .post-card h4 { font-size: 15px; font-weight: 700; color: #555; margin-bottom: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                    .post-card p { font-size: 14px; color: #666; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; line-height: 1.5; height: 4.5em; }
                    .detail-link { display: block; margin-top: 12px; font-size: 13px; color: #FF6B6B; font-weight: 600; text-align: right; }
                    .detail-view { max-width: 800px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 16px; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15); }
                    .detail-view .back-button { display: flex; align-items: center; gap: 4px; background: none; border: none; color: #FF6B6B; font-weight: 600; cursor: pointer; margin-bottom: 24px; padding: 0; }
                    .detail-view h2 { font-size: 24px; font-weight: 700; color: #333; margin-bottom: 16px; }
                    .detail-view .content-box { white-space: pre-wrap; font-size: 16px; color: #555; background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin-bottom: 24px; line-height: 1.6; border: 1px solid #eee; }
                    .detail-view h3 { font-size: 20px; font-weight: 700; color: #444; margin-bottom: 16px; padding-left: 8px; border-left: 4px solid #FF6B6B; }
                    .detail-view .comment-card { background-color: #fff; border: 1px solid #f0f0f0; padding: 15px; border-radius: 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: flex-end; }
                    .detail-view .comment-card p { flex-grow: 1; margin: 0; font-size: 15px; color: #333; }
                    .detail-view .like-button { display: flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 20px; background-color: #f0f0f0; color: #666; font-size: 12px; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; margin-left: 15px; flex-shrink: 0; }
                    .detail-view .like-button:hover { background-color: #e0e0e0; }
                    .like-button.liked { background-color: #fee2e2; color: #ef4444; font-weight: 700; box-shadow: 0 1px 3px rgba(239, 68, 68, 0.2); }
                    .random-button-area { text-align: center; margin-top: 40px; }
                    .random-button {
                        padding: 10px 20px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        transition: background-color 0.2s;
                    }

                    /* --- MODAL SPECIFIC STYLES (New) --- */
                    .modal-backdrop {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
                        z-index: 50; /* Above all other content */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        animation: fadeIn 0.15s ease-out;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    .modal-content {
                        width: 90%;
                        max-width: 500px; /* Max width as seen in the image */
                        background-color: white;
                        border-radius: 12px;
                        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
                        animation: zoomIn 0.2s ease-out;
                        display: flex;
                        flex-direction: column;
                    }
                    @keyframes zoomIn {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }

                    .modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px 24px;
                        border-bottom: 1px solid #eee;
                    }
                    .modal-header h2 {
                        font-size: 18px;
                        font-weight: 700;
                        color: #333;
                        margin: 0;
                    }
                    .modal-header .close-button {
                        background: none;
                        border: none;
                        color: #aaa;
                        cursor: pointer;
                        padding: 0;
                        transition: color 0.15s;
                    }
                    .modal-header .close-button:hover {
                        color: #FF6B6B;
                    }
                    
                    form {
                        padding: 0 24px 24px 24px;
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                    }
                    
                    .form-group {
                        margin-bottom: 0;
                    }

                    .title-input, .content-textarea {
                        width: 100%;
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        font-size: 15px;
                        font-family: 'Noto Sans KR', sans-serif;
                        resize: none;
                        transition: border-color 0.2s;
                        box-sizing: border-box; /* Ensures padding doesn't exceed width */
                    }
                    .title-input {
                        font-weight: 500;
                        margin-top: 20px;
                    }
                    .content-textarea {
                        margin-top: 0px;
                        line-height: 1.5;
                        min-height: 150px;
                    }
                    .title-input:focus, .content-textarea:focus {
                        border-color: #FF6B6B;
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
                    }
                    .content-textarea::placeholder {
                        color: #999;
                    }
                    .upload-button {
                        width: 100%;
                        padding: 14px;
                        background-color: #FF6B6B;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background-color 0.2s;
                        margin-top: 10px; /* Space between textarea and button */
                    }
                    .upload-button:hover {
                        background-color: #FF4A4A;
                    }
                    .sr-only {
                        position: absolute;
                        width: 1px;
                        height: 1px;
                        padding: 0;
                        margin: -1px;
                        overflow: hidden;
                        clip: rect(0, 0, 0, 0);
                        white-space: nowrap;
                        border-width: 0;
                    }

                `}
            </style>

            {/* --- Fixed Header --- */}
            <header className="header">
                <h1>어울림</h1> {/* Adjusted to '어울림' based on image */}
                <div className="user-info">
                    <span>하미님</span> {/* Adjusted to '하미님' based on image */}
                    <button
                        onClick={handleToggleNotifications}
                        aria-label="알람"
                    >
                        <Bell className="w-5 h-5" />
                        {mockNotifications.length > 0 && (
                            <div className="notification-dot"></div>
                        )}
                    </button>
                    {showNotifications && (
                        <NotificationDropdown
                            notifications={mockNotifications}
                            onClose={() => setShowNotifications(false)}
                            onNavigatePost={navigate}
                        />
                    )}
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
                        <div className="action-area">
                            <h2>
                                마음을 담아 글을 남겨보세요
                            </h2>
                            <div className="btn-group">
                                <button
                                    onClick={handleToggleWriteModal} // **Triggers Modal**
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
                                    <h4>
                                        {post.title}
                                    </h4>
                                    <p>
                                        {post.content}
                                    </p>
                                    <span className="detail-link">자세히 보기 &rarr;</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* --- Detail View (Existing logic) --- */
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

            {/* --- Post Write Modal Render --- */}
            {showWriteModal && (
                <PostWriteModal
                    onClose={handleToggleWriteModal}
                    onPostSubmit={handlePostSubmit}
                />
            )}
        </div>
    );
};

export default Home;