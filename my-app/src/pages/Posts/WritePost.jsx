// PostWriteModal.jsx (Home 컴포넌트 안에 넣어도 됩니다. 여기서는 가독성을 위해 분리)
const PostWriteModal = ({ onClose, onPostSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "" || content.trim() === "") {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }
        onPostSubmit({ title, content });
        setTitle("");
        setContent("");
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
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