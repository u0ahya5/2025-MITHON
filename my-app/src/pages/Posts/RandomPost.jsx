const RandomPostModal = ({ onClose, onSubmit, posts }) => {
  const [comfortText, setComfortText] = useState("");
  const [randomPost, setRandomPost] = useState(null);

  useEffect(() => {
    const post = posts[Math.floor(Math.random() * posts.length)];
    setRandomPost(post);
  }, [posts]);

  if (!randomPost) return null;

  const handleUpload = () => {
    if (!comfortText.trim()) return;
    onSubmit(randomPost.id, comfortText);
    setComfortText("");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target.className.includes('modal-backdrop') && onClose()}>
      <div className="modal-content" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        {/* 랜덤 글 내용 */}
        <div style={{ flex: 1, padding: '10px', background: '#f9f9f9', borderRadius: 8, overflowY: 'auto' }}>
          <strong>{randomPost.title}</strong>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{randomPost.content}</p>
        </div>

        {/* 위로글 입력 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <textarea
            rows={10}
            placeholder="위로의 메시지를 작성해주세요"
            value={comfortText}
            onChange={(e) => setComfortText(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 10 }}
          />
          <button
            onClick={handleUpload}
            style={{ padding: '10px', backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: 8 }}
          >
            업로드하기
          </button>
        </div>
      </div>
    </div>
  );
};
